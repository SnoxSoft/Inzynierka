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
using System.Text.RegularExpressions;

namespace Pirsoft.Api.Controllers;

[ApiController]
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
    public async Task<IActionResult> CreateNewEmployee(string firstName, string lastName, string email, string? password, string pesel, string bankAccountNumber, string? skills,
            int departmentId, int leaveBaseDays, int leaveDemandDays, int seniorityInMonths, double grossSalary, bool isActive, bool leaveIsSeniorityThreshold, bool passwordReset,
            DateTime birthDate, DateTime employmentStartDate, ECompanyRole companyRole, EContractType contractType, ESeniorityLevel seniorityLevel)
    {
        if (!_validator.IsPeselValid(pesel))
        {
            return BadRequest("Provided PESEL number is invalid.");
        }

        if (!_validator.IsEmailAddressValid(email))
        {
            return BadRequest("Provided e-mail address is invalid.");
        }

        if (!_validator.IsBankAccountNumberValid(bankAccountNumber))
        {
            return BadRequest("Provided bank account number is invalid.");
        }

        if (skills != null && !Regex.IsMatch(skills, "^(?:\\d|,)+$"))
        {
            return BadRequest($"Provided {nameof(skills)} string contains invalid characters, please pass comma-separated array of integers, eg. '1,2,3,4'");
        }

        if (string.IsNullOrEmpty(password))
        {
            string upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lowerLetters = upperLetters.ToLower();
            string numbers = "1234567890";
            string specialChars = "!@#$%^&*";
            string all = upperLetters + lowerLetters + numbers + specialChars;

            StringBuilder generatedPassword = new StringBuilder();

            int passLength = new Random().Next(14, 18);

            for (int i = 0; i < passLength; i++)
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

        IEnumerable<int> parsedSkillsIds = skills != null
            ? skills.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse)
            : Enumerable.Empty<int>();

        foreach (int skillId in parsedSkillsIds)
        {
            SkillModel? skillEntity = await _crudHandler.ReadAsync<SkillModel>(skillId);

            if (skillEntity != null)
            {
                newEmployee.skills.Add(skillEntity);
            }
        }

        try
        {
            await _crudHandler.CreateAsync(newEmployee);

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
    public async Task<IActionResult> UpdateEmployee(int id, string firstName, string lastName, string pesel, string bankAccountNumber, string? skills,
        int departmentId, int leaveBaseDays, int leaveDemandDays, double grossSalary, byte leaveIsSeniorityThreshold,
        DateTime birthDate, DateTime employmentStartDate, int companyRole, int contractType, int seniorityLevel)
    {
        EmployeeModel? existingEmployee = await _employeeCrudHandler.ReadEmployeeByIdAsync(id);

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

        existingEmployee.skills.Clear();

        IEnumerable<int> parsedSkillsIds = skills != null
            ? skills.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse)
            : Enumerable.Empty<int>();

        List<SkillModel> skillsToSet = await _employeeCrudHandler.ReadSkillsByIdsAsync(parsedSkillsIds);

        foreach (SkillModel skill in skillsToSet)
        {
            existingEmployee.skills.Add(skill);
        }

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
            await _employeeCrudHandler.UpdateAsync(existingEmployee);
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