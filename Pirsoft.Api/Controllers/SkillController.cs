using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class SkillController : ControllerBase
{
    private readonly ICrudHandler _crudHandler;
    
    public SkillController(ICrudHandler crudHandler) => _crudHandler = crudHandler;
    
    [Authorize]
    [HttpGet("/get/skills")]
    public async Task<IEnumerable<SkillModel>> GetListOfAllSkills()
    {
        var query = await _crudHandler.ReadAllAsync<SkillModel>();
        return await query.OrderBy(skillModel => skillModel.skill_id).ToListAsync();
    }
}