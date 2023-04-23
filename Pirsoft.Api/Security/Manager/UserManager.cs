using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using System.Security.Claims;

namespace Pirsoft.Api.Security.Manager
{
    public class UserManager : IUserManager<EmployeeModel>
    {
        private readonly ICrudHandler _crudHandler;

        public UserManager(ICrudHandler crudHandler)
        {
            _crudHandler = crudHandler;
        }
        public Task<EmployeeModel> FindByEmailAsync(string email)
        {
            Console.WriteLine(email);

            var user = _crudHandler.ReadAll<EmployeeModel>().FirstOrDefault
                (u => u.email_address.ToLowerInvariant().Equals(email.ToLowerInvariant()));
            return Task.FromResult(user);
        }
        public Task<List<Claim>> GetClaimsAsync(EmployeeModel employee) 
        {
            Claim c = new Claim("MyCos", "MyValue");
            var lis = new List<Claim>();
            lis.Add(c);
            return Task.FromResult(lis);
        }
        public Task<List<string>> GetRolesAsync(EmployeeModel employee)
        {
            string c = "User";
            var lis = new List<string>();
            lis.Add(c);
            return Task.FromResult(lis);
        }
        public Task<UserManagerResult> CreateAsync(EmployeeModel employee, string password)
        {
            _crudHandler.Create(employee);

            return Task.FromResult(UserManagerResult.Success);
        }
    }
}
