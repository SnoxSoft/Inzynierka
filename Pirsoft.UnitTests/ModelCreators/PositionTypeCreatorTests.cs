using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;
using Pirsoft.Api.Models.ModelCreators;
using System;
using System.Collections.Generic;

namespace Pirsoft.UnitTests.ModelCreators
{
    public class PositionCreatorTests
    {
        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public void CreateModel_CreatesCorrectModel(EPositionType testData)
        {
            //Arrange
            PositionTypeCreator sut = new(testData);

            //Act
            IApiModel result = sut.CreateModel();

            //Assert
            result.Should().BeOfType<PositionTypeModel>();
        }

        public static IEnumerable<object[]> GetTestData()
        {
            foreach (EAccountType positionType in Enum.GetValues(typeof(EPositionType)))
            {
                yield return new object[] { positionType };
            }
        }
    }
}
