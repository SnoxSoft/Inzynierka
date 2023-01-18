using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Validators;

public class EmployeeModelValidatorTests
{
    private EmployeeModelValidator _sut = null!;
    
    [SetUp]
    public void SetUp() =>_sut = new EmployeeModelValidator();

    [Test]
    public void PeselIsValidWithElevenNumbers() => _sut.IsPeselValid("12345678901").Should().BeTrue();

    [Test]
    public void PeselIsInvalidWithoutElevenCharacters() => _sut.IsPeselValid("123456789").Should().BeFalse();

    [Test]
    public void PeselIsInvalidWithDifferentCharactersThanNumbers() =>
        _sut.IsPeselValid("123abc456de").Should().BeFalse();
}