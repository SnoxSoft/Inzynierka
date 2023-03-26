using Microsoft.EntityFrameworkCore;
using Moq;
using Pirsoft.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Pirsoft.UnitTests.TestsResources.Mocks
{
    public class DbSetMocks
    {
        public static Mock<DbSet<TModel>> CreateMock<TModel>(IEnumerable<TModel> testData) where TModel : class, IApiModel
        {
            var mockSet = new Mock<DbSet<TModel>>();
            mockSet.As<IQueryable<TModel>>().Setup(m => m.Provider).Returns(testData.AsQueryable().Provider);
            mockSet.As<IQueryable<TModel>>().Setup(m => m.Expression).Returns(testData.AsQueryable().Expression);
            mockSet.As<IQueryable<TModel>>().Setup(m => m.ElementType).Returns(testData.AsQueryable().ElementType);
            mockSet.As<IQueryable<TModel>>().Setup(m => m.GetEnumerator()).Returns(() => testData.GetEnumerator());

            return mockSet;
        }

        public static DbSet<TModel> CreateObject<TModel>(IEnumerable<TModel> testData) where TModel : class, IApiModel
            => CreateMock(testData).Object;
    }
}
