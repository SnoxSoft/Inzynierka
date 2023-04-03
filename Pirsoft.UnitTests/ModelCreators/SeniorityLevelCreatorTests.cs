using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;
using Pirsoft.Api.Models.ModelCreators;
using System;
using System.Collections.Generic;

namespace Pirsoft.UnitTests.ModelCreators
{
    public class SeniorityLevelCreatorTests
    {
        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public void CreateModel_CreatesCorrectModel(ESeniorityLevel testData)
        {
            //Arrange
            SeniorityLevelCreator sut = new(testData);

            //Act
            IApiModel result = sut.CreateModel();

            //Assert
            result.Should().BeOfType<SeniorityLevelModel>();
        }

        public static IEnumerable<object[]> GetTestData()
        {
            foreach (ESeniorityLevel seniorityLevel in Enum.GetValues(typeof(ESeniorityLevel)))
            {
                yield return new object[] { seniorityLevel };
            }
        }
    }
}
