﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Validators;
using IAuthenticationService = Pirsoft.Api.Security.Interfaces.IAuthenticationService;

namespace Pirsoft.Api.Security.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private IUserManager<EmployeeModel> _userManager;
        private readonly JSONWebTokensSettings _jwtSettings;
        private readonly IEmployeeModelValidator _employeeModelValidator;
        private readonly IHashPasswordManager _hashPasswordManager;
        private readonly IEmployeeCrudHandler _employeeCrudHandler;
        
        public AuthenticationService(IUserManager<EmployeeModel> userManager, IOptions<JSONWebTokensSettings> jwtSettings, IEmployeeModelValidator employeeModelValidator, IHashPasswordManager hashPasswordManager, IEmployeeCrudHandler employeeCrudHandler)
        {
            _userManager = userManager;
            _jwtSettings = jwtSettings.Value;
            _employeeModelValidator = employeeModelValidator;
            _hashPasswordManager = hashPasswordManager;
            _employeeCrudHandler = employeeCrudHandler;
        }

        public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
        {
            if (!_employeeModelValidator.IsEmailAddressValid(request.Email))
            {
                return new AuthenticationResponse() { StatusCode = ESecurityResponse.InvalidEmail };
            }

            EmployeeModel? user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new AuthenticationResponse() { StatusCode = ESecurityResponse.EmailNotFound };
            }

            EmployeeModel? existingEmployee = await _employeeCrudHandler.ReadEmployeeByIdAsync(user.employee_id);

            if (existingEmployee == null)
            {
                return new AuthenticationResponse() { StatusCode = ESecurityResponse.EmailNotFound };
            }

            var passwordSalt = user.password_salt;

            if (!_employeeModelValidator.IsPasswordValid(request.Password))
            {
                return new AuthenticationResponse() { StatusCode = ESecurityResponse.InvalidPassword };
            }

            string requestHashedPassword = _hashPasswordManager.HashPassword(request.Password, passwordSalt);
            
            if (requestHashedPassword != existingEmployee.password)
            {
                return new AuthenticationResponse() { StatusCode = ESecurityResponse.BadPassword };
            }

            JwtSecurityToken jwtSecurityToken = await GenerateToken(user);
            AuthenticationResponse response = new()
            {
                Id = user.employee_id,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Email = user.email_address,
                StatusCode = ESecurityResponse.Success,
            };

            return response;
        }

        private async Task<JwtSecurityToken> GenerateToken(EmployeeModel employee)
        {
            var roles = await _userManager.GetRolesAsync(employee);

            var roleClaims = new List<Claim>();

            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim(ClaimTypes.Role, roles[i]));
            }

            var claims = new[]
            {
                new Claim("UserId", employee.employee_id.ToString()),
                new Claim("FirstName", employee.first_name),
                new Claim("LastName", employee.last_name),
                new Claim("Email", employee.email_address),
                new Claim("Role", employee.employee_company_role_id.ToString()),
                new Claim("Department", employee.employee_department_id.ToString()),
                new Claim("Department_name", employee.employee_department.department_name),
                new Claim("Role", employee.employee_company_role_id.ToString()),
                new Claim("Role_name", employee.employee_company_role.role_name),
            }
                .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
