using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class ContractTypeEntityBuilder : EntityBuilderBase<ContractTypeModel>
    {
        public ContractTypeEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<ContractTypeModel>(entity =>
            {
                entity.HasKey(e => e.contract_id).HasName("PRIMARY");
                entity.HasIndex(e => e.contract_type_name, "contractName_UNIQUE").IsUnique();
                entity.HasIndex(e => e.contract_id, "id_UNIQUE").IsUnique();
                entity.Property(e => e.contract_type_name).HasMaxLength(45);
            });
    }
}
