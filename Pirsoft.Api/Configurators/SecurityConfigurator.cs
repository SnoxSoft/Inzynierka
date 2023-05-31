using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using System.Text;
using Newtonsoft.Json;
using Pirsoft.Api.Security.Managers;
using Pirsoft.Api.Security.Services;
using System.Security.Authentication;
using Newtonsoft.Json.Linq;

namespace Pirsoft.Api.Configurators
{
    public static class SecurityConfigurator
    {
        public static void addJwtConfiguration(WebApplicationBuilder builder)
        {
            builder.Services.Configure<JSONWebTokensSettings>(builder.Configuration.GetSection("JSONWebTokensSettings"));

            builder.Services.AddSingleton<IUserManager<EmployeeModel>, UserManager>();
            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
            builder.Services.AddSingleton<IHashPasswordManager, HashPasswordManager>();

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
                    OnChallenge = bearerChallengeContext =>
                    {
                        bearerChallengeContext.HandleResponse();
                        bearerChallengeContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        bearerChallengeContext.Response.ContentType = "application/json";

                        if (string.IsNullOrEmpty(bearerChallengeContext.Error))
                            bearerChallengeContext.Error = "invalid bearer token";
                        if (string.IsNullOrEmpty(bearerChallengeContext.ErrorDescription))
                            bearerChallengeContext.ErrorDescription = "Request requires valid JWT token";

                        if (bearerChallengeContext.AuthenticateFailure != null &&
                            bearerChallengeContext.AuthenticateFailure.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            var authenticationException =
                                bearerChallengeContext.AuthenticateFailure as SecurityTokenExpiredException;
                            bearerChallengeContext.Response.Headers.Add("x-token-expired", authenticationException.Expires.ToString("o"));
                            bearerChallengeContext.Error = "token expired";
                            bearerChallengeContext.ErrorDescription = $"Bearer token expired on {authenticationException.Expires.ToString("o")}";
                        }

                        return bearerChallengeContext.Response.WriteAsync(
                            JsonConvert.SerializeObject(
                                new contextResponse(bearerChallengeContext.Error, bearerChallengeContext.ErrorDescription)));
                    },
                };
            });
        }
    }
    public struct contextResponse
    {
        public contextResponse(string error, string errorDescription)
        {
            Error = error;
            error_description = errorDescription;
        }

        public string Error { get; set; }
        public string error_description { get; set; }
    }
}

