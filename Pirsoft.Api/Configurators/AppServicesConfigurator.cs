using System.Diagnostics;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.PatternsAbstraction;

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

            _builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(_builder.Configuration.GetSection("AzureAd"));
            _builder.Services
                .AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            _builder.Services
                .AddEndpointsApiExplorer();
            _builder.Services
                .AddSwaggerGen();
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
