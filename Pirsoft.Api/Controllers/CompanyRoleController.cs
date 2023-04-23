using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class CompanyRoleController
{
    private readonly ICrudHandler _crudHandler;
    
    public CompanyRoleController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/company/roles")]
    public IEnumerable<CompanyRoleModel> GetListOfAllCompanyRoles() =>
        _crudHandler.ReadAll<CompanyRoleModel>().OrderBy(companyRoleModel => companyRoleModel.role_id);
}