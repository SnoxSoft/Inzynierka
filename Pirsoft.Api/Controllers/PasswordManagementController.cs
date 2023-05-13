using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Services;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class PasswordManagementController : Controller
{
    private readonly ICrudHandler _crudHandler;
    private readonly IUserManager<EmployeeModel> _userManager;
    private readonly IMailService _emailService;
    private readonly PasswordService _passwordService;
    private readonly DatabaseContext _databasebContext;

    public PasswordManagementController(ICrudHandler crudHandler, IUserManager<EmployeeModel> userManager, IMailService emailService, PasswordService passwordService, DatabaseContext databasebContext)
    {
        _crudHandler = crudHandler;
        _userManager = userManager;
        _emailService = emailService;
        _passwordService = passwordService;
        _databasebContext = databasebContext;
    }

    [HttpPost("/send/password/reset")]
    public async Task<IActionResult> SendMailAsync(MailModel mailData)
    {
        bool result = await _emailService.SendEmailAsync(mailData, new CancellationToken());

        if (result)
        {
            return StatusCode(StatusCodes.Status200OK, "Mail has successfully been sent.");
        } 
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occured. The Mail could not be sent.");
        }
    }
    
    [HttpPut("/reset/code/change/password")]
    [Authorize(Roles = "Admin, Manager, Employee")]
    public async Task<ActionResult> ChangePasswordWithResetCode(int employeeId, string passwordFirst, string passwordSecond)
    {
        // Ensure current user is authorized to update this employee's password
        var currentUser = await _userManager.GetUserAsync(User.Identity.Name, passwordFirst);
        if (currentUser == null)
            return Unauthorized();

        var employeeToUpdate = await _crudHandler.ReadAsync<EmployeeModel>(employeeId);
        if (employeeToUpdate == null)
            return NotFound();

        // Ensure the current user is either an admin, manager, or the employee whose password is being updated
        if (!User.IsInRole("Admin") && !User.IsInRole("Manager") && currentUser.employee_id != employeeToUpdate.employee_id)
            return Unauthorized();

        // Validate new password
        if (passwordFirst != passwordSecond)
            return BadRequest("New passwords do not match");

        // Update password and save changes
        employeeToUpdate.password = passwordFirst;
        await _crudHandler.UpdateAsync<EmployeeModel>(employeeToUpdate);

        return Ok();
    }

    [HttpPut("/change/password")]
    public async Task<ActionResult> ChangePasswordFromProfileView(string oldPassword, string newPasswordOnce, string newPasswordTwice, int employeeId)
    {
        // Get the current user from the database using the employeeId parameter
        var user = await _crudHandler.ReadAsync<EmployeeModel>(employeeId);
        if (user == null)
        {
            return NotFound();
        }

        // Ensure the current user is authorized to update their own password
        var currentUser = await _userManager.GetUserAsync(User.Identity.Name, oldPassword);
        if (currentUser == null || currentUser.employee_id != user.employee_id)
            return Unauthorized();

        // Validate old password
        if (user.password != oldPassword)
            return BadRequest("Old password is incorrect");

        // Validate new password
        if (newPasswordOnce != newPasswordTwice)
            return BadRequest("New passwords do not match");

        // Update password and save changes
        user.password = newPasswordOnce;
        await _crudHandler.UpdateAsync<EmployeeModel>(user);

        return Ok();
    }
}