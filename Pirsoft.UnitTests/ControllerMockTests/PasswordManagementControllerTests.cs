using System;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Controllers;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Services;

namespace Pirsoft.UnitTests.ControllerMockTests;

[TestFixture]
public class PasswordManagementControllerTests
{
    private Mock<ICrudHandler> _crudHandlerMock = null!;
    private Mock<IEmployeeCrudHandler> _employeeCrudHandlerMock = null!;
    private Mock<IMailService> _emailServiceMock = null!;
    private Mock<IPasswordService> _passwordServiceMock = null!;

    private PasswordManagementController _controller = null!;

    [SetUp]
    public void Setup()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _employeeCrudHandlerMock = new Mock<IEmployeeCrudHandler>();
        _emailServiceMock = new Mock<IMailService>();
        _passwordServiceMock = new Mock<IPasswordService>();

        _controller = new PasswordManagementController(
            _crudHandlerMock.Object,
            _emailServiceMock.Object,
            _passwordServiceMock.Object,
            _employeeCrudHandlerMock.Object
        );
    }

    [Test]
    public async Task ChangePasswordWithResetCode_ShouldReturnBadRequest_WhenProvidedExpiredResetToken()
    {
        // Arrange
        int fakeResetCode = 1;
        string fakeFirstPassword  = "matchingPassword",
               fakeSecondPassword = "matchingPassword";

        PasswordResetTokenModel fakeExpiredResetToken = new()
        {
            reset_code = fakeResetCode,
            expiration_time = new DateTime(1900, 1, 1, 1, 1, 1) // Expired token
        };

        IQueryable<PasswordResetTokenModel> fakeQueryResult = new PasswordResetTokenModel[]
        {
            fakeExpiredResetToken,
        }.AsQueryable();

        _crudHandlerMock
            .Setup(m => m.ReadAllAsync<PasswordResetTokenModel>())
            .ReturnsAsync(fakeQueryResult);

        // Act
        ActionResult result = await _controller.ChangePasswordWithResetCode(fakeResetCode, fakeFirstPassword, fakeSecondPassword);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>()
            .Which.Value.Should().Be("Password reset token has expired.");
    }

    [Test]
    public async Task ChangePasswordWithResetCode_ShouldReturnBadRequest_WhenPasswordsDoNotMatch()
    {
        // Arrange
        int fakeResetCode = 1;
        string fakeFirstPassword  = "notMatchingPassword_1",
               fakeSecondPassword = "notMatchingPassword_2";

        PasswordResetTokenModel fakeValidResetToken = new()
        {
            reset_code = fakeResetCode,
            expiration_time = DateTime.Now.AddHours(1),
        };

        IQueryable<PasswordResetTokenModel> fakeQueryResult = new PasswordResetTokenModel[]
        {
            fakeValidResetToken,
        }.AsQueryable();

        _crudHandlerMock
            .Setup(m => m.ReadAllAsync<PasswordResetTokenModel>())
            .ReturnsAsync(fakeQueryResult);

        // Act
        var result = await _controller.ChangePasswordWithResetCode(fakeResetCode, fakeFirstPassword, fakeSecondPassword);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>()
            .Which.Value.Should().Be("New passwords do not match");
    }

    [Test]
    public async Task ChangePasswordWithResetCode_ShouldReturnOkResult_WhenProvidedValidInformation()
    {
        // Arrange
        int fakeResetCode = 1,
            fakeEmployeeId = 1;
        string fakeFirstPassword  = "matchingPassword",
               fakeSecondPassword = "matchingPassword";

        EmployeeModel fakeEmployee = new() { employee_id = fakeEmployeeId };

        PasswordResetTokenModel fakeValidResetToken = new()
        {
            reset_code = fakeResetCode,
            expiration_time = DateTime.Now.AddHours(1),
            token_employee_id = fakeEmployeeId,
        };

        IQueryable<PasswordResetTokenModel> fakeQueryResult = new PasswordResetTokenModel[]
        {
            fakeValidResetToken,
        }.AsQueryable();

        _crudHandlerMock
            .Setup(m => m.ReadAllAsync<PasswordResetTokenModel>())
            .ReturnsAsync(fakeQueryResult);
        _crudHandlerMock
            .Setup(m => m.ReadAsync<EmployeeModel>(It.IsAny<int>()))
            .ReturnsAsync(fakeEmployee);
        _crudHandlerMock
            .Setup(m => m.UpdateAsync(It.IsAny<EmployeeModel>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.ChangePasswordWithResetCode(fakeResetCode, fakeFirstPassword, fakeSecondPassword);

        // Assert
        result.Should().BeOfType<OkResult>();
    }
}