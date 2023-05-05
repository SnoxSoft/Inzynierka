using Pirsoft.Api.Security.Models;
using System.Security.Claims;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Security.Interfaces
{
    public interface IUserManager<TUser>
    {
        Task<List<string>> GetRolesAsync(TUser user);
        Task<List<Claim>> GetClaimsAsync(TUser user);
        Task<TUser> FindByEmailAsync(string email);
        Task<EmployeeModel> GetUserAsync(string email, string password);
    }
}
