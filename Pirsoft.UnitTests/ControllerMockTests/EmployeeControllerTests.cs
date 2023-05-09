using System;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Controllers;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Managers;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.ControllerMockTests;

[TestFixture]
public class EmployeeControllerTests
{
    private Mock<ICrudHandler> _crudHandlerMock;
    private EmployeeController _employeeController;

    [SetUp]
    public void SetUp()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _employeeController = new EmployeeController(_crudHandlerMock.Object, new EmployeeModelValidator(),new UserManager(new CrudHandler(new DatabaseContext())));
    }

    [Test]
    public async Task DeleteEmployeeById_WhenEmployeeExists_ShouldReturnOk()
    {
        // Arrange
        var employeeId = 1;
        var employee = new EmployeeModel { ApiInternalId = employeeId };
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(employee);

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
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(employee);

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
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(new EmployeeModel { ApiInternalId = employeeId });
        _crudHandlerMock.Setup(x => x.DeleteAsync(It.IsAny<EmployeeModel>())).ThrowsAsync(new Exception());

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
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(employeeId)).ReturnsAsync(employee);

        // Act
        var response = await _employeeController.DeleteEmployeeById(employeeId);

        // Assert
        _crudHandlerMock.Verify(x => x.DeleteAsync(employee), Times.Once);
    }
    
    [Test]
    public async Task UpdateEmployee_WithValidData_ShouldReturnOk()
    {
        // Arrange
        var id = 1;
        var employee = new EmployeeModel { first_name = "John", last_name = "Doe", pesel = "12345678901" };
        var existingEmployee = new EmployeeModel { employee_id = id, first_name = "Jane", last_name = "Doe", pesel = "12345678901", email_address = "jane.doe@example.com" };
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(id)).ReturnsAsync(existingEmployee);

        // Act
        var result = await _employeeController.UpdateEmployee(id, employee, _crudHandlerMock.Object);

        // Assert
        result.Should().BeOfType<OkResult>();
        _crudHandlerMock.Verify(x => x.UpdateAsync(existingEmployee), Times.Once);
    }

    [Test]
    public async Task UpdateEmployee_WithNonExistingEmployee_ShouldReturnNotFound()
    {
        // Arrange
        var id = 1;
        var employee = new EmployeeModel { first_name = "John", last_name = "Doe", pesel = "12345678901" };
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(id)).ReturnsAsync((EmployeeModel)null);

        // Act
        var result = await _employeeController.UpdateEmployee(id, employee, _crudHandlerMock.Object);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}