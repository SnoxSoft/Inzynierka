using System;
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
        private PasswordManagementController _controller;
        private Mock<ICrudHandler> _crudHandlerMock;
        private Mock<IUserManager<EmployeeModel>> _userManagerMock;
        private Mock<IMailService> _emailServiceMock;
        private Mock<IPasswordService> _passwordServiceMock;

        [SetUp]
        public void Setup()
        {
            _crudHandlerMock = new Mock<ICrudHandler>();
            _userManagerMock = new Mock<IUserManager<EmployeeModel>>();
            _emailServiceMock = new Mock<IMailService>();
            _passwordServiceMock = new Mock<IPasswordService>();

            _controller = new PasswordManagementController(
                _crudHandlerMock.Object,
                _userManagerMock.Object,
                _emailServiceMock.Object,
                _passwordServiceMock.Object
            );
        }

        [Test]
        public async Task ChangePasswordWithResetCode_ExpiredToken_ReturnsNotFound()
        {
            // Arrange
            var resetToken = new PasswordResetTokenModel
            {
                expiration_time = DateTime.Now.AddHours(-25) // Expired token
            };

            _crudHandlerMock.Setup(mock => mock.ReadAsync<PasswordResetTokenModel>(It.IsAny<int>()))
                .ReturnsAsync(resetToken);

            // Act
            var result = await _controller.ChangePasswordWithResetCode(123, "password", "password");

            // Assert
            result.Should().BeOfType<NotFoundResult>();
        }

        [Test]
        public async Task ChangePasswordWithResetCode_PasswordsDoNotMatch_ReturnsBadRequest()
        {
            // Arrange
            var resetToken = new PasswordResetTokenModel
            {
                expiration_time = DateTime.Now.AddHours(1) // Valid token
            };

            _crudHandlerMock.Setup(mock => mock.ReadAsync<PasswordResetTokenModel>(It.IsAny<int>()))
                .ReturnsAsync(resetToken);

            // Act
            var result = await _controller.ChangePasswordWithResetCode(123, "password1", "password2");

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>()
                .Which.Value.Should().Be("New passwords do not match");
        }

        [Test]
        public async Task ChangePasswordWithResetCode_ValidRequest_ReturnsOk()
        {
            // Arrange
            var resetToken = new PasswordResetTokenModel
            {
                expiration_time = DateTime.Now.AddHours(1), // Valid token
                employee_id = 456
            };

            var employee = new EmployeeModel
            {
                employee_id = 456
            };

            _crudHandlerMock.Setup(mock => mock.ReadAsync<PasswordResetTokenModel>(It.IsAny<int>()))
                .ReturnsAsync(resetToken);
            _crudHandlerMock.Setup(mock => mock.ReadAsync<EmployeeModel>(It.IsAny<int>()))
                .ReturnsAsync(employee);
            _crudHandlerMock.Setup(mock => mock.UpdateAsync(It.IsAny<EmployeeModel>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.ChangePasswordWithResetCode(123, "password", "password");

            // Assert
            result.Should().BeOfType<OkResult>();
        }
    }