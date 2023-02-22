using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
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
    }
}
