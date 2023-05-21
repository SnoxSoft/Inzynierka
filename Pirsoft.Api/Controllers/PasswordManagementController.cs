using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Services;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class PasswordManagementController : Controller
{
    private readonly ICrudHandler _crudHandler;
    private readonly IEmployeeCrudHandler _employeeCrudHandler;
    private readonly IUserManager<EmployeeModel> _userManager;
    private readonly IMailService _emailService;
    private readonly IPasswordService _passwordService;

    public PasswordManagementController(ICrudHandler crudHandler, IUserManager<EmployeeModel> userManager, IMailService emailService, IPasswordService passwordService, IEmployeeCrudHandler employeeCrudHandler)
    {
        _crudHandler = crudHandler;
        _userManager = userManager;
        _emailService = emailService;
        _passwordService = passwordService;
        _employeeCrudHandler = employeeCrudHandler;
    }

    [HttpPost("/send/password/reset")]
    public async Task<ActionResult> SendMailAsync(MailModel mailData)
    {
        bool result = await _emailService.SendEmailAsync(mailData, new CancellationToken());

        if (result)
            return StatusCode(StatusCodes.Status200OK, "Mail has successfully been sent.");

        return StatusCode(StatusCodes.Status500InternalServerError, "An error occured. The Mail could not be sent.");
    }
    
    [HttpPut("/reset/code/change/password")]
    //[Authorize(Roles = "Admin, Manager, Employee")]
    public async Task<ActionResult> ChangePasswordWithResetCode(int resetCode, string passwordFirst, string passwordSecond)
    {
        var resetToken = await _crudHandler.ReadAsync<PasswordResetTokenModel>(resetCode);
        if (resetToken.expiration_time < DateTime.Now.AddHours(-24))
            return NotFound();
        
        if (passwordFirst != passwordSecond)
            return BadRequest("New passwords do not match");
        
        var employee = await _crudHandler.ReadAsync<EmployeeModel>(resetToken.token_employee_id);
        employee.password = passwordFirst;
        await _crudHandler.UpdateAsync(employee);

        return Ok();
    }

    [HttpPut("/change/password")]
    //[Authorize(Roles = "Admin, Manager, Employee")]
    public async Task<ActionResult> ChangePasswordFromProfileView(string oldPassword, string newPasswordOnce, string newPasswordTwice, int employeeId)
    {
        var currentUser = await _employeeCrudHandler.ReadEmployeeByIdAsync(employeeId); 

        if (currentUser.password != oldPassword)
            return BadRequest("Old password is incorrect");
        
        if (newPasswordOnce != newPasswordTwice)
            return BadRequest("New passwords do not match");
        
        currentUser.password = newPasswordOnce;
        await _crudHandler.UpdateAsync<EmployeeModel>(currentUser);

        return Ok();
    }
}