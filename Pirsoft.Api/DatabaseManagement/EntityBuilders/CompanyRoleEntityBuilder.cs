using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class CompanyRoleEntityBuilder : EntityBuilderBase<CompanyRoleModel>
    {
        public CompanyRoleEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<CompanyRoleModel>(entity =>
            {
                entity.HasKey(e => e.role_id).HasName("PRIMARY");
                entity.HasIndex(e => e.role_id, "id_UNIQUE").IsUnique();
                entity.HasIndex(e => e.role_name, "roleName_UNIQUE").IsUnique();
                entity.Property(e => e.role_name).HasMaxLength(45);
            });
    }
}
