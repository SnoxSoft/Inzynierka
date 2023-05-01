using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;

namespace Pirsoft.Api.Controllers
{
    [Route("/api/")]
    [Controller]
    public class LoginController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        public LoginController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("authenticate", Name = "Authenticate")]
        public async Task<ActionResult<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request) => Ok(await _authenticationService.AuthenticateAsync(request));
        }
}
