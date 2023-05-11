using System.Net;
using System.Net.Http;
using FluentAssertions;
using NUnit.Framework;

namespace Pirsoft.IntegrationTests;

public class ContractTypeControllerTests
{
    private readonly HttpClient _client = new();
    
    [Test]
    public void GetAllContractTypes_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/contracts");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetContractById_IsSuccessful_ForExistingContractType()
    {
        var response = _client.GetAsync("https://localhost:7120/get/contract/1");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetContractById_IsUnSuccesful_ForNonNumberId()
    {
        var response = _client.GetAsync("https://localhost:7120/get/contract/abc");

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetContractById_IsReturningNotFound()
    {
        var response = _client.GetAsync("https://localhost:7120/get/contract/999999");

        response.Result.Should().HaveStatusCode(HttpStatusCode.NoContent);
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}