namespace Pirsoft.Api.Security.Models
{
    public class UserManagerResult
    {
        public bool Succeeded { get; protected set; }
        public List<string> Errors { get; private set; }
        public static UserManagerResult Success { get; }
            = new UserManagerResult() { Succeeded = true };
        public static UserManagerResult Failure(List<string> errors)
        {
            return new UserManagerResult()
            {
                Succeeded = false,
                Errors = errors
            };
        }
    }
}
