using Microsoft.Extensions.FileProviders;
using Pirsoft.Api.PatternsAbstraction;

namespace Pirsoft.Api.Configurators.OptionsProviders
{
    public class StaticFilesOptionsProvider : SingletonBase<StaticFilesOptionsProvider>
    {
        private const string AVATAR_DIRECTORY_NAME = "AvatarImages";

        private StaticFileOptions _staticFileOptions = null!;

        public StaticFileOptions Options => _staticFileOptions ?? createOptions();

        private StaticFileOptions createOptions() => _staticFileOptions = new()
        {
            FileProvider = new PhysicalFileProvider(ensureAvatarDirectoryExist()),
            RequestPath = $"/{AVATAR_DIRECTORY_NAME}",
        };

        private string ensureAvatarDirectoryExist()
        {
            string avatarDirectoryFullPath = Path.Combine(Directory.GetCurrentDirectory(), AVATAR_DIRECTORY_NAME);

            if (Directory.Exists(avatarDirectoryFullPath) == false)
            {
                Directory.CreateDirectory(avatarDirectoryFullPath);
            }

            return avatarDirectoryFullPath;
        }
    }
}
