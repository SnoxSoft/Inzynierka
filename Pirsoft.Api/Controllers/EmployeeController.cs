using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.Validators;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Security.Claims;
using Pirsoft.Api.Security.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Security.Interfaces;
using IAuthenticationService = Microsoft.AspNetCore.Authentication.IAuthenticationService;

namespace Pirsoft.Api.Controllers;

//[Authorize]
[ApiController]
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class EmployeeController : Controller
{
    private readonly ICrudHandler _crudHandler;
    private readonly IEmployeeModelValidator _validator;
    private readonly IUserManager<EmployeeModel> _userManager;

    public EmployeeController(ICrudHandler crudHandler, IEmployeeModelValidator validator, IUserManager<EmployeeModel> userManager)
    {
        _crudHandler = crudHandler;
        _validator = validator;
        _userManager = userManager;
    }

    public EmployeeController(ICrudHandler crudHandler) => _crudHandler = crudHandler;    

    [HttpPost("create/new/employee")]
    public async Task CreateNewEmployee(string firstName, string lastName, string email, string password, string pesel, string bankAccountNumber, int departmentId, int seniorityInMonths,
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

        await _crudHandler.CreateAsync(newEmployee);
        _crudHandler.PushChangesToDatabase();
    }

    //[Authorize]
    [HttpGet("/get/employees")]
    public async Task<IEnumerable<employeeDTO>> GetListOfAllEmployees()
    {
        var query = await _crudHandler.ReadAllAsync<EmployeeModel>();
        return await query.Select(employeeModel => new employeeDTO(employeeModel)).ToListAsync();
    }

    [HttpGet("/get/filtered/employees/{name?}/{departmentId?}/{positionId?}")]
    public async Task<IEnumerable<EmployeeModel>> GetFilteredEmployees(string? name, int? departmentId, int? positionId)
    {
        var query = await _crudHandler.ReadAllAsync<EmployeeModel>();
        var fullName = name?.Split(' ');
        
        if (fullName != null && fullName.Length == 2)
        {
            return await query
                .Where(p => p.first_name.Equals(fullName[0]))
                .Where(p => p.last_name.Equals(fullName[1]))
                .Where(p => departmentId == null || p.employee_department.department_id.Equals(departmentId))
                .Where(p => positionId == null || p.employee_company_role_id.Equals(positionId)).ToListAsync();
        }
        else
        {
            return await query
                .Where(p => departmentId == null || p.employee_department.department_id.Equals(departmentId))
                .Where(p => positionId == null || p.employee_company_role_id.Equals(positionId)).ToListAsync();
        }
    }

    [HttpGet("/get/employee/{employeeId}")]
    public async Task<EmployeeModel> GetEmployeeById(int employeeId)
    {
        var query = await _crudHandler.ReadAsync<EmployeeModel>(employeeId);

        if (query != null)
        {
            return query;
        }
        else
        {
            return null;
        }
    }

    [HttpDelete("delete/employee/{id}")]
    [Authorize(Roles = "Kadry")] 
    public async Task<IActionResult> DeleteEmployeeById(int id)
    {
        // Check if the employee exists
        var employee = await _crudHandler.ReadAsync<EmployeeModel>(id);
        if (employee == null)
            return NotFound();

        try
        {
            await _crudHandler.DeleteAsync(employee);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
    [Authorize(Roles = "Kadry")]
    [HttpPut("employees/{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeeModel employee, [FromServices] ICrudHandler crudHandler)
    {
        var existingEmployee = await crudHandler.ReadAsync<EmployeeModel>(id);

        if (existingEmployee == null)
        {
            return NotFound();
        }

        // Make sure the email is not editable
        employee.email_address = existingEmployee.email_address;

        // Update the employee object
        existingEmployee.first_name = employee.first_name;
        existingEmployee.last_name = employee.last_name;
        existingEmployee.pesel = employee.pesel;
        existingEmployee.bank_account_number = employee.bank_account_number;
        existingEmployee.seniority_in_months = employee.seniority_in_months;
        existingEmployee.employment_start_date = employee.employment_start_date;
        existingEmployee.is_active = employee.is_active;
        existingEmployee.password_reset = employee.password_reset;
        existingEmployee.birth_date = employee.birth_date;
        existingEmployee.salary_gross = employee.salary_gross;
        existingEmployee.employee_contract_type_id = employee.employee_contract_type_id;
        existingEmployee.employee_department_id = employee.employee_department_id;
        existingEmployee.employee_seniority_level_id = employee.employee_seniority_level_id;
        existingEmployee.employee_company_role_id = employee.employee_company_role_id;

        try
        {
            await crudHandler.UpdateAsync(existingEmployee);
            return Ok();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict();
        }
    }

    public struct employeeDTO
    {
        public employeeDTO(EmployeeModel employeeModel)
        {
            employee_id = employeeModel.employee_id;
            first_name = employeeModel.first_name;
            last_name = employeeModel.last_name;
            employee_department_id = employeeModel.employee_department_id;
            employee_seniority_level_id = employeeModel.employee_seniority_level_id;
            employee_company_role_id = employeeModel.employee_company_role_id;
        }

        public int employee_id { get; }
        public string first_name { get; }
        public string last_name { get; }
        public int employee_department_id { get; }
        public int employee_seniority_level_id { get; }
        public int employee_company_role_id { get; }

    }
}