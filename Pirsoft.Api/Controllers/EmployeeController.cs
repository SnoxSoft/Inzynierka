using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.Models;
using Pirsoft.Api.Validators;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Filesystem;
using Microsoft.AspNetCore.Authorization;

namespace Pirsoft.Api.Controllers;

//[Authorize]
[ApiController] 
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class EmployeeController : Controller
{
    private readonly IAvatarFileUploadHandler _avatarFileUploadHandler;
    private readonly ICrudHandler _crudHandler;
    private readonly IEmployeeCrudHandler _employeeCrudHandler;
    private readonly IEmployeeModelValidator _validator;

    public EmployeeController(
        IAvatarFileUploadHandler avatarFileUploadHandler,
        ICrudHandler crudHandler,
        IEmployeeCrudHandler employeeCrudHandler,
        IEmployeeModelValidator validator)
    {
        _avatarFileUploadHandler = avatarFileUploadHandler;
        _crudHandler = crudHandler;
        _employeeCrudHandler = employeeCrudHandler;
        _validator = validator;
    }

    [HttpPost("create/new/employee")]
    public async Task<IActionResult> CreateNewEmployee(string firstName, string lastName, string email, string? password, string pesel, string bankAccountNumber,
            int departmentId, int leaveBaseDays, int leaveDemandDays, int seniorityInMonths, double grossSalary, bool isActive, bool leaveIsSeniorityThreshold, bool passwordReset,
            DateTime birthDate, DateTime employmentStartDate, ECompanyRole companyRole, EContractType contractType, ESeniorityLevel seniorityLevel)
    {
        if (!_validator.IsPeselValid(pesel))
        {
            pesel = "Missing data";
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        if (!_validator.IsEmailAddressValid(email))
        {
            email = "Missing data";
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        if (!_validator.IsBankAccountNumberValid(bankAccountNumber))
        {
            bankAccountNumber = "Missing data";
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        if (string.IsNullOrEmpty(password))
        {
            string upper_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lower_letters = upper_letters.ToLower();
            string numbers = "1234567890";
            string special_chars = "!@#$%^&*";
            string all = upper_letters + lower_letters + numbers + special_chars;
            StringBuilder generatedPassword = new StringBuilder();
            int pass_length = new Random().Next(14, 18);

            for (int i = 0; i < pass_length; i++)
            {
                int randomChar = new Random().Next(0, all.Length - 1);
                generatedPassword.Append(all[randomChar]);
            }
            password = generatedPassword.ToString();
        }
        

        string avatarFilePath = string.Empty;

        if (Request.Form.Files.Any())
        {
            try
            {
                avatarFilePath = await _avatarFileUploadHandler.Upload(Request.Form);
            }
            catch (Exception ex) when (ex is ArgumentException)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        EmployeeModel newEmployee = (EmployeeModel)new EmployeeCreator(firstName, lastName, email, password, pesel, bankAccountNumber, avatarFilePath,
            departmentId, leaveBaseDays, leaveDemandDays, seniorityInMonths, grossSalary, isActive, leaveIsSeniorityThreshold, passwordReset,
            birthDate, employmentStartDate, companyRole, contractType, seniorityLevel).CreateModel();

        try
        {
            await _crudHandler.CreateAsync(newEmployee);
            _crudHandler.PushChangesToDatabase();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
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
        DateTime birthDate, DateTime employmentStartDate, int companyRole, int contractType, int seniorityLevel)
    {
        var existingEmployee = await _crudHandler.ReadAsync<EmployeeModel>(id);

        if (existingEmployee == null)
            return NotFound();
        
        existingEmployee.first_name = firstName;
        existingEmployee.last_name = lastName;
        existingEmployee.pesel = pesel;
        existingEmployee.bank_account_number = bankAccountNumber;
        existingEmployee.employment_start_date = employmentStartDate;
        existingEmployee.birth_date = birthDate;
        existingEmployee.salary_gross = grossSalary;
        existingEmployee.employee_contract_type_id = contractType;
        existingEmployee.employee_department_id = departmentId;
        existingEmployee.employee_seniority_level_id = seniorityLevel;
        existingEmployee.employee_company_role_id = companyRole;

        existingEmployee.leave_base_days = leaveBaseDays;
        existingEmployee.leave_demand_days = leaveDemandDays;
        existingEmployee.leave_is_seniority_threshold = leaveIsSeniorityThreshold;

        if (Request.Form.Files.Any())
        {
            try
            {
                existingEmployee.avatar_file_path = await _avatarFileUploadHandler.Upload(Request.Form);
            }
            catch (Exception ex) when (ex is ArgumentException)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

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
            avatar_file_path = employeeModel.avatar_file_path;
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
        public string? avatar_file_path { get; }
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