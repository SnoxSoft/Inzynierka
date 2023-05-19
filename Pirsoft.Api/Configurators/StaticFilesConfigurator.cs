using Microsoft.Extensions.FileProviders;
using Pirsoft.Api.PatternsAbstraction;

namespace Pirsoft.Api.Configurators
{
    public class StaticFilesConfigurator : SingletonBase<StaticFilesConfigurator>
    {
        private const string AVATAR_DIRECTORY = "Resources:AvatarDirectory";

        public void Init(IApplicationBuilder appBuilder, IConfiguration config)
        {
            string avatarSubdirectory = config.GetValue<string>(AVATAR_DIRECTORY);

            string fullPathToAvatarDirectory = ensureDirectoryExists(avatarSubdirectory);

            appBuilder.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(fullPathToAvatarDirectory),
                RequestPath = $"/{avatarSubdirectory}",
            });
        }

        private string ensureDirectoryExists(string subdirectory)
        {
            string projectRootDirectory = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
            string fullDirectoryPath = Path.Combine(projectRootDirectory, subdirectory);

            if (Directory.Exists(fullDirectoryPath) == false)
            {
                Directory.CreateDirectory(fullDirectoryPath);
            }

            return fullDirectoryPath;
        }
    }
}
