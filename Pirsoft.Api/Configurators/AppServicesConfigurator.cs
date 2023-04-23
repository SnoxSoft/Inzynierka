using System.Diagnostics;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.PatternsAbstraction;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Managers;
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
            SecurityConfigurator.addJwtConfiguration(_builder);

            _builder.Services
                .AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            _builder.Services
                .AddEndpointsApiExplorer();

            SwaggerConfigurator.AddSwagger(_builder.Services);
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
    }
}
