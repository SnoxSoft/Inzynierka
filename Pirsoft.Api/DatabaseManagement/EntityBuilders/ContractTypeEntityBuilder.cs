using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class ContractTypeEntityBuilder : EntityBuilderBase<ContractTypeModel>
    {
        public ContractTypeEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
        {
            throw new NotImplementedException();
        }
    }
}
