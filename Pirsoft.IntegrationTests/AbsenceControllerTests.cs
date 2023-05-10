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
        AbsenceModel absenceModel = new AbsenceModel()
        {
            absence_start_date = new DateTime(2023,05,11),
            absence_end_date = new DateTime(2023,05,12),
            unpaid = Convert.ToSByte(1),
            duration = 0,
            absence_id = 1,
            absence_type_id = 1,
            employee_approver_id = 1,
            employee_owner_id = 1,
            absence_status_id = 1,
        };
    
        var response = await _client.PostAsJsonAsync("https://localhost:7120/create/new/absence", absenceModel);
    
        response.IsSuccessStatusCode.Should().BeTrue();
        response.EnsureSuccessStatusCode();
    }
    
}