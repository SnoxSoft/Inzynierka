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
    private readonly IMailService _emailService;
    private readonly IPasswordService _passwordService;
    private readonly IHashPasswordManager _hashPasswordManager;

    public PasswordManagementController(ICrudHandler crudHandler, IMailService emailService, IPasswordService passwordService, IEmployeeCrudHandler employeeCrudHandler, IHashPasswordManager hashPasswordManager)
    {
        _crudHandler = crudHandler;
        _emailService = emailService;
        _passwordService = passwordService;
        _employeeCrudHandler = employeeCrudHandler;
        _hashPasswordManager = hashPasswordManager;
    }

    [HttpPost("/send/password/reset")]
    public async Task<ActionResult> SendMailAsync(string email)
    {
        var generatedResetCode = _passwordService.GenerateResetCode();

        EmployeeModel? employee = await _employeeCrudHandler.ReadEmployeeByEmailAsync(email);

        if (employee == null)
        {
            return NotFound("Unable to find employee with provided e-mail address.");
        }

        var passwordToken = new PasswordResetTokenModel()
        {
            expiration_time = DateTime.Now.AddHours(24),
            reset_code = Convert.ToInt32(generatedResetCode),
            email = email,
            token_employee_id = employee.employee_id,
        };

        MailModel mailData = new(email, generatedResetCode, "", "");
        
        await _crudHandler.CreateAsync(passwordToken);
        
        bool result = await _emailService.SendEmailAsync(mailData, new CancellationToken());
        if (result)
            return StatusCode(StatusCodes.Status200OK, "Mail has successfully been sent.");

        return StatusCode(StatusCodes.Status500InternalServerError, "An error occured. The Mail could not be sent.");
    }

    [HttpPut("/reset/code/change/password")]
    public async Task<ActionResult> ChangePasswordWithResetCode(int resetCode, string passwordFirst,
        string passwordSecond)
    {
        var query = await _crudHandler.ReadAllAsync<PasswordResetTokenModel>();
        var resetToken = query.FirstOrDefault(tokens => tokens.reset_code == resetCode);

        if (resetToken == null)
        {
            return NotFound("Unable to find given password reset token in database.");
        }

        if (resetToken.expiration_time < DateTime.Now)
            return BadRequest("Password reset token has expired.");

        if (passwordFirst != passwordSecond)
            return BadRequest("New passwords do not match");

        var currentUser = await _crudHandler.ReadAsync<EmployeeModel>(resetToken.token_employee_id);

        if (currentUser == null)
        {
            return NotFound("Unable to find user to change password.");
        }

        var passwordSalt = currentUser.password_salt;
        var hashedPassword = _hashPasswordManager.HashPassword(passwordFirst, passwordSalt);

        currentUser.password = hashedPassword;
        currentUser.password_salt = passwordSalt;
        await _crudHandler.UpdateAsync(currentUser);

        return Ok();
    }

    [HttpPut("/change/password")]
    //[Authorize(Roles = "Admin, Manager, Employee")]
    public async Task<ActionResult> ChangePasswordFromProfileView(string oldPassword, string newPasswordOnce, string newPasswordTwice, int employeeId)
    {
        var currentUser = await _crudHandler.ReadAsync<EmployeeModel>(employeeId);

        if (currentUser == null)
        {
            return NotFound("Unable to find user to change password.");
        }
        
        var passwordSalt = currentUser.password_salt;
        var hashedPassword = _hashPasswordManager.HashPassword(oldPassword, passwordSalt);
        
        if (currentUser.password != hashedPassword)
            return BadRequest("Old password is incorrect");
        
        if (newPasswordOnce != newPasswordTwice)
            return BadRequest("New passwords do not match");
        
        var newPasswordSalt = _hashPasswordManager.GenerateSalt();
        var newHashedPassword = _hashPasswordManager.HashPassword(newPasswordOnce, newPasswordSalt);
        
        currentUser.password = newHashedPassword;
        currentUser.password_salt = newPasswordSalt;
        await _crudHandler.UpdateAsync(currentUser);

        return Ok();
    }
}