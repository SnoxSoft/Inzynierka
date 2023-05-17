using Pirsoft.Api.Validators;

namespace Pirsoft.Api.Filesystem
{
    public class AvatarFileUploadHandler : IAvatarFileUploadHandler
    {
        private readonly IAvatarFileValidator _avatarFileVlidator = null!;
        private readonly IConfiguration _globalAppSettings = null!;

        public AvatarFileUploadHandler(
            IAvatarFileValidator avatarFileVlidator,
            IConfiguration globalAppSettings)
        {
            _avatarFileVlidator = avatarFileVlidator;
            _globalAppSettings = globalAppSettings;
        }

        public async Task<string> Upload(IFormCollection formData)
        {
            return await Task.FromException<string>(new NotImplementedException());
        }
    }

    public interface IAvatarFileUploadHandler
    {
        Task<string> Upload(IFormCollection formData);
    }
}
