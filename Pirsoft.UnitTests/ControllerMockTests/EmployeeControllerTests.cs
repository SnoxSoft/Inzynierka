using System;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Controllers;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.ControllerMockTests;

[TestFixture]
public class EmployeeControllerTests
{
    private Mock<ICrudHandler> _crudHandlerMock = null!;
    private EmployeeController _employeeController = null!;

    [SetUp]
    public void SetUp()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _employeeController = new EmployeeController(_crudHandlerMock.Object, Mock.Of<IEmployeeModelValidator>(), Mock.Of<IEmployeeCrudHandler>());
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
        
        var existingEmployee = new EmployeeModel { employee_id = id, first_name = "Jane", last_name = "Doe", pesel = "12345678901", email_address = "jane.doe@example.com" };
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(id)).ReturnsAsync(existingEmployee);

        // Act
        var result = await _employeeController.UpdateEmployee(id, "John", "Doe", "12345654643", "64532253411143242324342342",
            1, 12,1, 3000, 0,
            new DateTime(2023,05,05), new DateTime(2023,10,12), 1, 2, 1);

        // Assert
        result.Should().BeOfType<OkResult>();
        _crudHandlerMock.Verify(x => x.UpdateAsync(existingEmployee), Times.Once);
    }

    [Test]
    public async Task UpdateEmployee_WithNonExistingEmployee_ShouldReturnNotFound()
    {
        // Arrange
        var id = 1;
        
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(id)).ReturnsAsync((EmployeeModel)null);

        // Act
        var result = await _employeeController.UpdateEmployee(id, "John", "Doe", "12345654643", "64532253411143242324342342",
            1, 12,1, 3000, 0,
            new DateTime(2023,05,05), new DateTime(2023,10,12), 1, 2, 1);


        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}