using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.CrudHandlers
{
    public sealed class EmployeeCrudHandler : IEmployeeCrudHandler
    {
        private readonly DatabaseContext _dbContext;

        public EmployeeCrudHandler(DatabaseContext dbContext) => _dbContext = dbContext;

        public async Task<EmployeeModel?> ReadEmployeeByIdAsync(int employeeId)
        {
            return await _dbContext.Set<EmployeeModel>()
                .Include(employee => employee.skills)
                .Include(employee => employee.employee_department)
                .Include(employee => employee.employee_company_role)
                .Include(employee => employee.employee_contract_type)
                .Include(employee => employee.employee_seniority_level)
                .FirstOrDefaultAsync(employee => employee.employee_id == employeeId);
        }

        public async Task<IQueryable<EmployeeModel?>> ReadAllEmployeesAsync()
        {
            return await Task.FromResult(_dbContext.Set<EmployeeModel>()
                .Include(employee => employee.skills)
                .Include(employee => employee.employee_department)
                .Include(employee => employee.employee_company_role)
                .Include(employee => employee.employee_contract_type)
                .Include(employee => employee.employee_seniority_level)
            );
        }

        public async Task<EmployeeModel?> ReadEmployeeByEmailAsync(string email)
        {
            return await _dbContext.Set<EmployeeModel>().Include(employee => employee.skills)
                .Include(employee => employee.employee_department)
                .Include(employee => employee.employee_company_role)
                .Include(employee => employee.employee_contract_type)
                .Include(employee => employee.employee_seniority_level)
                .FirstOrDefaultAsync(employee => employee.email_address == email);
        }

        public async Task<List<SkillModel>> ReadSkillsByIdsAsync(IEnumerable<int> skillIds)
            => await _dbContext.skills.Where(skill => skillIds.Contains(skill.skill_id)).ToListAsync();

        public async Task<int> UpdateAsync(EmployeeModel entity)
        {
            if (entity.ApiInternalId < 1)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property value less than 1", nameof(entity));
            }

            _dbContext.employees.Update(entity);
            return await _dbContext.SaveChangesAsync();
        }
    }

    public interface IEmployeeCrudHandler
    {
        Task<EmployeeModel?> ReadEmployeeByIdAsync(int employeeId);
        Task<IQueryable<EmployeeModel?>> ReadAllEmployeesAsync();
        Task<EmployeeModel?> ReadEmployeeByEmailAsync(string email);
        Task<List<SkillModel>> ReadSkillsByIdsAsync(IEnumerable<int> skillIds);
        Task<int> UpdateAsync(EmployeeModel entity);
    }
}
