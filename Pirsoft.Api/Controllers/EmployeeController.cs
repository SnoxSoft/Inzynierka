using System.Diagnostics.Contracts;
using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.Models;
using Pirsoft.Api.Validators;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;

namespace Pirsoft.Api.Controllers;

//[Authorize]
[ApiController] 
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class EmployeeController : Controller
{
    private readonly ICrudHandler _crudHandler;
    private readonly IEmployeeModelValidator _validator;
    private readonly IEmployeeCrudHandler _employeeCrudHandler;

    public EmployeeController(ICrudHandler crudHandler, IEmployeeModelValidator validator, IEmployeeCrudHandler employeeCrudHandler)
    {
        _crudHandler = crudHandler;
        _validator = validator;
        _employeeCrudHandler = employeeCrudHandler;
    }

    [HttpPost("create/new/employee")]
    public async Task CreateNewEmployee(string firstName, string lastName, string email, string password, string pesel, string bankAccountNumber,
            int departmentId, int leaveBaseDays, int leaveDemandDays, int seniorityInMonths, double grossSalary, bool isActive, bool leaveIsSeniorityThreshold, bool passwordReset,
            DateTime birthDate, DateTime employmentStartDate, ECompanyRole companyRole, EContractType contractType, ESeniorityLevel seniorityLevel)
    {
        if (!_validator.IsPeselValid(pesel))
            pesel = "Missing data";
        if (!_validator.IsEmailAddressValid(email))
            email = "Missing data";
        if (!_validator.IsBankAccountNumberValid(bankAccountNumber))
            bankAccountNumber = "Missing data";

        EmployeeModel newEmployee = (EmployeeModel)new EmployeeCreator(firstName, lastName, email, password, pesel, bankAccountNumber,
            departmentId, leaveBaseDays, leaveDemandDays, seniorityInMonths, grossSalary, isActive, leaveIsSeniorityThreshold, passwordReset,
            birthDate, employmentStartDate, companyRole, contractType, seniorityLevel).CreateModel();

        await _crudHandler.CreateAsync(newEmployee);
        _crudHandler.PushChangesToDatabase();
    }

    [Authorize]
    [HttpGet("/get/employees")]
    public async Task<IEnumerable<employeeDTO>> GetListOfAllEmployees()
    {
        var employees = await _employeeCrudHandler.ReadAllEmployeesAsync();
        return await employees.Select(employeeModel => new employeeDTO(employeeModel)).ToListAsync();
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
        var employee = await _employeeCrudHandler.ReadEmployeeByIdAsync(employeeId);

        if (employee != null)
        {
            return employee;
        }
        else
        {
            return null;
        }
    }

    [HttpDelete("delete/employee/{id}")]
    //[Authorize(Roles = "Kadry")] 
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
    
    //[Authorize(Roles = "Kadry")]
    [HttpPut("edit/employee/{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, string firstName, string lastName, string pesel, string bankAccountNumber,
        int departmentId, int leaveBaseDays, int leaveDemandDays, double grossSalary, byte leaveIsSeniorityThreshold,
        DateTime dateOfBirth, DateTime employmentStartDate, int companyRole, int contractType, int seniorityLevel)
    {
        var existingEmployee = await _crudHandler.ReadAsync<EmployeeModel>(id);

        if (existingEmployee == null)
            return NotFound();
        
        existingEmployee.first_name = firstName;
        existingEmployee.last_name = lastName;
        existingEmployee.pesel = pesel;
        existingEmployee.bank_account_number = bankAccountNumber;
        existingEmployee.employment_start_date = employmentStartDate;
        existingEmployee.birth_date = dateOfBirth;
        existingEmployee.salary_gross = grossSalary;
        existingEmployee.employee_contract_type_id = contractType;
        existingEmployee.employee_department_id = departmentId;
        existingEmployee.employee_seniority_level_id = seniorityLevel;
        existingEmployee.employee_company_role_id = companyRole;

        existingEmployee.leave_base_days = leaveBaseDays;
        existingEmployee.leave_demand_days = leaveDemandDays;
        existingEmployee.leave_is_seniority_threshold = leaveIsSeniorityThreshold;

        try
        {
            await _crudHandler.UpdateAsync(existingEmployee);
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
            employee_company_role_id = employeeModel.employee_company_role_id;
            employee_seniority_level_id = employeeModel.employee_seniority_level_id;
            employee_department_id = employeeModel.employee_department_id;
            employee_department = new DepartmentModel
            {
                ApiInternalId = employeeModel.employee_department.ApiInternalId,
                department_id = employeeModel.employee_department.department_id,
                department_name = employeeModel.employee_department.department_name,
            };
            employee_seniority_level = new SeniorityLevelModel
            {
                ApiInternalId = employeeModel.employee_seniority_level.ApiInternalId,
                seniority_level_id = employeeModel.employee_seniority_level.seniority_level_id,
                seniority_level_name = employeeModel.employee_seniority_level.seniority_level_name,
            };
            employee_company_role = new CompanyRoleModel
            {
                ApiInternalId = employeeModel.employee_company_role.ApiInternalId,
                role_id = employeeModel.employee_company_role.role_id,
                role_name = employeeModel.employee_company_role.role_name,
            };
            employee_contract_type = new ContractTypeModel
            {
                ApiInternalId = employeeModel.employee_contract_type.ApiInternalId,
                contract_id = employeeModel.employee_contract_type.contract_id,
                contract_type_name = employeeModel.employee_contract_type.contract_type_name,
            };

            employee_skills = employeeModel.skills.Select(skill => new SkillModel
            {
                ApiInternalId = skill.ApiInternalId,
                skill_id = skill.skill_id,
                skill_name = skill.skill_name
            }).ToList();
        }

        public int employee_id { get; }
        public string first_name { get; }
        public string last_name { get; }
        public int employee_department_id { get; }
        public int employee_seniority_level_id { get; }
        public int employee_company_role_id { get; }
        public DepartmentModel employee_department { get; }
        public SeniorityLevelModel employee_seniority_level { get; set; }
        public CompanyRoleModel employee_company_role { get; }
        public ContractTypeModel employee_contract_type { get; }
        public ICollection<SkillModel> employee_skills { get; }
    }
}