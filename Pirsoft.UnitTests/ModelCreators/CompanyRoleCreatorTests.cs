using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models.ModelCreators;
using Pirsoft.Api.Models;
using System.Collections.Generic;
using FluentAssertions;
using System;

namespace Pirsoft.UnitTests.ModelCreators
{
    public class CompanyRoleCreatorTests
    {
        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public void CreateModel_CreatesCorrectModel(ECompanyRole testData)
        {
            //Arrange
            CompanyRoleCreator sut = new(testData);

            //Act
            IApiModel result = sut.CreateModel();

            //Assert
            result.Should().BeOfType<CompanyRoleModel>();
        }

        public static IEnumerable<object[]> GetTestData()
        {
            foreach (ECompanyRole companyRole in Enum.GetValues(typeof(ECompanyRole)))
            {
                yield return new object[] { companyRole };
            }
        }
    }
}
