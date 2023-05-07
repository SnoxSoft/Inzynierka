using System.IO;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Configurators.OptionsProviders;

namespace Pirsoft.UnitTests.Configurators.OptionsProviders
{
    public class StaticFilesOptionsProviderTests
    {
        private StaticFilesOptionsProvider _sut = null!;

        [SetUp]
        public void SetUp()
        {
            _sut = StaticFilesOptionsProvider.Instance;
        }

        [Test]
        public void Instance_ReturnsConfiguratorAsSingletonInstance()
        {
            //Arrange
            StaticFilesOptionsProvider expectedInstance = StaticFilesOptionsProvider.Instance;

            //Act
            StaticFilesOptionsProvider result = _sut;

            //Assert
            result.Should().BeSameAs(expectedInstance);
        }

        [Test]
        public void Options_ShouldReturnCorrectOptionsObject()
        {
            //Arrange
            string expectedDirectoryName = "AvatarImages";

            StaticFileOptions expectedOptions = new()
            {
                FileProvider = Mock.Of<IFileProvider>(),
                RequestPath = $"/{expectedDirectoryName}",
            }; 

            //Act
            StaticFileOptions result = _sut.Options;

            //Assert
            result.Should().BeEquivalentTo(expectedOptions);
        }
    }
}
