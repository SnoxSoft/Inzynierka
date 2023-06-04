using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Models;
using Pirsoft.Api.Security.Services;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Security
{
    internal class AuthenticationServiceTests
    {
        private AuthenticationService _sut = null!;

        [SetUp]
        public void SetUp()
        {
            var userManagerMock = new Mock<IUserManager<EmployeeModel>>();
            var jwtSettingsMock = new Mock<IOptions<JSONWebTokensSettings>>();
            var employeeModelValidatorMock = new Mock<IEmployeeModelValidator>();

            _sut = new AuthenticationService(userManagerMock.Object, jwtSettingsMock.Object,
                employeeModelValidatorMock.Object);
        }

        [Test]
        public void GenerateSaltShouldReturnValidSalt()
        {
            //Arrange

            //Act
            string salt = _sut.GenerateSalt();

            //Assert
            Assert.NotNull(salt);
            Assert.IsNotEmpty(salt);
            Assert.AreEqual(44, salt.Length);
        }

        [Test]
        public void HashPasswordShouldReturnNotEmptyHash()
        {
            //arrange
            string password = "password";
            string salt = "salt";

            //Act
            string hashedPassword = _sut.HashPassword(password, salt);

            //assert
            Assert.NotNull(hashedPassword);
            Assert.IsNotEmpty(hashedPassword);
        }
    }
}
