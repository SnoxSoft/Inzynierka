using System.Net;
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

    [Test]
    public void GetCompanyRoleById_IsSuccessful_ForExistingContractType()
    {
        var response = _client.GetAsync("https://localhost:7120/get/company/role/1");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetCompanyRoleById_IsUnSuccesful_ForNonNumberId()
    {
        var response = _client.GetAsync("https://localhost:7120/get/company/role/abc");

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetCompanyRoleById_IsReturningNotFound()
    {
        var response = _client.GetAsync("https://localhost:7120/get/company/role/999999");

        response.Result.Should().HaveStatusCode(HttpStatusCode.NoContent);
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}