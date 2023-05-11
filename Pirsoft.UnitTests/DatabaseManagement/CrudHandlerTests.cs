using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;
using Pirsoft.UnitTests.TestsResources.Mocks;

namespace Pirsoft.UnitTests.DatabaseManagement
{
    public class CrudHandlerTests
    {
        private Mock<DatabaseContext> _databaseContextMock = null!;

        private CrudHandler _sut = null!;

        [SetUp]
        public void SetUp()
        {
            _databaseContextMock = new Mock<DatabaseContext>();
            _sut = new CrudHandler(_databaseContextMock.Object);
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Create_InvokesSuccessfully<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            IEnumerable<TModel> testData = prepareTestData(testEntity);
            Mock<DbSet<TModel>> mockSet = DbSetMocks.CreateMock(testData);

            _databaseContextMock
                .Setup(m => m.Set<TModel>())
                .Returns(mockSet.Object);

            //Act
            await _sut.CreateAsync(testEntity);

            //Assert
            mockSet.Verify(m => m.Add(It.IsAny<TModel>()), Times.Once);
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Create_ShouldThrowException_WhenEntityIdDifferentThan0<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            testEntity.ApiInternalId = 1;

            //Act
            Func<Task> act = async () => await _sut.CreateAsync(testEntity);

            //Assert
            await act.Should().ThrowAsync<ArgumentException>()
                .WithMessage($"Passed model object with '{nameof(testEntity.ApiInternalId)}' property set, use {nameof(CrudHandler)}.{nameof(CrudHandler.UpdateAsync)} instead.");
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Read_InvokesSuccessfully<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            IEnumerable<TModel> testData = prepareTestData(testEntity);

            Mock<DbSet<TModel>> mockSet = DbSetMocks.CreateMock(testData);
            mockSet
                .Setup(m => m.Find(It.IsAny<int>()))
                .Returns(testEntity);

            _databaseContextMock
                .Setup(m => m.Set<TModel>())
                .Returns(mockSet.Object);

            //Act
            TModel? result = await _sut.ReadAsync<TModel>(0);

            //Assert
            result.Should().BeEquivalentTo(testEntity);
            mockSet.Verify(m => m.Find(It.IsAny<int>()), Times.Once);
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Read_ReturnsNull_WhenEntityNotFound<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            IEnumerable<TModel> testData = prepareTestData(testEntity);

            Mock<DbSet<TModel>> mockSet = DbSetMocks.CreateMock(testData);
            mockSet
                .Setup(m => m.Find(It.IsAny<int>()))
                .Returns((TModel?)null);

            _databaseContextMock
                .Setup(m => m.Set<TModel>())
                .Returns(mockSet.Object);

            //Act
            TModel? result = await _sut.ReadAsync<TModel>(0);

            //Assert
            mockSet.Verify(m => m.Find(It.IsAny<int>()), Times.Once);
            result.Should().BeNull();
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task ReadAll_InvokesSuccessfully<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            IEnumerable<TModel> testData = prepareTestData(testEntity);
            Mock<DbSet<TModel>> mockSet = DbSetMocks.CreateMock(testData);

            _databaseContextMock
                .Setup(m => m.Set<TModel>())
                .Returns(mockSet.Object);

            //Act
            IEnumerable<TModel> result = await _sut.ReadAllAsync<TModel>();

            //Assert
            result.Should().BeEquivalentTo(testData);
            _databaseContextMock.Verify(m => m.Set<TModel>(), Times.Once);
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Update_InvokesSuccessfully<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            testEntity.ApiInternalId = 1;
            IEnumerable<TModel> testData = prepareTestData(testEntity);
            Mock<DbSet<TModel>> mockSet = DbSetMocks.CreateMock(testData);

            _databaseContextMock
                .Setup(m => m.Set<TModel>())
                .Returns(mockSet.Object);

            //Act
            await _sut.UpdateAsync(testEntity);

            //Assert
            mockSet.Verify(m => m.Update(It.IsAny<TModel>()), Times.Once);
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Update_ShouldThrowException_WhenEntityIdDifferentThan0<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            testEntity.ApiInternalId = 0;

            //Act
            Func<Task> act = async () => await _sut.UpdateAsync(testEntity);

            //Assert
            await act.Should().ThrowAsync<ArgumentException>()
                .WithMessage($"Passed model object with '{nameof(testEntity.ApiInternalId)}' property value less than 1*");
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task Delete_InvokesSuccessfully<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            testEntity.ApiInternalId = 1;
            IEnumerable<TModel> testData = prepareTestData(testEntity);
            Mock<DbSet<TModel>> mockSet = DbSetMocks.CreateMock(testData);

            _databaseContextMock
                .Setup(m => m.Set<TModel>())
                .Returns(mockSet.Object);

            //Act
            await _sut.DeleteAsync(testEntity);

            //Assert
            mockSet.Verify(m => m.Remove(It.IsAny<TModel>()), Times.Once);
        }

        [Test]
        [TestCaseSource(nameof(GetTestData))]
        public async Task DeleteAsync_ShouldThrowException_WhenEntityIdDifferentThan0<TModel>(TModel testEntity) where TModel : class, IApiModel
        {
            //Arrange
            testEntity.ApiInternalId = 0;

            //Act
            Func<Task> act = async () => await _sut.DeleteAsync(testEntity);

            //Assert
            await act.Should().ThrowAsync<ArgumentException>()
                .WithMessage($"Passed model object with '{nameof(testEntity.ApiInternalId)}' property value less than 1*");
        }

        [Test]
        public void PushChangesToDatabase_InvokesSuccessfully()
        {
            //Arrange
            int expectedResult = 1;

            _databaseContextMock
                .Setup(m => m.SaveChanges(It.Is<bool>(val => val.Equals(true))))
                .Returns(expectedResult);

            //Act
            int result = _sut.PushChangesToDatabase();

            //Assert
            _databaseContextMock.Verify(m => m.SaveChanges(It.Is<bool>(val => val.Equals(true))), Times.Once);
            result.Should().Be(expectedResult);
        }

        private IEnumerable<TModel> prepareTestData<TModel>(TModel entity) where TModel : class, IApiModel
        {
            yield return entity;
        }

        public static IEnumerable<object[]> GetTestData()
        {
            yield return new object[] { new CompanyRoleModel() };
            yield return new object[] { new SeniorityLevelModel() };
            yield return new object[] { new EmployeeModel() };
        }
    }
}
