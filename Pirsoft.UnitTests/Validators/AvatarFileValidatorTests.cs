using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Validators
{
    [TestFixture]
    public class AvatarFileValidatorTests
    {
        private AvatarFileValidator _sut = null!;

        [SetUp]
        public void SetUp() => _sut = new AvatarFileValidator();

        [TestCase("test.jpg", 125)]
        [TestCase("test.png", 2097152)]
        public void IsAvatarFileValid_ShouldReturnTrue_WhenProvidedAcceptedFile(string testFileName, long testFileSizeInBytes)
        {
            //Arrange
            Mock<IFormFile> avatarFileMock = new();
            avatarFileMock
                .Setup(f => f.FileName)
                .Returns(testFileName);
            avatarFileMock
                .Setup(f => f.Length)
                .Returns(testFileSizeInBytes);

            //Act
            bool result = _sut.IsAvatarFileValid(avatarFileMock.Object);

            //Assert
            result.Should().BeTrue();
        }

        [TestCase("test.gif", 124)]
        [TestCase("test.txt", 2097153)]
        [TestCase("", -1)]
        public void IsAvatarFileValid_ShouldReturnFalse_WhenProvidedInvalidFile(string testFileName, long testFileSizeInBytes)
        {
            //Arrange
            Mock<IFormFile> avatarFileMock = new();
            avatarFileMock
                .Setup(f => f.FileName)
                .Returns(testFileName);
            avatarFileMock
                .Setup(f => f.Length)
                .Returns(testFileSizeInBytes);

            //Act
            bool result = _sut.IsAvatarFileValid(avatarFileMock.Object);

            //Assert
            result.Should().BeFalse();
        }
    }
}
