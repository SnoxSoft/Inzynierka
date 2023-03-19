using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using Pirsoft.Api.Models;
using System.Collections.Generic;
using FluentAssertions;
using System;

namespace Pirsoft.UnitTests.ModelCreators
{
    public class AccountTypeCreatorTests
    {
        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public void CreateModel_CreatesCorrectModel(EAccountType testData)
        {
            //Arrange
            AccountTypeCreator sut = new(testData);

            //Act
            IApiModel result = sut.CreateModel();

            //Assert
            result.Should().BeOfType<AccountTypeModel>();
        }

        public static IEnumerable<object[]> GetTestData()
        {
            foreach (EAccountType accountType in Enum.GetValues(typeof(EAccountType)))
            {
                yield return new object[] { accountType };
            }
        }
    }
}
