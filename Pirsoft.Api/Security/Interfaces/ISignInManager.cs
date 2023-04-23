using Microsoft.AspNetCore.Identity;

namespace Pirsoft.Api.Security.Interfaces
{
    public interface ISignInManager<TUser> where TUser : class
    {
        Task<SignInResult> PasswordSignInAsync
            (string email, string password,
            bool isPersistent, bool lockoutOnFailure);
    }
}
