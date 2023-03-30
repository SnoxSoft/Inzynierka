using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;
using Pirsoft.Api.Models.ModelCreators;

namespace Pirsoft.IntegrationTests;

public class EmployeeControllerTests
{
    private readonly HttpClient _client = new();

    [Test]
    public void CreateNewEmployeeEndpointIsReturningSuccessCodeWithValidParameters()
    {
        var employeeModel = new
        {
            FirstName = "Janusz",
            LastName = "Kowalski",
            Email = "janusz.test@gmail.com",
            Password = "123qwe",
            AccountType = (AccountTypeModel)new AccountTypeCreator(EAccountType.Employee).CreateModel(), 
            Pesel = "00112212345",
            BankAccountNumber = "12345678901234567890123456",
            DepartmentId = 1,
            SeniorityInMonths = 10,
            EmploymentStartDate = (2020, 10, 10),
            IsActive = Convert.ToSByte(true),
            PasswordReset = Convert.ToSByte(false),
            DateOfBirth = (2000, 10, 10),
            GrossSalary = 10000d,
            PositionType = (PositionTypeModel)new PositionTypeCreator(EPositionType.Mid).CreateModel(),
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeTrue();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public void CreateNewEmployeeEndpointIsReturningFailCodeWithInvalidPesel()
    {
        var employeeModel = new
        {
            FirstName = "Janusz",
            LastName = "Kowalski",
            Email = "janusz.test@gmail.com",
            Password = "123qwe",
            AccountType = (AccountTypeModel)new AccountTypeCreator(EAccountType.Employee).CreateModel(), 
            Pesel = "1",
            BankAccountNumber = "12345678901234567890123456",
            DepartmentId = 1,
            SeniorityInMonths = 10,
            EmploymentStartDate = (2020, 10, 10),
            IsActive = Convert.ToSByte(true),
            PasswordReset = Convert.ToSByte(false),
            DateOfBirth = (2000, 10, 10),
            GrossSalary = 10000d,
            PositionType = (PositionTypeModel)new PositionTypeCreator(EPositionType.Mid).CreateModel(),
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
    
    [Test]
    public void CreateNewEmployeeEndpointIsReturningFailCodeWithInvalidBankAccountNumber()
    {
        var employeeModel = new
        {
            FirstName = "Janusz",
            LastName = "Kowalski",
            Email = "janusz.test@gmail.com",
            Password = "123qwe",
            AccountType = (AccountTypeModel)new AccountTypeCreator(EAccountType.Employee).CreateModel(), 
            Pesel = "00112212345",
            BankAccountNumber = "1",
            DepartmentId = 1,
            SeniorityInMonths = 10,
            EmploymentStartDate = (2020, 10, 10),
            IsActive = Convert.ToSByte(true),
            PasswordReset = Convert.ToSByte(false),
            DateOfBirth = (2000, 10, 10),
            GrossSalary = 10000d,
            PositionType = (PositionTypeModel)new PositionTypeCreator(EPositionType.Mid).CreateModel(),
        };

        var response = _client.PostAsJsonAsync("https://localhost:7120/create/new/employee", employeeModel);

        response.Result.IsSuccessStatusCode.Should().BeFalse();
        response.IsCompletedSuccessfully.Should().BeTrue();
    }
}