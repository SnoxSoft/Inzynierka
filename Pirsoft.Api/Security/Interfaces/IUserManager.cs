﻿using Pirsoft.Api.Security.Models;
using System.Security.Claims;

namespace Pirsoft.Api.Security.Interfaces
{
    public interface IUserManager<TUser> where TUser : class
    {
        Task<List<string>> GetRolesAsync(TUser user);
        Task<List<Claim>> GetClaimsAsync(TUser user);
        Task<TUser> FindByEmailAsync(string email);
        Task<UserManagerResult> CreateAsync(TUser user, string password);
    }
}
