using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Validators;

namespace Pirsoft.UnitTests.Validators;

public class EmployeeModelValidatorTests
{
    private EmployeeModelValidator _sut = null!;
    
    [SetUp]
    public void SetUp() => _sut = new EmployeeModelValidator();

    [Test]
    public void PeselIsValidWithElevenNumbers() => _sut.IsPeselValid("12345678901").Should().BeTrue();

    [Test]
    public void PeselIsInvalidWithoutElevenCharacters() => _sut.IsPeselValid("123456789").Should().BeFalse();

    [Test]
    public void PeselIsInvalidWithDifferentCharactersThanNumbers() =>
        _sut.IsPeselValid("123abc456de").Should().BeFalse();
    
    [Test]
    public void BankAccountIsValidWithTwentySixNumbers() => _sut.IsBankAccountNumberValid("12345678901123456789012345").Should().BeTrue();
    
    [Test]
    public void BankAccountIsInvalidWithoutTwentySixCharacters() => _sut.IsBankAccountNumberValid("123123123").Should().BeFalse();

    [Test]
    public void BankAccountIsInvalidWithDifferentCharactersThanNumbers() => _sut
        .IsBankAccountNumberValid("123A567B901D234C67G90X23T5").Should().BeFalse();

    [Test]
    public void EmailAddressIsValidWithCorrectSyntax() =>
        _sut.IsEmailAddressValid("pjatk@edu.pl").Should().BeTrue();

    [Test]
    public void EmailAdressIsInvalidWithPlainText() =>
        _sut.IsEmailAddressValid("pjatkedupl").Should().BeFalse();

    [Test]
    public void PasswordIsValidWithOneOrMoreCapitalLowercaseLetterSpecialCharacterNumber() =>
        _sut.IsPasswordValid("TestoweHaslo1@").Should().BeTrue();

    [Test]
    public void PasswordIsInvalidWithoutCapitalLetter() =>
        _sut.IsPasswordValid("estoweaslo#1").Should().BeFalse();

    [Test]
    public void PasswordIsInvalidWithoutLowercaseLetter() =>
        _sut.IsPasswordValid("MAGICZNEHASLO$1").Should().BeFalse();

    [Test]
    public void PasswordIsInvalidWithoutSpecialCharacter() =>
        _sut.IsPasswordValid("SuperHaslo4").Should().BeFalse();

    [Test]
    public void PasswordIsInvalidWithoutNumber() =>
        _sut.IsPasswordValid("SuperHaslo$").Should().BeFalse();

    [Test]
    public void PasswordIsInvalidWhenIsShorterThan14Characters() =>
        _sut.IsPasswordValid("gD2#").Should().BeFalse();
}