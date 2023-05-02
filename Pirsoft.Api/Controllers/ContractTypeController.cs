using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class ContractTypeController : Controller
{
    private readonly ICrudHandler _crudHandler;
    
    public ContractTypeController(ICrudHandler crudHandler) => _crudHandler = crudHandler;

    [HttpGet("/get/contracts")]
    public async Task<IEnumerable<ContractTypeModel>> GetListOfAllContracts()
    {
        var query = await _crudHandler.ReadAllAsync<ContractTypeModel>();
        return await query.OrderBy(contractTypeModel => contractTypeModel.contract_id).ToListAsync();
    }

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