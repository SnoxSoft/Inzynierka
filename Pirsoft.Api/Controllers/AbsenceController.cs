using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;
using Pirsoft.Api.Models.ModelCreators;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class AbsenceController : ControllerBase
{
    private readonly ICrudHandler _crudHandler;
    
    public AbsenceController(ICrudHandler crudHandler) => _crudHandler = crudHandler;
    
    [HttpGet("get/absence/statuses")]
    public async Task<IEnumerable<AbsenceStatusModel>> GetListOfAllAbsenceStatuses()
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceStatusModel>();
        return await query.OrderBy(absenceStatus => absenceStatus.absence_status_id).ToListAsync();
    }
    
    [HttpGet("get/absence/types")]
    public async Task<IEnumerable<AbsenceTypeModel>> GetListOfAllAbsenceTypes()
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceTypeModel>();
        return await query.OrderBy(absenceType => absenceType.absence_type_id).ToListAsync();
    }
    
    [HttpPost("create/new/absence")]
    public async Task CreateNewAbsence(DateTime absenceStartDate, DateTime absenceEndDate, 
        sbyte unpaid, int absenceTypeId, int employeeApproverId, int employeeOwnerId, int absenceStatusId)
    {
        AbsenceModel newAbsence = (AbsenceModel)new AbsenceCreator(absenceStartDate, absenceEndDate, unpaid, 
            absenceTypeId, employeeApproverId, employeeOwnerId, absenceStatusId).CreateModel();
    
        await _crudHandler.CreateAsync(newAbsence);
        _crudHandler.PushChangesToDatabase();
    }
    
    //[Authorize(Roles = "Kadry")]
    [HttpPut("edit/absence/{id}")]
    public async Task<IActionResult> UpdateAbsence(int id, int employeeApproverId, int absenceStatusId)
    {
        var existingAbsence = await _crudHandler.ReadAsync<AbsenceModel>(id);

        if (existingAbsence == null)
            return NotFound();
        
        existingAbsence.employee_approver_id = employeeApproverId;
        existingAbsence.absence_status_id = absenceStatusId;

        try
        {
            await _crudHandler.UpdateAsync(existingAbsence);
            return Ok();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict();
        }
    }
    
    [HttpDelete("delete/absence/{id}")]
    public async Task<IActionResult> DeleteAbsenceById(int id)
    {
        // Check if the absence exists
        var absence = await _crudHandler.ReadAsync<AbsenceModel>(id);
        if (absence == null)
            return NotFound();

        try
        {
            await _crudHandler.DeleteAsync(absence);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("get/employee/absences/{id}/{dateFrom}/{dateTo}")]
    public async Task<IEnumerable<AbsenceModel>> GetEmployeeAbsences(int id, DateTime dateFrom, DateTime dateTo)
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceModel>();
        return query.AsQueryable().Where(absence => absence.employee_owner_id == id).
            Where(absence => absence.absence_start_date >= dateFrom && absence.absence_end_date<=dateTo).ToList();
        
    }
    
    [HttpGet("get/all/employee/absences/{dateFrom}/{dateTo}")]
    public async Task<IEnumerable<AbsenceModel>> GetAllEmployeeAbsences(DateTime dateFrom, DateTime dateTo)
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceModel>();
        return query.AsQueryable().
            Where(absence => absence.absence_start_date >= dateFrom && absence.absence_end_date<=dateTo).ToList();
        
    }
}