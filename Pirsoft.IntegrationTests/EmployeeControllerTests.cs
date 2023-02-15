using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;

namespace Pirsoft.IntegrationTests;

public class EmployeeControllerTests
{
    private HttpStatusCode _expectedStatusCode;
    private HttpResponseMessage _actualResponse = null!;
    private readonly HttpClient _client = new();

    [Test]
    public void CreateNewEmployeeEndpointIsReturningSuccessCodeWithoutParameters()
    {
        var employeeModel = new EmployeeCreator("Jimmy","Raynor", "test@email.com", "123", AccountType.EMPLOYEE, "12345678911", "12345678901234567890123456",
            5,  5, new DateTime(2020, 3, 1), true, false, new DateTime(2000, 3, 1),  5000d, PositionType.JUNIOR).CreateModel();
        
        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeTrue();
    }
}