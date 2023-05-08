using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
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

    [HttpGet("/get/company/role/{companyRoleId}")]
    public async Task<CompanyRoleModel> GetCompanyRoleById(int companyRoleId)
    {
        var query = await _crudHandler.ReadAsync<CompanyRoleModel>(companyRoleId);

        if (query != null)
            return query;
        else
            return null;
    }
}