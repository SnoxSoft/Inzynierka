using Pirsoft.Api.Configurators;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

AppServicesConfigurator.Instance.Init(builder);
builder.Services.Configure<MailConfigurator>(builder.Configuration.GetSection(nameof(MailConfigurator)));

AppRunner.Instance.Init(builder);
AppRunner.Instance.Run();
