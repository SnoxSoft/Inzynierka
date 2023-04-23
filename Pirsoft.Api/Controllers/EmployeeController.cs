﻿using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.Validators;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace Pirsoft.Api.Controllers;

//[Authorize]
[ApiController]
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class EmployeeController : ControllerBase
{
    private readonly ICrudHandler _crudHandler;
    private readonly IEmployeeModelValidator _validator;

    public EmployeeController(ICrudHandler crudHandler, IEmployeeModelValidator validator)
    {
        _crudHandler = crudHandler;
        _validator = validator;
    }

    [HttpPost("create/new/employee")]
    public void CreateNewEmployee(string firstName, string lastName, string email, string password, string pesel, string bankAccountNumber, int departmentId, int seniorityInMonths,
         double grossSalary, bool isActive, bool passwordReset, DateTime employmentStartDate, DateTime dateOfBirth, ECompanyRole companyRole, EContractType contractType, ESeniorityLevel seniorityLevel)
    {
        if (!_validator.IsPeselValid(pesel))
            pesel = "Missing data";
        if (!_validator.IsEmailAddressValid(email))
            email = "Missing data";
        if (!_validator.IsBankAccountNumberValid(bankAccountNumber))
            bankAccountNumber = "Missing data";

        EmployeeModel newEmployee = (EmployeeModel)new EmployeeCreator(firstName, lastName, email, password, pesel, bankAccountNumber, departmentId,seniorityInMonths, grossSalary, isActive, passwordReset, employmentStartDate,
            dateOfBirth, companyRole, contractType, seniorityLevel).CreateModel();

        _crudHandler.Create(newEmployee);
        _crudHandler.PushChangesToDatabase();
    }

    [HttpGet("/get/employees")]
    public IEnumerable<employeeDTO> GetListOfAllEmployees() => _crudHandler.ReadAll<EmployeeModel>().Select(p => new employeeDTO(p));

    [HttpGet("/get/filtered/employees/{name?}/{departmentId?}/{positionId?}")]
    public IEnumerable<EmployeeModel> GetFilteredEmployees(string? name, int? departmentId, int? positionId)
    {
        var fullName = name?.Split(' ');
        if (fullName != null && fullName.Length == 2)
        {
            return _crudHandler.ReadAll<EmployeeModel>()
                .Where(p => p.first_name.Equals(fullName[0]))
                .Where(p => p.last_name.Equals(fullName[1]))
                .Where(p => departmentId == null || p.employee_department.department_id.Equals(departmentId))
                .Where(p => positionId == null || p.employee_company_role_id.Equals(positionId));
        }
        else
        {
            return _crudHandler.ReadAll<EmployeeModel>()
                .Where(p => departmentId == null || p.employee_department.department_id.Equals(departmentId))
                .Where(p => positionId == null || p.employee_company_role_id.Equals(positionId));
        }
    }

    [HttpPost("/post/login")]
    public ActionResult Login(string email, string password)
    {
        EmployeeModel employeeModel = _crudHandler.ReadAll<EmployeeModel>().FirstOrDefault(u => u.email_address.Equals(email) && u.password.Equals(password));
        if (employeeModel == null)
            return Content("bad");
        return Content("good");
    }

    public struct employeeDTO
    {
        public employeeDTO(EmployeeModel employeeModel)
        {
            employee_id = employeeModel.employee_id;
            first_name = employeeModel.first_name;
            last_name = employeeModel.last_name;
        }

        private int employee_id { get; }
        private string first_name { get; }
        private string last_name { get; }
    }
}