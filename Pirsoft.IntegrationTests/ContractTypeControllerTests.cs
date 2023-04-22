using System.Net.Http;
using FluentAssertions;
using NUnit.Framework;

namespace Pirsoft.IntegrationTests;

public class ContractTypeControllerTests
{
    private readonly HttpClient _client = new();
    
    [Test]
    public void GetAllContractTypesIsReturningSuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/contracts");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}