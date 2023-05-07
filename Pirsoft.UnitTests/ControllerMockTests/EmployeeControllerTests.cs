using System;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Controllers;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

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
        _employeeController = new EmployeeController(_crudHandlerMock.Object);
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
}