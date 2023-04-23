using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.PatternsAbstraction;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Manager;
using Pirsoft.Api.Security.Models;
using Pirsoft.Api.Security.Services;

namespace Pirsoft.Api.Configurators
{
    public class AppServicesConfigurator : SingletonBase<AppServicesConfigurator>
    {
        private WebApplicationBuilder _builder = null!;

        public void Init(WebApplicationBuilder builder)
        {
            _builder = builder;

            configureServices();

            DependencyConfigurator.Instance.Init(_builder.Services);
        }

        private void configureServices()
        {
            registerDatabaseContext();
            AddSecurityServices();

            _builder.Services
                .AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            _builder.Services
                .AddEndpointsApiExplorer();
            _builder.Services
                .AddSwaggerGen(c => 
                {
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Description = @"JWT Authorization header using the Bearer scheme. 
                            Enter 'Bearer' [space] and then your token in the text input below.
                            Example: 'Bearer 1234abcd'",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                        {
                          new OpenApiSecurityScheme
                          {
                            Reference = new OpenApiReference
                              {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                              },
                              Scheme = "oauth2",
                              Name = "Bearer",
                              In = ParameterLocation.Header,

                            },
                            new List<string>()
                        }
                    });
                    c.SwaggerDoc("v1", new OpenApiInfo
                    {
                        Version = "v1",
                        Title = "PIRSOFT API",
                    });
                });

        }

        private void registerDatabaseContext()
        {
            try
            {
                string connectionString = _builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty;

                if (string.IsNullOrEmpty(connectionString))
                {
                    Debug.Print("Unable to get default connection string from appsettings.json config file.");
                    throw new ArgumentException("Unable to get default connection string from appsettings.json config file.");
                }

                _builder.Services.AddDbContext<DatabaseContext>(
                    options => options.UseMySQL(connectionString),
                    contextLifetime: ServiceLifetime.Singleton,
                    optionsLifetime: ServiceLifetime.Singleton);

                Debug.Print("DbContext registered successfully.");

            }
            catch (ArgumentException ex)
            {
                // TODO: Michal - Ustalić jak można przekazać ten błąd na front
                Console.WriteLine(ex.Message);
            }
        }
        public void AddSecurityServices()
        {
            _builder.Services.Configure<JSONWebTokensSettings>
                (_builder.Configuration.GetSection("JSONWebTokensSettings"));

            _builder.Services.AddSingleton<IUserManager<EmployeeModel>, UserManager>();
            _builder.Services.AddSingleton<ISignInManager<EmployeeModel>, SignInManager>();
            _builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();

            _builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(o =>
                {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = false;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = _builder.Configuration["JSONWebTokensSettings:Issuer"],
                        ValidAudience = _builder.Configuration["JSONWebTokensSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_builder.Configuration["JSONWebTokensSettings:Key"]))
                    };

                    o.Events = new JwtBearerEvents()
                    {
                        OnAuthenticationFailed = c =>
                        {
                            c.NoResult();
                            c.Response.StatusCode = 500;
                            c.Response.ContentType = "text/plain";
                            return c.Response.WriteAsync(c.Exception.ToString());
                        },
                        OnChallenge = context =>
                        {
                            context.HandleResponse();
                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject("401 Not authorized");
                            return context.Response.WriteAsync(result);
                        },
                        OnForbidden = context =>
                        {
                            context.Response.StatusCode = 403;
                            context.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject("403 Not authorized");
                            return context.Response.WriteAsync(result);
                        },
                    };
                });
        
    }
    }
}
