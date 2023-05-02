using System.Net;
using System.Net.Http;
using FluentAssertions;
using NUnit.Framework;

namespace Pirsoft.IntegrationTests;

public class SeniorityLevelControllerTests
{
    private readonly HttpClient _client = new();
    
    [Test]
    public void GetAllSeniorityLevels_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/seniority/levels");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetSeniorityLevelById_IsSuccessful_ForExistingContractType()
    {
        var response = _client.GetAsync("https://localhost:7120/get/seniority/level/1");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetSeniorityLevelById_IsUnSuccesful_ForNonNumberId()
    {
        var response = _client.GetAsync("https://localhost:7120/get/seniority/level/abc");

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetSeniorityLevelById_IsReturningNotFound()
    {
        var response = _client.GetAsync("https://localhost:7120/get/seniority/level/999999");

        response.Result.Should().HaveStatusCode(HttpStatusCode.NoContent);
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}