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
    public void PeselIsValidWithElevenNumbers() => EmployeeModelValidator.IsPeselValid("12345678901").Should().BeTrue();

    [Test]
    public void PeselIsInvalidWithoutElevenCharacters() => EmployeeModelValidator.IsPeselValid("123456789").Should().BeFalse();

    [Test]
    public void PeselIsInvalidWithDifferentCharactersThanNumbers() =>
        EmployeeModelValidator.IsPeselValid("123abc456de").Should().BeFalse();
    
    [Test]
    public void BankAccountIsValidWithTwentySixNumbers() => EmployeeModelValidator.IsBankAccountNumberValid("12345678901123456789012345").Should().BeTrue();
    
    [Test]
    public void BankAccountIsInvalidWithoutTwentySixCharacters() => EmployeeModelValidator.IsBankAccountNumberValid("123123123").Should().BeFalse();

    [Test]
    public void BankAccountIsInvalidWithDifferentCharactersThanNumbers() => EmployeeModelValidator
        .IsBankAccountNumberValid("123A567B901D234C67G90X23T5").Should().BeFalse();

    [Test]
    public void EmailAddressIsValidWithCorrectSyntax() =>
        EmployeeModelValidator.IsEmailAddressValid("pjatk@edu.pl").Should().BeTrue();

    [Test]
    public void EmailAdressIsInvalidWithPlainText() =>
        EmployeeModelValidator.IsEmailAddressValid("pjatkedupl").Should().BeFalse();
}