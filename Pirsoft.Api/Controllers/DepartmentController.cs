using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class DepartmentController : Controller
{
    private readonly ICrudHandler _crudHandler;
    
    public DepartmentController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/departments")]
    public async Task<IEnumerable<DepartmentModel>> GetListOfAllDepartments()
    {
        var query = await _crudHandler.ReadAllAsync<DepartmentModel>();
        return await query.OrderBy(departmentModel => departmentModel.department_id).ToListAsync();
    }
}