using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class SeniorityLevelController : Controller
{
    private readonly ICrudHandler _crudHandler;
    
    public SeniorityLevelController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/seniority/levels")]
    public async Task<IEnumerable<SeniorityLevelModel>> GetListOfAllSeniorityLevels()
    {
        var query = await _crudHandler.ReadAllAsync<SeniorityLevelModel>();
        var options = new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve
        };
        var json = JsonSerializer.Serialize(query.OrderBy(seniorityLevelModel => seniorityLevelModel.seniority_level_id), options);
        return JsonSerializer.Deserialize<IEnumerable<SeniorityLevelModel>>(json, options)!;
    }
}