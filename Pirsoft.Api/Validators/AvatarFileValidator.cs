namespace Pirsoft.Api.Validators
{
    public class AvatarFileValidator : IAvatarFileValidator
    {
        public bool IsAvatarFileValid(IFormFile file)
        {
            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (extension != ".png" && extension != ".jpg")
            {
                return false;
            }

            long fileSize = file.Length;

            if (fileSize < 125 || fileSize > 2097152)
            {
                return false;
            }

            return true;
        }
    }

    public interface IAvatarFileValidator
    {
        bool IsAvatarFileValid(IFormFile file);
    }
}
