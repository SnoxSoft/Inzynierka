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
            if (formData.Files == null || formData.Files.Any() == false)
            {
                throw new ArgumentException("Request body form data does not contain any files.", nameof(formData));
            }

            IFormFile postedAvatarFile = formData.Files[0];

            if (_avatarFileVlidator.IsAvatarFileValid(postedAvatarFile) == false)
            {
                throw new ArgumentException("Passed file other than '.png' or '.jpg' or more than 2 MB in size.", nameof(formData));
            }

            string avatarSecureFilePath = prepareSecureFilePath(postedAvatarFile);

            using (var stream = new FileStream(avatarSecureFilePath, FileMode.Create))
            {
                await postedAvatarFile.CopyToAsync(stream);
            }

            if (File.Exists(avatarSecureFilePath) == false)
            {
                throw new InvalidOperationException("Avatar file was not uploaded properly.");
            }

            return avatarSecureFilePath;
        }

        private string prepareSecureFilePath(IFormFile postedFile)
        {
            string fullPathToAvatarDirectory = ensureAvatarDirectoryExist();

            string originalExtension = Path.GetExtension(postedFile.FileName);
            string secureFileName = Path.ChangeExtension(Path.GetRandomFileName(), originalExtension);

            return Path.Combine(fullPathToAvatarDirectory, secureFileName);
        }

        private string ensureAvatarDirectoryExist()
        {
            string projectRootDirectory = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
            string avatarDirectory = _globalAppSettings.GetValue<string>("Resources:AvatarDirectory");
            string fullPathToAvatarDirectory = Path.Combine(projectRootDirectory, avatarDirectory);

            if (Directory.Exists(fullPathToAvatarDirectory) == false)
            {
                Directory.CreateDirectory(fullPathToAvatarDirectory);
            }

            return fullPathToAvatarDirectory;
        }
    }

    public interface IAvatarFileUploadHandler
    {
        Task<string> Upload(IFormCollection formData);
    }
}
