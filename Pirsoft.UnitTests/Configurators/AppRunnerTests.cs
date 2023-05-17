using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using NUnit.Framework;
using Pirsoft.Api.Configurators;

namespace Pirsoft.UnitTests.Configurators
{
    [TestFixture]
    public class AppRunnerTests : BaseForConfiguratorTests<AppRunner>
    {
        [Test]
        public void Init_ShouldConfigureApplicationBuilderToRun()
        {
            //Arrange
            WebApplicationBuilder fakeBuilder = WebApplication.CreateBuilder();
            AppServicesConfigurator.Instance.Init(fakeBuilder);

            //Act
            sut.Init(fakeBuilder);
            bool result = sut.CanRun;

            //Assert
            result.Should().BeTrue();
        }
    }
}
