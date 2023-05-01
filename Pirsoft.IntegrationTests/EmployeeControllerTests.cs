using System;
using System.Net.Http;
using System.Net.Http.Json;
using Azure;
using FluentAssertions;
using NUnit.Framework;

namespace Pirsoft.IntegrationTests;

public class EmployeeControllerTests
{
    private readonly HttpClient _client = new();

    [Test]
    public void CreateNewEmployee_IsReturning_SuccessCodeWithValidParameters()
    {
        var employeeModel = new
        {
            first_name = "Janusz",
            last_name = "Kowalski",
            email_address = "janusz.test@gmail.com",
            password = "123qwe",
            pesel = "00112212345",
            bank_account_number = "12345678901234567890123456",
            seniority_in_months = 10,
            employment_start_date = (2020, 10, 10),
            is_active = Convert.ToByte(true),
            password_reset = Convert.ToByte(false),
            birth_date = (2000, 10, 10),
            salary_gross = 10000d,
            employee_contract_type_id = 1,
            employee_department_id = 1,
            employee_seniority_level_id = 1,
            employee_company_role_id = 1,
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public void CreateNewEmployee_IsReturning_FailCodeWithInvalidPesel()
    {
        var employeeModel = new
        {
            first_name = "Janusz",
            last_name = "Kowalski",
            email_address = "janusz.test@gmail.com",
            password = "123qwe",
            pesel = "1",
            bank_account_number = "12345678901234567890123456",
            seniority_in_months = 10,
            employment_start_date = (2020, 10, 10),
            is_active = Convert.ToByte(true),
            password_reset = Convert.ToByte(false),
            birth_date = (2000, 10, 10),
            salary_gross = 10000d,
            employee_contract_type_id = 1,
            employee_department_id = 1,
            employee_seniority_level_id = 1,
            employee_company_role_id = 1,
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public void CreateNewEmployee_IsReturning_FailCodeWithInvalidBankAccountNumber()
    {
        var employeeModel = new
        {
            first_name = "Janusz",
            last_name = "Kowalski",
            email_address = "janusz.test@gmail.com",
            password = "123qwe",
            pesel = "00112212345",
            bank_account_number = "1",
            seniority_in_months = 10,
            employment_start_date = (2020, 10, 10),
            is_active = Convert.ToByte(true),
            password_reset = Convert.ToByte(false),
            birth_date = (2000, 10, 10),
            salary_gross = 10000d,
            employee_contract_type_id = 1,
            employee_department_id = 1,
            employee_seniority_level_id = 1,
            employee_company_role_id = 1,
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetAllEmployees_IsReturning_SuccessCodeWithResponse()
    {
        var response = _client.GetAsync("https://localhost:7120/get/employees");

        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetFilteredEmployees_IsReturningSuccessCodeWithResponse_ForExisingParameters()
    {
        var response = _client.GetAsync("https://localhost:7120/get/filtered/employees/");
        
        response.Result.Content.Should().NotBeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void GetFilteredEmployees_IsReturningEmptyResponse_ForNonExistingParameters()
    {
        var response = _client.GetAsync("https://localhost:7120/get/filtered/employees/janusz/100/100");
        
        response.Result.Content.Should().BeNull();
        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void SuccessfulLoginWithCorrectCredentials()
    {
        var loginModel = new
        {
            email_address = "janusz.test@gmail.com",
            password = "SommerFerie1234$",
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/login", loginModel);

        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }

    [Test]
    public void UnsuccessfulLoginWithWrongPassword()
    {
        var loginModel = new
        {
            email_address = "janusz.test@gmail.com",
            password = "gnsdo",
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/login", loginModel);

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}