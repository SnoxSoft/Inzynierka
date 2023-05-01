namespace Pirsoft.Api.Security.Models
{
    public class AuthenticationRequest
    {
        public string Email { get; set; } = null;
        public string Password { get; set; } = null;
    }
}
