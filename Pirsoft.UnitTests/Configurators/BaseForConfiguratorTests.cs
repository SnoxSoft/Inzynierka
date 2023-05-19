using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.PatternsAbstraction;

namespace Pirsoft.UnitTests.Configurators
{
    [TestFixture]
    public abstract class BaseForConfiguratorTests<TConfigurator> where TConfigurator : SingletonBase<TConfigurator>, new()
    {
        protected TConfigurator sut = default!;

        [SetUp]
        public void SetUp()
        {
            sut = SingletonBase<TConfigurator>.Instance;
        }

        [Test]
        public void Instance_ReturnsTheSameInstance()
        {
            //Arrange
            TConfigurator expectedInstance = SingletonBase<TConfigurator>.Instance;

            //Act
            TConfigurator result = sut;

            //Assert
            result.Should().BeSameAs(expectedInstance);
        }
    }
}
