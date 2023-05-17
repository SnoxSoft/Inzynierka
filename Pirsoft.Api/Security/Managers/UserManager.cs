using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using System.Security.Claims;

namespace Pirsoft.Api.Security.Managers
{
    public class UserManager : IUserManager<EmployeeModel>
    {
        private readonly IEmployeeCrudHandler _employeeCrudHandler;

        public UserManager(IEmployeeCrudHandler employeeCrudHandler) => _employeeCrudHandler = employeeCrudHandler;

        public async Task<EmployeeModel> FindByEmailAsync(string email)
        {
            return await _employeeCrudHandler.ReadEmployeeByEmailAsync(email);
        }

        public Task<List<string>> GetRolesAsync(EmployeeModel employee)
        {
            string role = employee.employee_company_role.role_name;
            var list = new List<string> { role };
            return Task.FromResult(list);
        }
        
        public async Task<EmployeeModel> GetUserAsync(string email, string password)
        {
            var user = await FindByEmailAsync(email);
            return user.password == password ? user : null;
        }
    }
}
