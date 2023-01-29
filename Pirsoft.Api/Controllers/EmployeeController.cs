using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Interfaces;
using Pirsoft.Api.Models;
using Pirsoft.Api;
using Pirsoft.Api.Interfaces.Validators;
using Pirsoft.Api.Validators;

namespace Pirsoft.Api.Controllers;

//[Authorize]
[ApiController]
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeModelValidator _validator;

    public EmployeeController(IEmployeeModelValidator validator) => _validator = validator;
    
    [HttpPost("create/new/employee")]
    public IModel CreateNewEmployee(string firstName, string lastName, string email, string password, AccountType accountType, string pesel, string bankAccountNumber,
         int departmentId, int seniorityInMonths, DateTime employmentStartDate, bool isActive, bool passwordReset, DateTime dateOfBirth, double grossSalary, PositionType positionType)
    {
        if (!_validator.IsPeselValid(pesel))
            pesel = "Missing data";
        if (!_validator.IsEmailAddressValid(email))
            email = "Missing data";
        if (!_validator.IsBankAccountNumberValid(bankAccountNumber))
            bankAccountNumber = "Missing data";
        
        return new EmployeeCreator(firstName, lastName, email, password, accountType, pesel, bankAccountNumber, departmentId,
            seniorityInMonths, employmentStartDate, isActive, passwordReset, dateOfBirth, grossSalary, positionType).CreateModel();
    }
}