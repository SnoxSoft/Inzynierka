using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Filesystem;
using Pirsoft.Api.PatternsAbstraction;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Services;
using Pirsoft.Api.Validators;

namespace Pirsoft.Api.Configurators
{
    public class DependencyConfigurator : SingletonBase<DependencyConfigurator>
    {
        private IServiceCollection _services = null!;

        public void Init(IServiceCollection services)
        {
            _services = services;

            configureDatabaseManagement();

            configureValidators();

            configureEmailManagement();

            _services.AddScoped<IAvatarFileUploadHandler, AvatarFileUploadHandler>();
        }

        private void configureDatabaseManagement()
        {
            _services.AddTransient<ICrudHandler, CrudHandler>();
            _services.AddTransient<IEmployeeCrudHandler, EmployeeCrudHandler>();
            _services.AddSingleton<IDatabaseModelBuilder, DatabaseModelBuilder>();
        }

        private void configureValidators()
        {
            _services.AddScoped<IEmployeeModelValidator, EmployeeModelValidator>();
        }
        
        private void configureEmailManagement()
        {
            _services.AddTransient<IMailService, MailService>();
            _services.AddTransient<IPasswordService, PasswordService>();
        }
    }
}
