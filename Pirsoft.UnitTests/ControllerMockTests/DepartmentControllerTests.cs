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

public class DepartmentControllerTests
{
    private Mock<ICrudHandler> _crudHandlerMock = null!;
    private DepartmentController _departmentController = null!;

    [SetUp]
    public void SetUp()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _departmentController = new DepartmentController(_crudHandlerMock.Object);
    }

    [Test]
    public async Task DeleteEmployeeById_WhenEmployeeExists_ShouldReturnOk()
    {
        // Arrange
        var departmentId = 1;
        var department = new DepartmentModel() { ApiInternalId = departmentId };
        _crudHandlerMock.Setup(x => x.ReadAsync<DepartmentModel>(departmentId)).ReturnsAsync(department);

        // Act
        var response = await _departmentController.DeleteDepartmentById(departmentId);

        // Assert
        response.Should().BeOfType<OkResult>();
    }

    [Test]
    public async Task DeleteEmployeeById_WhenEmployeeDoesNotExist_ShouldReturnNotFound()
    {
        // Arrange
        var departmentId = 1;
        DepartmentModel department = null;
        _crudHandlerMock.Setup(x => x.ReadAsync<DepartmentModel>(departmentId)).ReturnsAsync(department);

        // Act
        var response = await _departmentController.DeleteDepartmentById(departmentId);

        // Assert
        response.Should().BeOfType<NotFoundResult>();
    }

    [Test]
    public async Task DeleteEmployeeById_WhenDeleteAsyncThrowsException_ShouldReturnInternalServerError()
    {
        // Arrange
        var departmentId = 1;
        _crudHandlerMock.Setup(x => x.ReadAsync<DepartmentModel>(departmentId)).ReturnsAsync(new DepartmentModel { ApiInternalId = departmentId });
        _crudHandlerMock.Setup(x => x.DeleteAsync(It.IsAny<DepartmentModel>())).ThrowsAsync(new Exception());

        // Act
        var result = await _departmentController.DeleteDepartmentById(departmentId);

        // Assert
        result.Should().BeOfType<ObjectResult>()
            .Which.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
    }

    [Test]
    public async Task DeleteEmployeeById_WhenDeleteAsyncIsSuccessful_ShouldCallCrudHandlerDeleteAsync()
    {
        // Arrange
        var departmentId = 1;
        var department = new DepartmentModel() { ApiInternalId = departmentId };
        _crudHandlerMock.Setup(x => x.ReadAsync<DepartmentModel>(departmentId)).ReturnsAsync(department);

        // Act
        var response = await _departmentController.DeleteDepartmentById(departmentId);

        // Assert
        _crudHandlerMock.Verify(x => x.DeleteAsync(department), Times.Once);
    }

    [Test]
    public async Task UpdateEmployee_WithValidData_ShouldReturnOk()
    {
        // Arrange
        var departmentId = 1;
        var department = new DepartmentModel { department_name = "Team A"};
        var existingDepartment = new DepartmentModel { department_name = "Team ABC" };
        _crudHandlerMock.Setup(x => x.ReadAsync<DepartmentModel>(departmentId)).ReturnsAsync(existingDepartment);

        // Act
        var result = await _departmentController.UpdateDepartment(departmentId, department);

        // Assert
        result.Should().BeOfType<OkResult>();
        _crudHandlerMock.Verify(x => x.UpdateAsync(existingDepartment), Times.Once);
    }

    [Test]
    public async Task UpdateEmployee_WithNonExistingEmployee_ShouldReturnNotFound()
    {
        // Arrange
        var id = 1;
        var employee = new DepartmentModel() { department_name = "Team A" };
        _crudHandlerMock.Setup(x => x.ReadAsync<EmployeeModel>(id)).ReturnsAsync((EmployeeModel)null);

        // Act
        var result = await _departmentController.UpdateDepartment(id, employee);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}