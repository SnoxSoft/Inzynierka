﻿using Microsoft.AspNetCore.Authorization;
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
        Console.WriteLine(result);
        if (result)
            return StatusCode(StatusCodes.Status200OK, "Mail has successfully been sent.");

        return StatusCode(StatusCodes.Status500InternalServerError, "An error occured. The Mail could not be sent.");
    }

    [HttpPut("/reset/code/change/password")]
    //[Authorize(Roles = "Admin, Manager, Employee")]
    public async Task<ActionResult> ChangePasswordWithResetCode(int resetCode, string passwordFirst,
        string passwordSecond)
    {
        var query = await _crudHandler.ReadAllAsync<PasswordResetTokenModel>();
        var resetToken = query.First(tokens => tokens.reset_code == resetCode);
        if (resetToken != null)
        {
            Console.WriteLine(resetToken.reset_code);
            if (resetToken.expiration_time < DateTime.Now.AddHours(-24))
                return NotFound();
        
            if (passwordFirst != passwordSecond)
                return BadRequest("New passwords do not match");
        
            var currentUser = await _employeeCrudHandler.ReadEmployeeByIdAsync(resetToken.token_employee_id);
            currentUser.password = passwordFirst;
            await _crudHandler.UpdateAsync<EmployeeModel>(currentUser);
        
            return Ok();
        }
        return Conflict();
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