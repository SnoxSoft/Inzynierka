using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.Services;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class PasswordManagementController : ControllerBase
{
    private readonly ICrudHandler _crudHandler;
    private readonly EmailService _emailService;
    private readonly PasswordService _passwordService;
    private readonly DatabaseContext _databasebContext;

    public PasswordManagementController(ICrudHandler crudHandler, EmailService emailService, PasswordService passwordService, DatabaseContext databasebContext)
    {
        _crudHandler = crudHandler;
        _emailService = emailService;
        _passwordService = passwordService;
        _databasebContext = databasebContext;
    }

    [HttpPost("/send/password/reset/{email}")]
    public async Task<bool> SendPasswordResetEmail(string email)
    {
        var resetCode = _passwordService.GenerateResetCode();
        var message = $"Your password reset code is: {resetCode}";

        await _emailService.SendEmailAsync(email, "Password Reset Code", message);

        // Store the reset code along with the user's email and a timestamp in the database
        var resetToken = new PasswordResetTokenModel
        {
            email = email,
            reset_code = resetCode,
            expiration_time = DateTime.UtcNow.AddHours(1) // Valid for 1 hour
        };

        await _databasebContext.AddPasswordResetTokenAsync(resetToken);
        await _databasebContext.SaveChangesAsync();

        return true;
    }
    
    [HttpPut("/reset/code/change/password")]
    public async Task ChangePasswordWithResetCode(int employeeId, string passwordFirst, string passwordSecond)
    {
        
    }

    [HttpPut("/change/password")]
    public async Task ChangePasswordFromProfileView()
    {
        
    }
}