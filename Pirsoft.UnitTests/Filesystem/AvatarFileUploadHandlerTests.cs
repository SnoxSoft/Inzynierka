using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Filesystem;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Filesystem
{
    [TestFixture]
    public class AvatarFileUploadHandlerTests
    {
        private Mock<IAvatarFileValidator> _avatarFileValidatorMock = null!;

        private AvatarFileUploadHandler _sut = null!;

        [SetUp]
        public void SetUp()
        {
            var fakeInMemorySettings = new Dictionary<string, string>()
            {
                { "Resources:AvatarDirectory", "fake\\directory"}
            };

            IConfiguration fakeGlobalAppSettings = new ConfigurationBuilder()
                .AddInMemoryCollection(fakeInMemorySettings)
                .Build();

            _avatarFileValidatorMock = new Mock<IAvatarFileValidator>();

            _sut = new AvatarFileUploadHandler(_avatarFileValidatorMock.Object, fakeGlobalAppSettings);
        }

        [TestCase(".jpg")]
        [TestCase(".png")]
        public async Task Upload_ShouldUploadFile_WhenProvidedCorrectFile(string expectedFileExtension)
        {
            //Arrange
            string fakeFileName = $"fakeFileName{expectedFileExtension}";
            string fakeAvatarDirectory = "fake\\directory";
            
            Mock<IFormFile> formFileMock = new();
            formFileMock
                .Setup(m => m.FileName)
                .Returns(fakeFileName);

            Mock<IFormCollection> formCollectionMock = new();
            formCollectionMock
                .Setup(m => m.Files)
                .Returns(new FormFileCollection() { formFileMock.Object });

            _avatarFileValidatorMock
                .Setup(m => m.IsAvatarFileValid(It.IsAny<IFormFile>()))
                .Returns(true);

            //Act
            string result = await _sut.Upload(formCollectionMock.Object);

            //Assert
            result.Should().NotContainEquivalentOf(fakeFileName);
            result.Should().ContainEquivalentOf(fakeAvatarDirectory);
            result.Should().EndWithEquivalentOf(expectedFileExtension);
        }

        [Test]
        public async Task Upload_ShouldThrowArgumentException_WhenFormDataDoesNotContainAnyFiles()
        {
            //Arrange
            Mock<IFormCollection> formCollectionMock = new();
            formCollectionMock
                .Setup(m => m.Files)
                .Returns(new FormFileCollection());

            //Act
            Func<Task> act = () => _sut.Upload(formCollectionMock.Object);

            //Assert
            await act.Should().ThrowAsync<ArgumentException>().WithMessage("Request body form data does not contain any files.*");
        }

        [Test]
        public async Task Upload_ShouldThrowArgumentException_WhenFileIsNotValid()
        {
            //Arrange
            Mock<IFormCollection> formCollectionMock = new();
            formCollectionMock
                .Setup(m => m.Files)
                .Returns(new FormFileCollection() { Mock.Of<IFormFile>() });

            _avatarFileValidatorMock
                .Setup(m => m.IsAvatarFileValid(It.IsAny<IFormFile>()))
                .Returns(false);

            //Act
            Func<Task> act = () => _sut.Upload(formCollectionMock.Object);

            //Assert
            await act.Should().ThrowAsync<ArgumentException>().WithMessage("Passed file other than '.png' or '.jpg' or more than 2 MB in size.*");
        }
    }
}
