using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Pirsoft.Api.DatabaseManagement.EntityBuilders;

namespace Pirsoft.UnitTests.DatabaseManagement.EntityBuilders
{
    public class SeniorityLevelEntityBuilderTests
    {
        private ModelBuilder _fakeModelBuilder = null!;

        [SetUp]
        public void SetUp() => _fakeModelBuilder = new();

        [Test]
        public void Build_ReturnsUpdatedModelBuilder()
        {
            //Arrange
            SeniorityLevelEntityBuilder sut = new(_fakeModelBuilder);

            //Act
            ModelBuilder result = sut.Build();

            //Assert
            result.Should().BeEquivalentTo(_fakeModelBuilder);
        }

        [Test]
        public void GetEntityPrimaryKey_ReturnsCorrectPrimaryKey()
        {
            //Arrange
            string expectedPrimaryKeyName = "seniority_level_id";
            SeniorityLevelEntityBuilder sut = new(_fakeModelBuilder);

            //Act
            string result = sut.GetEntityPrimaryKey(sut.Build());

            //Assert
            result.Should().Be(expectedPrimaryKeyName);
        }
    }
}
