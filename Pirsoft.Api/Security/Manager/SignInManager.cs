using Microsoft.AspNetCore.Identity;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;

namespace Pirsoft.Api.Security.Manager
{
    public class SignInManager : ISignInManager<EmployeeModel>
    {
        public Task<SignInResult> PasswordSignInAsync
            (string email, string password, bool isPersistent, bool lockoutOnFailure)
        {
            if (password == "12345")
                return Task.FromResult(SignInResult.Success);
            else
                return Task.FromResult(SignInResult.Failed);
        }
    }
}
