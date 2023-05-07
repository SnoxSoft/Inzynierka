using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.FileProviders;
using Pirsoft.Api.Configurators.OptionsProviders;
using Pirsoft.Api.PatternsAbstraction;

namespace Pirsoft.Api.Configurators
{
    public class AppRunner : SingletonBase<AppRunner>
    {
        private WebApplication _app = null!;

        public bool CanRun { get; private set; } = false;

        public void Init(WebApplicationBuilder builder)
        {
            _app = builder.Build();

            configureAppBuild();
        }

        public void Run()
        {
            if (CanRun == false)
            {
                throw new InvalidOperationException("App build failed or was not configured properly.");
            }

            _app.Run();
        }

        private void configureAppBuild()
        {
            // Configure the HTTP request pipeline.
            if (_app.Environment.IsDevelopment())
            {
                _app.UseSwagger();
                _app.UseSwaggerUI();
            }
            _app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            _app.UseHttpsRedirection();
            _app.UseAuthentication();
            _app.UseAuthorization();
            _app.MapControllers();

            // move to separate configurator
            string projectRootDirectory = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
            string avatarDirectory = _app.Configuration.GetValue<string>("Resources:AvatarDirectory")!;
            string fullPathToAvatarDirectory = Path.Combine(projectRootDirectory, avatarDirectory);

            if (Directory.Exists(fullPathToAvatarDirectory) == false)
            {
                Directory.CreateDirectory(fullPathToAvatarDirectory);
            }

            _app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(fullPathToAvatarDirectory),
                RequestPath = $"/{avatarDirectory}"
            });

            //_app.UseStaticFiles(StaticFilesOptionsProvider.Instance.Options);

            CanRun = true;
        }
    }
}
