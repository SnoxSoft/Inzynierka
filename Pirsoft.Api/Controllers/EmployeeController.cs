using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.Models;
using Pirsoft.Api.Validators;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;

namespace Pirsoft.Api.Controllers;

//[Authorize]
[ApiController]
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeModelValidator _validator;

    public EmployeeController(IEmployeeModelValidator validator) => _validator = validator;

    [HttpPost("create/new/employee")]
    public IApiModel CreateNewEmployee(string firstName, string lastName, string email, string password, string pesel, string bankAccountNumber, int departmentId, int seniorityInMonths, double grossSalary,
        bool isActive, bool passwordReset, DateTime dateOfBirth, DateTime employmentStartDate, ECompanyRole companyRole, EContractType contractType, ESeniorityLevel seniorityLevel)
    {
        if (!_validator.IsPeselValid(pesel))
            pesel = "Missing data";
        if (!_validator.IsEmailAddressValid(email))
            email = "Missing data";
        if (!_validator.IsBankAccountNumberValid(bankAccountNumber))
            bankAccountNumber = "Missing data";

        return new EmployeeCreator(firstName, lastName, email, password, pesel, bankAccountNumber, departmentId, seniorityInMonths, grossSalary,
            isActive, passwordReset, dateOfBirth, employmentStartDate, companyRole, contractType, seniorityLevel).CreateModel();
    }
}