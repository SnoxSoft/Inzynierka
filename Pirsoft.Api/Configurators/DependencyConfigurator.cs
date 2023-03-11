﻿using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.PatternsAbstraction;
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
        }

        private void configureDatabaseManagement()
            => _services.AddSingleton<ICrudHandler, CrudHandler>();

        private void configureValidators()
        {
            _services.AddScoped<IEmployeeModelValidator, EmployeeModelValidator>();
        }
    }
}