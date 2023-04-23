using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class SeniorityLevelController
{
    private readonly ICrudHandler _crudHandler;
    
    public SeniorityLevelController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/seniority/levels")]
    public IEnumerable<SeniorityLevelModel> GetListOfAllSeniorityLevels() =>
        _crudHandler.ReadAll<SeniorityLevelModel>()
            .OrderBy(seniorityLevelModel => seniorityLevelModel.seniority_level_id);
}