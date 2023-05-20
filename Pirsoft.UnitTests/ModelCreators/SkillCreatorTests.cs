using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using Pirsoft.Api.Models;
using System.Collections.Generic;
using FluentAssertions;
using System;

namespace Pirsoft.UnitTests.ModelCreators
{
    public class SkillCreatorTests
    {
        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public void CreateModel_CreatesCorrectModel(ESkill testData)
        {
            //Arrange
            SkillCreator sut = new(testData);

            //Act
            IApiModel result = sut.CreateModel();

            //Assert
            result.Should().BeOfType<SkillModel>();
        }

        public static IEnumerable<object[]> GetTestData()
        {
            foreach (ESkill skill in Enum.GetValues(typeof(ESkill)))
            {
                yield return new object[] { skill };
            }
        }
    }
}
