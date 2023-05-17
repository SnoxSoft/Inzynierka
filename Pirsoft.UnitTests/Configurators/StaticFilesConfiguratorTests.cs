using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Configurators;

namespace Pirsoft.UnitTests.Configurators
{
    [TestFixture]
    public class StaticFilesConfiguratorTests : BaseForConfiguratorTests<StaticFilesConfigurator>
    {
        [Test]
        public void Init_ShouldConfigureStaticFiles()
        {
            //Arrange
            Mock<IApplicationBuilder> appBuilderMock = new();

            var fakeInMemorySettings = new Dictionary<string, string>()
            {
                { "Resources:AvatarDirectory", "fake\\directory" }
            };

            IConfiguration fakeGlobalAppSettings = new ConfigurationBuilder()
                .AddInMemoryCollection(fakeInMemorySettings)
                .Build();

            //Act
            sut.Init(appBuilderMock.Object, fakeGlobalAppSettings);

            //Assert
            appBuilderMock
                .Verify(m => m.Use(It.IsAny<Func<RequestDelegate, RequestDelegate>>()), Times.Once);
        }
    }
}
