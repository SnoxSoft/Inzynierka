using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using NUnit.Framework;
using Pirsoft.Api.Configurators;

namespace Pirsoft.UnitTests.Configurators
{
    public class AppRunnerTests
    {
        private AppRunner _sut = null!;

        [SetUp]
        public void SetUp() => _sut = AppRunner.Instance;

        [Test]
        public void Instance_ReturnsConfiguratorAsSingletonInstance()
        {
            //Arrange
            AppRunner expectedInstance = AppRunner.Instance;

            //Act
            AppRunner result = _sut;

            //Assert
            result.Should().BeSameAs(expectedInstance);
        }

        [Test]
        public void Init_ShouldConfigureApplicationBuilderToRun()
        {
            //Arrange
            WebApplicationBuilder fakeBuilder = WebApplication.CreateBuilder();
            AppServicesConfigurator.Instance.Init(fakeBuilder);

            //Act
            _sut.Init(fakeBuilder);
            bool result = _sut.CanRun;

            //Assert
            result.Should().BeTrue();
        }
    }
}
