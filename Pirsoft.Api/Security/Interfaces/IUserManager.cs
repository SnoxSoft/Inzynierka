using Pirsoft.Api.Security.Models;
using System.Security.Claims;

namespace Pirsoft.Api.Security.Interfaces
{
    public interface IUserManager<TUser>
    {
        Task<List<string>> GetRolesAsync(TUser user);
        Task<TUser> FindByEmailAsync(string email);
    }
}
