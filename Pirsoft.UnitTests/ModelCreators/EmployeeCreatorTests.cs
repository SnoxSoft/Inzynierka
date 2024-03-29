﻿using System;
using FluentAssertions;
using NUnit.Framework;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;
using Pirsoft.Api.Models.ModelCreators;

namespace Pirsoft.UnitTests.ModelCreators
{
    public class EmployeeCreatorTests
    {
        [Test]
        public void CreateModel_CreatesCorrectModel()
        {
            //Arrange
            string fakeFirstName = "John";
            string fakeLastName = "Tester";
            string fakeEmail = "test@testmail.com";
            string fakePassword = "testPass";
            string fakePesel = "12345678901";
            string fakeBankAccountNumber = "12341234123412341234123412";
            string fakeAvatarFilePath = "fakeDirectory\\fakeFileName.jpg";
            int fakeDepartmentId = 1;
            int fakeLeaveBaseDays = 1;
            int fakeLeaveDemandDays = 1;
            int fakeSeniorityInMonths = 1;
            double fakeGrossSalary = 1d;
            bool fakeIsActive = true;
            bool fakeLeaveIsSeniorityThreshold = true;
            bool fakePasswordReset = true;
            string fakePasswordSalt = "testSalt";
            DateTime fakeEmploymentStartDate = DateTime.MinValue;
            DateTime fakeDateOfBirth = DateTime.MinValue;
            ECompanyRole fakeCompanyRole = ECompanyRole.Employee;
            EContractType fakeContractType = EContractType.Unassigned;
            ESeniorityLevel fakeSeniorityLevel = ESeniorityLevel.Other;

            EmployeeCreator sut = new (
                fakeFirstName, fakeLastName, fakeEmail, fakePassword, fakePesel, fakeBankAccountNumber, fakeAvatarFilePath,
                fakeDepartmentId, fakeLeaveBaseDays, fakeLeaveDemandDays, fakeSeniorityInMonths, fakeGrossSalary,
                fakeIsActive, fakeLeaveIsSeniorityThreshold, fakePasswordReset, fakePasswordSalt,
                fakeDateOfBirth, fakeEmploymentStartDate,
                fakeCompanyRole, fakeContractType, fakeSeniorityLevel);

            //Act
            IApiModel result = sut.CreateModel();

            //Assert
            result.Should().BeOfType<EmployeeModel>();
        }
    }
}
