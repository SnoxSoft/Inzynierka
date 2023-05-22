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
    private AbsenceController _absenceController = null!;

    [SetUp]
    public void SetUp()
    {
        _crudHandlerMock = new Mock<ICrudHandler>();
        _absenceController = new AbsenceController(_crudHandlerMock.Object);
    }
    
    [Test]
    public async Task UpdateAbsence_WithValidData_ShouldReturnOk()
    {
        // Arrange
        var absenceId = 1;
        var existingAbsence = new AbsenceModel
        {
            absence_start_date = new DateTime(2023,05,05), 
            absence_end_date = new DateTime(2023,05,05),
            absence_status_id = 1,
            employee_owner_id = 1,
            employee_approver_id = 1
        };
        _crudHandlerMock.Setup(x => x.ReadAsync<AbsenceModel>(absenceId)).ReturnsAsync(existingAbsence);

        // Act
        var result = await _absenceController.UpdateAbsence(absenceId, 1, 3, null);

        // Assert
        result.Should().BeOfType<OkResult>();
        _crudHandlerMock.Verify(x => x.UpdateAsync(existingAbsence), Times.Once);
    }

    [Test]
    public async Task DeleteAbsenceById_WhenAbsenceExist_ShouldReturnOk()
    {
        // Arrange
        var absenceId = 1;
        var absence = new AbsenceModel() { ApiInternalId = absenceId };
        _crudHandlerMock.Setup(x => x.ReadAsync<AbsenceModel>(absenceId)).ReturnsAsync(absence);

        // Act
        var response = await _absenceController.DeleteAbsenceById(absenceId);

        // Assert
        response.Should().BeOfType<OkResult>();
    }
    
    [Test]
    public async Task UpdateAbsence_WithNonExistingAbsence_ShouldReturnNotFound()
    {
        // Arrange
        var id = 1;
        
        _crudHandlerMock.Setup(x => x.ReadAsync<AbsenceModel>(id)).ReturnsAsync((AbsenceModel)null);

        // Act
        var result = await _absenceController.UpdateAbsence(id, 1, 3, null);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
    
    [Test]
    public async Task DeleteAbsenceById_WhenAbsenceDoesNotExist_ShouldReturnNotFound()
    {
        // Arrange
        var absenceId = 1;
        
        // Act
        var response = await _absenceController.DeleteAbsenceById(absenceId);

        // Assert
        response.Should().BeOfType<NotFoundResult>();
    }
}