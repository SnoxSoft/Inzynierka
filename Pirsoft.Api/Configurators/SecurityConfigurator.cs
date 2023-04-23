using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using System.Text;
using Newtonsoft.Json;
using Pirsoft.Api.Security.Managers;
using Pirsoft.Api.Security.Services;

namespace Pirsoft.Api.Configurators
{
    public static class SecurityConfigurator
    {
        public static void addJwtConfiguration(WebApplicationBuilder builder)
        {
            builder.Services.Configure<JSONWebTokensSettings>(builder.Configuration.GetSection("JSONWebTokensSettings"));

            builder.Services.AddSingleton<IUserManager<EmployeeModel>, UserManager>();
            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();

            builder.Services.AddAuthentication(authenticationOptions =>
            {
                authenticationOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authenticationOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(jwtBearerOptions =>
            {
                jwtBearerOptions.RequireHttpsMetadata = false;
                jwtBearerOptions.SaveToken = false;
                jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = builder.Configuration["JSONWebTokensSettings:Issuer"],
                    ValidAudience = builder.Configuration["JSONWebTokensSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JSONWebTokensSettings:Key"]))
                };

                jwtBearerOptions.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = authenticationFailedContext =>
                    {
                        authenticationFailedContext.NoResult();
                        authenticationFailedContext.Response.StatusCode = 500;
                        authenticationFailedContext.Response.ContentType = "text/plain";

                        return authenticationFailedContext.Response.WriteAsync(authenticationFailedContext.Exception.ToString());
                    },
                    OnChallenge = bearerChallengeContext =>
                    {
                        bearerChallengeContext.HandleResponse();
                        bearerChallengeContext.Response.StatusCode = 401;
                        bearerChallengeContext.Response.ContentType = "application/json";
                        var result = JsonConvert.SerializeObject("401 Not authorized");

                        return bearerChallengeContext.Response.WriteAsync(result);
                    },
                    OnForbidden = forbiddenContext =>
                    {
                        forbiddenContext.Response.StatusCode = 403;
                        forbiddenContext.Response.ContentType = "application/json";
                        var result = JsonConvert.SerializeObject("403 Not authorized");

                        return forbiddenContext.Response.WriteAsync(result);
                    },
                };
            });
        }
    }
}
