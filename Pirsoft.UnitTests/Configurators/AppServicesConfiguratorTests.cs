using System.Linq;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Pirsoft.Api.Configurators;

namespace Pirsoft.UnitTests.Configurators
{
    public class AppServicesConfiguratorTests
    {
        private AppServicesConfigurator _sut = null!;

        [SetUp]
        public void SetUp() => _sut = AppServicesConfigurator.Instance;

        [Test]
        public void Instance_ReturnsConfiguratorAsSingletonInstance()
        {
            //Arrange
            AppServicesConfigurator expectedInstance = AppServicesConfigurator.Instance;

            //Act
            AppServicesConfigurator result = _sut;

            //Assert
            result.Should().BeSameAs(expectedInstance);
        }

        [Test]
        public void Init_ShouldRegisterNecessarryServices()
        {
            //Arrange
            WebApplicationBuilder fakeBuilder = WebApplication.CreateBuilder();
            ServiceDescriptor[] fakeInitialServices = fakeBuilder.Services.ToArray();

            //Act
            _sut.Init(fakeBuilder);
            ServiceDescriptor[] result = fakeBuilder.Services.ToArray();

            //Assert
            result.Length.Should().BeGreaterThan(fakeInitialServices.Length);
        }
    }
}
