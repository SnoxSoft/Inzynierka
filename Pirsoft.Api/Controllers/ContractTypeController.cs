using Microsoft.AspNetCore.Mvc;
using Pirsoft.Api.DatabaseManagement;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class ContractTypeController : Controller
{
    private readonly ICrudHandler _crudHandler;
    
    public ContractTypeController(ICrudHandler crudHandler) => _crudHandler = crudHandler;
    
    [HttpGet("/get/contracts")]
    public IEnumerable<ContractTypeModel> GetListOfAllContracts() =>
        _crudHandler.ReadAll<ContractTypeModel>().OrderBy(contractType => contractType.contract_id);
}