using System;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Pirsoft.Api.Controllers;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;

namespace Pirsoft.UnitTests.ControllerMockTests;

public class AbsenceControllerTest
{
    private Mock<ICrudHandler> _crudHandlerMock = null!;

    private AbsenceController _sut = null!;

    [SetUp]
    public void SetUp()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _sut = new AbsenceController(_crudHandlerMock.Object);
    }

    [Test]
    public async Task UpdateAbsence_ShouldReturnNotFoundResult_WhenAbsenceDoesNotExist()
    {
        // Arrange
        int fakeAbsenceId = 1,
            fakeAbsenceApproverId = 1,
            fakeToUpdateAbsenceStatusId = 3;

        _crudHandlerMock
            .Setup(m => m.ReadAsync<AbsenceModel>(fakeAbsenceId))
            .ReturnsAsync((AbsenceModel)null!);

        // Act
        IActionResult result = await _sut.UpdateAbsence(fakeAbsenceId, fakeAbsenceApproverId, fakeToUpdateAbsenceStatusId, null);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }

    [Test]
    public async Task UpdateAbsence_ShouldReturnOkResult_WhenProvidedValidInformation()
    {
        // Arrange
        int fakeAbsenceId = 1,
            fakeAbsenceTypeId = 1,
            fakeAbsenceStatusId = 1,
            fakeAbsenceOwnerId = 1,
            fakeAbsenceApproverId = 1,
            fakeToUpdateAbsenceStatusId = 3;

        AbsenceModel fakeExistingAbsence = new()
        {
            absence_start_date = DateTime.Now.AddDays(1), 
            absence_end_date = DateTime.Now.AddDays(1),
            absence_status_id = fakeAbsenceStatusId,
            absence_type_id = fakeAbsenceTypeId,
            employee_owner_id = fakeAbsenceOwnerId,
            employee_approver_id = fakeAbsenceApproverId,
        };

        AbsenceTypeModel fakeAbsenceType = new()
        {
            absence_type_id = fakeAbsenceTypeId,
        };

        IQueryable<AbsenceTypeModel> fakeQueryResult = new AbsenceTypeModel[]
        {
            fakeAbsenceType,
        }.AsQueryable();

        _crudHandlerMock
            .Setup(m => m.ReadAsync<AbsenceModel>(fakeAbsenceId))
            .ReturnsAsync(fakeExistingAbsence);
        _crudHandlerMock
            .Setup(m => m.ReadAllAsync<AbsenceTypeModel>())
            .ReturnsAsync(fakeQueryResult);

        // Act
        IActionResult result = await _sut.UpdateAbsence(fakeAbsenceId, fakeAbsenceApproverId, fakeToUpdateAbsenceStatusId, null);

        // Assert
        _crudHandlerMock
            .Verify(x => x.UpdateAsync(fakeExistingAbsence), Times.Once);
        result.Should().BeOfType<OkResult>();
    }
    
    [Test]
    public async Task DeleteAbsenceById_ShouldReturnNotFoundResult_WhenAbsenceDoesNotExist()
    {
        // Arrange
        var absenceId = 1;
        
        // Act
        var response = await _sut.DeleteAbsenceById(absenceId);

        // Assert
        response.Should().BeOfType<NotFoundResult>();
    }

    [Test]
    public async Task DeleteAbsenceById_ShouldReturnOkResult_WhenDeletingExistingAbsence()
    {
        // Arrange
        int fakeAbsenceId = 1,
            fakeAbsenceTypeId = 1,
            fakeAbsenceStatusId = 1,
            fakeAbsenceOwnerId = 1,
            fakeAbsenceApproverId = 1,
            fakeAbsenceDuration = 1;

        AbsenceModel fakeExistingAbsence = new()
        {
            absence_id = fakeAbsenceId,
            absence_start_date = DateTime.Now.AddDays(1),
            absence_end_date = DateTime.Now.AddDays(1),
            absence_status_id = fakeAbsenceStatusId,
            absence_type_id = fakeAbsenceTypeId,
            employee_owner_id = fakeAbsenceOwnerId,
            employee_approver_id = fakeAbsenceApproverId,
            duration = fakeAbsenceDuration,
        };

        AbsenceTypeModel fakeAbsenceType = new()
        {
            absence_type_id = fakeAbsenceTypeId,
        };

        IQueryable<AbsenceTypeModel> fakeQueryResult = new AbsenceTypeModel[]
        {
            fakeAbsenceType,
        }.AsQueryable();

        _crudHandlerMock
            .Setup(m => m.ReadAsync<AbsenceModel>(fakeAbsenceId))
            .ReturnsAsync(fakeExistingAbsence);
        _crudHandlerMock
            .Setup(m => m.ReadAllAsync<AbsenceTypeModel>())
            .ReturnsAsync(fakeQueryResult);

        // Act
        IActionResult response = await _sut.DeleteAbsenceById(fakeAbsenceId);

        // Assert
        _crudHandlerMock
            .Verify(m => m.DeleteAsync(It.IsAny<AbsenceModel>()), Times.Once);

        response.Should().BeOfType<OkResult>();
    }
}