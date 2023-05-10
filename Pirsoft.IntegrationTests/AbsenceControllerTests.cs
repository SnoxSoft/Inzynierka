using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using Pirsoft.Api.Models;

namespace Pirsoft.IntegrationTests;

public class AbsenceControllerTests
{
    private readonly HttpClient _client = new();
    
    [Test]
    public void GetAllAbsenceStatuses_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/absence/statuses");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public void GetAllAbsenceTypes_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/absence/types");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public async Task CreateNewAbsence_IsReturning_SuccessCodeWithValidParameters()
    {
        var response = await _client.PostAsync("https://localhost:7120/create/new/absence?absenceStartDate=2023-05-05&absenceEndDate=2023-05-05&unpaid=1&absenceTypeId=1&employeeApproverId=1&employeeOwnerId=1&absenceStatusId=1", null);
    
        response.IsSuccessStatusCode.Should().BeTrue();
        response.EnsureSuccessStatusCode();
    }
    
    [Test]
    public async Task GetAbsencesForEmployeeBetweenDates_IsReturning_SuccessCodeWithValidParameters()
    {
        var response = await _client.GetAsync("https://localhost:7120/get/employee/absences/2/2023-05-05/2023-05-06");
        
        response.IsSuccessStatusCode.Should().BeTrue();
        response.EnsureSuccessStatusCode();
    }
    
    [Test]
    public async Task GetEmployeesAbsencesBetweenDates_IsReturning_SuccessCodeWithValidParameters()
    {
        var response = await _client.GetAsync("https://localhost:7120/get/all/employee/absences/2023-05-05/2023-05-06");
        
        response.IsSuccessStatusCode.Should().BeTrue();
        response.EnsureSuccessStatusCode();
    }
}