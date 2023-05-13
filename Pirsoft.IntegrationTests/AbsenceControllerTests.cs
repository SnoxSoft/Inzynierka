using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;

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
    public void DeleteAbsence_IsReturning_NotASucces()
    {
        var response = _client.DeleteAsync("https://localhost:7120/delete/absence/6");
        
        response.IsCompletedSuccessfully.Should().BeFalse();
    }
    
    [Test]
    public async Task EditAbsence_IsReturning_Succes()
    {
        var response = await _client.PutAsync("https://localhost:7120/edit/absence/2?employeeApproverId=2&absenceStatusId=3", null);
        
        Console.WriteLine(response.StatusCode);
        Assert.IsTrue(response.StatusCode == HttpStatusCode.OK);
    }

    [Test]
    public async Task CreateNewAbsence_IsReturning_SuccessCodeWithValidParameters()
    {
        var response = await _client.PostAsync("https://localhost:7120/create/new/absence?absenceStartDate=2023-05-05&absenceEndDate=2023-05-05&unpaid=1&absenceTypeId=1&employeeApproverId=1&employeeOwnerId=2&absenceStatusId=1", null);
    
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