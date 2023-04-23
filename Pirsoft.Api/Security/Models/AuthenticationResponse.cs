using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Security.Models
{
    public class AuthenticationResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public ESecurityResponse StatusCode { get; set; }
    }
}
