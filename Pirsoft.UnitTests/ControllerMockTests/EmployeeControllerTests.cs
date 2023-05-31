using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Controllers;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Filesystem;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.ControllerMockTests;

[TestFixture]
public class EmployeeControllerTests
{
    private Mock<ICrudHandler> _crudHandlerMock = null!;
    private Mock<IEmployeeCrudHandler> _employeeCrudHandlerMock = null!;
    private Mock<IHashPasswordManager> _hashPasswordManagerMock = null!;

    private EmployeeController _employeeController = null!;

    [SetUp]
    public void SetUp()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _employeeCrudHandlerMock = new Mock<IEmployeeCrudHandler>();
        _hashPasswordManagerMock = new Mock<IHashPasswordManager>();

        _employeeController = new EmployeeController(
            Mock.Of<IAvatarFileUploadHandler>(),
            _crudHandlerMock.Object,
            _employeeCrudHandlerMock.Object,
            Mock.Of<IEmployeeModelValidator>(),
            _hashPasswordManagerMock.Object);
    }

    [Test]
    public async Task DeleteEmployeeById_WhenEmployeeExists_ShouldReturnOk()
    {
        // Arrange
        var employeeId = 1;
        var employee = new EmployeeModel { ApiInternalId = employeeId };
        _crudHandlerMock.Setup(m => m.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(employee);

        // Act
        var response = await _employeeController.DeleteEmployeeById(employeeId);

        // Assert
        response.Should().BeOfType<OkResult>();
    }

    [Test]
    public async Task DeleteEmployeeById_WhenEmployeeDoesNotExist_ShouldReturnNotFound()
    {
        // Arrange
        var employeeId = 1;
        EmployeeModel employee = null;
        _crudHandlerMock.Setup(m => m.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(employee);

        // Act
        var response = await _employeeController.DeleteEmployeeById(employeeId);

        // Assert
        response.Should().BeOfType<NotFoundResult>();
    }

    [Test]
    public async Task DeleteEmployeeById_WhenDeleteAsyncThrowsException_ShouldReturnInternalServerError()
    {
        // Arrange
        var employeeId = 1;
        _crudHandlerMock.Setup(m => m.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(new EmployeeModel { ApiInternalId = employeeId });
        _crudHandlerMock.Setup(m => m.DeleteAsync(It.IsAny<EmployeeModel>())).ThrowsAsync(new Exception());

        // Act
        var result = await _employeeController.DeleteEmployeeById(employeeId);

        // Assert
        result.Should().BeOfType<StatusCodeResult>()
            .Which.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
    }

    [Test]
    public async Task DeleteEmployeeById_WhenDeleteAsyncIsSuccessful_ShouldCallCrudHandlerDeleteAsync()
    {
        // Arrange
        var employeeId = 1;
        var employee = new EmployeeModel { ApiInternalId = employeeId };
        _crudHandlerMock.Setup(m => m.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(employee);

        // Act
        var response = await _employeeController.DeleteEmployeeById(employeeId);

        // Assert
        _crudHandlerMock.Verify(m => m.DeleteAsync(employee), Times.Once);
    }

    [Test]
    public async Task UpdateEmployee_WithValidData_ShouldReturnOk()
    {
        // Arrange
        int fakeId = 1;
        int[] fakeSkillsIds = new int[] { fakeId };

        EmployeeModel fakeExistingEmployee = new()
        {
            employee_id = fakeId,

            first_name = "Jane",
            last_name = "Doe",
            email_address = "jane.doe@example.com",
            password = "SecretPassword!1234",
            pesel = "00000000000",
            bank_account_number = "00000000000000000000000000",
            avatar_file_path = "fake\\path.png",

            is_active = 1,
            password_reset = 1,
            leave_is_seniority_threshold = 1,

            seniority_in_months = 1,
            leave_base_days = 1,
            leave_demand_days = 1,
            salary_gross = 1.0,

            employment_start_date = DateTime.Now,
            birth_date = DateTime.Now,

            employee_contract_type_id = 1,
            employee_department_id = 1,
            employee_seniority_level_id = 1,
            employee_company_role_id = 1,
        };

        SkillModel fakeSkill = new()
        {
            skill_id = fakeId,
            skill_name = "FakeName"
        };

        List<SkillModel> fakeSkills = new List<SkillModel>() { fakeSkill };

        Mock<IFormCollection> formCollectionMock = new();
        formCollectionMock
            .Setup(m => m.Files)
            .Returns(new FormFileCollection());

        Mock<HttpRequest> requestMock = new();
        requestMock.Setup(m => m.Scheme).Returns("http");
        requestMock.Setup(m => m.Host).Returns(HostString.FromUriComponent("http://localhost:7120"));
        requestMock.Setup(m => m.PathBase).Returns(PathString.FromUriComponent("/"));
        requestMock.Setup(m => m.Form).Returns(formCollectionMock.Object);

        HttpContext fakeHttpContext = Mock.Of<HttpContext>(_ => _.Request == requestMock.Object);

        ControllerContext fakeControllerContext = new()
        {
            HttpContext = fakeHttpContext,
        };

        _employeeController.ControllerContext = fakeControllerContext;

        _employeeCrudHandlerMock
            .Setup(m => m.ReadEmployeeByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(fakeExistingEmployee);
        _employeeCrudHandlerMock
            .Setup(m => m.ReadSkillsByIdsAsync(It.IsAny<IEnumerable<int>>()))
            .ReturnsAsync(fakeSkills);
        _employeeCrudHandlerMock
            .Setup(m => m.UpdateAsync(It.IsAny<EmployeeModel>()))
            .ReturnsAsync(await Task.FromResult(fakeId));

        // Act
        var result = await _employeeController.UpdateEmployee(fakeId, "John", "Doe", "12345654643", "64532253411143242324342342", "1,2,3,4",
            1, 12,1, 3000, 0,
            new DateTime(2023,05,05), new DateTime(2023,10,12), 1, 2, 1);

        // Assert
        result.Should().BeOfType<OkResult>();

        _employeeCrudHandlerMock
            .Verify(m => m.ReadEmployeeByIdAsync(It.IsAny<int>()), Times.Once);
        _employeeCrudHandlerMock
            .Verify(m => m.ReadSkillsByIdsAsync(It.IsAny<IEnumerable<int>>()), Times.Once);
        _employeeCrudHandlerMock
            .Verify(m => m.UpdateAsync(fakeExistingEmployee), Times.Once);

    }

    [Test]
    public async Task UpdateEmployee_WithNonExistingEmployee_ShouldReturnNotFound()
    {
        // Arrange
        var id = 1;
        
        _crudHandlerMock.Setup(m => m.ReadAsync<EmployeeModel>(id)).ReturnsAsync((EmployeeModel)null);

        // Act
        var result = await _employeeController.UpdateEmployee(id, "John", "Doe", "12345654643", "64532253411143242324342342", "1,2,3,4",
            1, 12,1, 3000, 0,
            new DateTime(2023,05,05), new DateTime(2023,10,12), 1, 2, 1);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}