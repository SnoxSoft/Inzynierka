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

    [HttpGet("/get/department/{departmentId}")]
    public async Task<DepartmentModel> GetDepartmentById(int departmentId)
    {
        var query = await _crudHandler.ReadAsync<DepartmentModel>(departmentId);

        if (query != null)
            return query;
        else
            return null;
    }

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

    [HttpDelete("/delete/department/{id}")]
    //[Authorize(Roles = "Kadry")] 
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

    [HttpPut("edit/department/{id}")]
    //[Authorize(Roles = "Kadry")]
    public async Task<ActionResult> UpdateDepartment(int id, DepartmentModel departmentModel)
    {
        var existingDepartment = await _crudHandler.ReadAsync<DepartmentModel>(id);

        if (existingDepartment == null)
            return NotFound();

        existingDepartment.department_id = departmentModel.department_id;
        existingDepartment.department_name = departmentModel.department_name;
        
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