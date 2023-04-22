using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class DepartmentController : ControllerBase
{
    private readonly ICrudHandler _crudHandler;
    
    public DepartmentController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/departments")]
    public IEnumerable<DepartmentModel> GetListOfAllDepartments() => 
        _crudHandler.ReadAll<DepartmentModel>().OrderBy(departmentModel => departmentModel.department_id);
    
}