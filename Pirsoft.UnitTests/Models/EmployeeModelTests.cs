// using FluentAssertions;
// using NUnit.Framework;
// using Pirsoft.Api.Models;
// using System;
//
// namespace Pirsoft.UnitTests.Models
// {
//     internal class EmployeeModelTests
//     {
//         private Employee? _sut;
//         private readonly string _validPesel = "11122233344";
//         private readonly string _invalidPeselCharacters = "111G2C3#3!4";
//         private readonly string _invalidPeselLength = "111222333445";
//         private readonly string _validBankAccountNumber = "12345678901234567890123456";
//         private readonly string _invalidBankAccountNumberCharacters = "1234A67B9C12D4E6#8@0!23456";
//         private readonly string _invalidBankAccountNumberLength = "123456789012345678901234567";
//         private readonly string _validEmail = "test@mail.com";
//         private readonly string _invalidEmail = "testmail.com";
//         private readonly DateTime _employmentStartDate = new DateTime(2020, 1, 1);
//
//         [SetUp]
//         public void SetUp() => _sut = new();
//
//         [TearDown]
//         public void TearDown() => _sut = null;
//         
//         [Test]
//         public void ValidatePesel_IsReturningInputBack_ForValidFormat()
//         {
//             _sut.Pesel = _validPesel;
//             _sut.Pesel.Should().Be(_validPesel);
//         }
//
//         [Test]
//         public void ValidatePesel_IsThrowingException_ForInvalidCharacters()
//         {
//             _sut.Invoking(x => x.Pesel = _invalidPeselCharacters)
//                 .Should().Throw<Exception>()
//                 .WithMessage("Pesel powinien składać się z 11 cyfr");
//         }
//
//         [Test]
//         public void ValidatePesel_IsThrowingException_ForInvalidLength()
//         {
//             _sut.Invoking(x => x.Pesel = _invalidPeselLength)
//                 .Should().Throw<Exception>()
//                 .WithMessage("Pesel powinien składać się z 11 cyfr");
//         }
//
//         [Test]
//         public void BankAccountNumber_IsReturningInputBack_ForValidFormat()
//         {
//             _sut.BankAccountNumber = _validBankAccountNumber;
//             _sut.BankAccountNumber.Should().Be(_validBankAccountNumber);
//         }
//
//         [Test]
//         public void BankAccountNumber_IsThrowingException_ForInvalidCharacters()
//         {
//             _sut.Invoking(x => x.BankAccountNumber = _invalidBankAccountNumberCharacters)
//                 .Should().Throw<Exception>()
//                 .WithMessage("Konto bankowe powinno składać się z 26 cyfr");
//         }
//
//         [Test]
//         public void BankAccountNumber_IsThrowingException_ForInvalidLength()
//         {
//             _sut.Invoking(x => x.BankAccountNumber = _invalidBankAccountNumberLength)
//                 .Should().Throw<Exception>()
//                 .WithMessage("Konto bankowe powinno składać się z 26 cyfr");
//         }
//
//         [Test]
//         public void Email_IsReturningInputBack_ForValidFormat()
//         {
//             _sut.Email = _validEmail;
//             _sut.Email.Should().Be(_validEmail);
//         }
//
//         [Test]
//         public void Email_IsThrowingException_ForInvalidCharacters()
//         {
//             _sut.Invoking(x => x.Email = _invalidEmail)
//                 .Should().Throw<Exception>()
//                 .WithMessage("Email powinien zawierać @");
//         }
//         
//     }
// }
