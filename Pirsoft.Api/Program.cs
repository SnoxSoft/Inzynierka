using Pirsoft.Api.Configurators;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

AppServicesConfigurator.Instance.Init(builder);

AppRunner.Instance.Init(builder);
AppRunner.Instance.Run();
