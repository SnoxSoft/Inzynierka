namespace Pirsoft.Api.Validators
{
    public class AvatarFileValidator : IAvatarFileValidator
    {
        public AvatarFileValidator()
        {
        }

        public bool IsAvatarFileValid(IFormFile file)
        {
            throw new NotImplementedException();
        }
    }

    public interface IAvatarFileValidator
    {
        bool IsAvatarFileValid(IFormFile file);
    }
}
