using Microsoft.Identity.Client;
using Pirsoft.Api.Security.Models;

namespace Pirsoft.Api.Security.Interfaces
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
    }
}
