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
            return await _dbContext.Set<EmployeeModel>().Include(employee => employee.skills).FirstOrDefaultAsync(employee => employee.employee_id == employeeId);
        }

        public async Task<IQueryable<EmployeeModel?>> ReadAllEmployeesAsync()
        {
            return await Task.FromResult(_dbContext.Set<EmployeeModel>().Include(employee => employee.skills));
        }
    }

    public interface IEmployeeCrudHandler
    {
        Task<EmployeeModel?> ReadEmployeeByIdAsync(int employeeId);
        Task<IQueryable<EmployeeModel?>> ReadAllEmployeesAsync();
    }
}
