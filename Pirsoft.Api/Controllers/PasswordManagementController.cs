using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Pirsoft.Api.Services;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class PasswordManagementController : ControllerBase
{
    private readonly EmailService _emailService;

    public PasswordManagementController(EmailService emailService) => _emailService = emailService;
    
    [HttpPost("/reset/password/email")]
    public async Task SendEmailWithPasswordResetLink()
    {
        await _emailService.SendEmailAsync("test@gmail.com", "subject", "message");
    }
}