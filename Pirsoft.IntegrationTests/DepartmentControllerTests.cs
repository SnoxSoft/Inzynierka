using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Models;

namespace Pirsoft.IntegrationTests;

public class DepartmentControllerTests
{
    private readonly HttpClient _client = new();
    
    [Test]
    public void GetAllDepartments_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/departments");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetDepartmentById_IsSuccessful_ForExistingDepartment()
    {
        var response = _client.GetAsync("https://localhost:7120/get/department/1");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetDepartmentById_IsUnsuccessful_ForNonNumberId()
    {
        var response = _client.GetAsync("https://localhost:7120/get/company/abc");

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetDepartmentById_IsReturningNotFound()
    {
        var response = _client.GetAsync("https://localhost:7120/get/company/58462835682");

        response.Result.Should().HaveStatusCode(HttpStatusCode.NotFound);
        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public void CreateNewEmployee_IsReturning_SuccessCodeWithValidParameters()
    {
        var response = _client.PostAsync("https://localhost:7120/create/department?departmentName=" + "Department " + Guid.NewGuid().ToString("N").Substring(0, 8), null);

        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}