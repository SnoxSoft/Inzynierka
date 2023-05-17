using System;
using System.Linq;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Configurators;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Filesystem;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Configurators
{
    [TestFixture]
    public class DependencyConfiguratorTests : BaseForConfiguratorTests<DependencyConfigurator>
    {
        private static readonly Type[] _expectedServiceInterfaces = new Type[]
        {
            typeof(IAvatarFileUploadHandler),
            typeof(IAvatarFileValidator),
            typeof(ICrudHandler),
            typeof(IDatabaseModelBuilder),
            typeof(IEmployeeCrudHandler),
            typeof(IEmployeeModelValidator),
        };

        [TestCaseSource(nameof(typesSource))]
        public void Init_SuccessfullyRegistersServicesAsDependencies(Type expectedType)
        {
            //Arrange
            Mock<IServiceCollection> serviceCollectionMock = new();

            //Act
            sut.Init(serviceCollectionMock.Object);

            //Assert
            serviceCollectionMock
                .Verify(mock => mock.Add(
                    It.Is<ServiceDescriptor>(descriptor => descriptor.ServiceType.Equals(expectedType))));
        }

        [Test]
        public void Init_SuccessfullyRegistersExpectedServices()
        {
            //Arrange
            IServiceCollection fakeServices = new ServiceCollection();

            //Act
            sut.Init(fakeServices);

            //Assert
            fakeServices
                .Select(serviceDescriptor => serviceDescriptor.ServiceType).ToArray()
                .Should().BeEquivalentTo(_expectedServiceInterfaces);
        }

        private static object[] typesSource()
        {
            object[] types = new object[_expectedServiceInterfaces.Length];

            for (int i = 0; i < _expectedServiceInterfaces.Length; i++)
            {
                types[i] = _expectedServiceInterfaces[i];
            }

            return types;
        }
    }
}
