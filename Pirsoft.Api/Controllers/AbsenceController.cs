using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement;
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
    public async Task CreateNewAbsence(DateTime absenceStartDate, DateTime absenceEndDate, sbyte unpaid, int absenceTypeId, int employeeApproverId, int employeeOwnerId, int absenceStatusId)
    {
        AbsenceModel newAbsence = (AbsenceModel)new AbsenceCreator(absenceStartDate, absenceEndDate, unpaid, 
            absenceTypeId, employeeApproverId, employeeOwnerId, absenceStatusId).CreateModel();
    
        await _crudHandler.CreateAsync(newAbsence);
        _crudHandler.PushChangesToDatabase();
    }
}