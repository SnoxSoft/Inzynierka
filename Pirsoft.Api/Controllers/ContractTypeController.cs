using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class ContractTypeController : Controller
{
    private readonly ICrudHandler _crudHandler;
    
    public ContractTypeController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [Authorize]
    [HttpGet("/get/contracts")]
    public async Task<IEnumerable<ContractTypeModel>> GetListOfAllContracts()
    {
        var query = await _crudHandler.ReadAllAsync<ContractTypeModel>();
        return await query.OrderBy(contractTypeModel => contractTypeModel.contract_id).ToListAsync();
    }

    [Authorize]
    [HttpGet("/get/contract/{contractId}")]
    public async Task<ContractTypeModel> GetContractTypeById(int contractId)
    {
        var query = await _crudHandler.ReadAsync<ContractTypeModel>(contractId);

        if (query != null)
            return query;
        else
            return null;
    }
}