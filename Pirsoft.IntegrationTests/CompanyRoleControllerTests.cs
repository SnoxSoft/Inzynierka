using System.Net.Http;
using FluentAssertions;
using NUnit.Framework;

namespace Pirsoft.IntegrationTests;

public class CompanyRoleControllerTests
{
    private readonly HttpClient _client = new();
    
    [Test]
    public void GetAllCompanyRoles_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/company/roles");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}