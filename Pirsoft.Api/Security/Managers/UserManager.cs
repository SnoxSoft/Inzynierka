using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using System.Security.Claims;

namespace Pirsoft.Api.Security.Managers
{
    public class UserManager : IUserManager<EmployeeModel>
    {
        private readonly ICrudHandler _crudHandler;

        public UserManager(ICrudHandler crudHandler) => _crudHandler = crudHandler;

        public Task<EmployeeModel> FindByEmailAsync(string email)
        {
            var user = _crudHandler.ReadAll<EmployeeModel>().FirstOrDefault(u => u.email_address.ToLowerInvariant().Equals(email.ToLowerInvariant()));

            return Task.FromResult(user);
        }

        public Task<List<Claim>> GetClaimsAsync(EmployeeModel employee) 
        {
            Claim employeeClaim = new("MyCos", "MyValue");
            var claims = new List<Claim>();
            claims.Add(employeeClaim);
            return Task.FromResult(claims);
        }

        public Task<List<string>> GetRolesAsync(EmployeeModel employee)
        {
            string user = "User";
            var lis = new List<string>();
            lis.Add(user);
            return Task.FromResult(lis);
        }
    }
}
