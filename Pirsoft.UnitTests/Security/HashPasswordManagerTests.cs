﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Models;
using Pirsoft.Api.Security.Interfaces;
using Pirsoft.Api.Security.Managers;
using Pirsoft.Api.Security.Models;
using Pirsoft.Api.Security.Services;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Security
{
    public class HashPasswordManagerTests
    {
        private IHashPasswordManager _sut = null!;

        [SetUp]
        public void SetUp()
        {
            _sut = new HashPasswordManager();
        }

        [Test]
        public void GenerateSaltShouldReturnValidSalt()
        {
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
            //Arrange
            string password = "Kadry123@konto";
            string salt = "salt";

            //Act
            string hashedPassword = _sut.HashPassword(password, salt);

            //Assert
            Assert.NotNull(hashedPassword);
            Assert.IsNotEmpty(hashedPassword);
        }
    }
}
