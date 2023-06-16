using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
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

    [Authorize]
    [HttpGet("/get/department/{departmentId}")]
    public async Task<DepartmentModel> GetDepartmentById(int departmentId)
    {
        var query = await _crudHandler.ReadAsync<DepartmentModel>(departmentId);

        if (query != null)
            return query;
        else
            return null;
    }

    [Authorize]
    [HttpPost("/create/department")]
    public async Task CreateNewDepartment(string departmentName)
    {
        DepartmentModel newDepartment = new DepartmentModel()
        {
            department_name = departmentName
        };
        
        await _crudHandler.CreateAsync(newDepartment);
        //_crudHandler.PushChangesToDatabase();
    }

    [Authorize(Roles = "Kadry")] 
    [HttpDelete("/delete/department/{id}")]
    public async Task<ActionResult> DeleteDepartmentById(int id)
    {

        var department = await _crudHandler.ReadAsync<DepartmentModel>(id);
        if (department == null)
            return NotFound();

        try
        {
            await _crudHandler.DeleteAsync(department);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex);
        }
    }

    [Authorize(Roles = "Kadry")]
    [HttpPut("edit/department/{id}")]
    public async Task<ActionResult> UpdateDepartment(int id, string departmentName)
    {
        var existingDepartment = await _crudHandler.ReadAsync<DepartmentModel>(id);

        if (existingDepartment == null)
            return NotFound();
        
        existingDepartment.department_name = departmentName;
        
        try
        {
            await _crudHandler.UpdateAsync(existingDepartment);
            return Ok();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict();
        }
    }
}