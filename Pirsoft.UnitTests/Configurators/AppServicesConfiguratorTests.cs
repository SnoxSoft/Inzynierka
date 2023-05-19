using System.Linq;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Pirsoft.Api.Configurators;

namespace Pirsoft.UnitTests.Configurators
{
    [TestFixture]
    public class AppServicesConfiguratorTests : BaseForConfiguratorTests<AppServicesConfigurator>
    {
        [Test]
        public void Init_ShouldRegisterNecessarryServices()
        {
            //Arrange
            WebApplicationBuilder fakeBuilder = WebApplication.CreateBuilder();
            ServiceDescriptor[] fakeInitialServices = fakeBuilder.Services.ToArray();

            //Act
            sut.Init(fakeBuilder);
            ServiceDescriptor[] result = fakeBuilder.Services.ToArray();

            //Assert
            result.Length.Should().BeGreaterThan(fakeInitialServices.Length);
        }
    }
}
