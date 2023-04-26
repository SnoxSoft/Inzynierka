using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class CompanyRoleController : Controller
{
    private readonly ICrudHandler _crudHandler;
    
    public CompanyRoleController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/company/roles")]
    public async Task<IEnumerable<CompanyRoleModel>> GetListOfAllCompanyRoles()
    {
        var query = await _crudHandler.ReadAllAsync<CompanyRoleModel>();
        return await query.OrderBy(companyRoleModel => companyRoleModel.role_id).ToListAsync();
    }
}