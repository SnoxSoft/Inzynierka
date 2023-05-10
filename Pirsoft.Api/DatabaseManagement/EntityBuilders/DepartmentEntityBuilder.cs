using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class DepartmentEntityBuilder : EntityBuilderBase<DepartmentModel>
    {
        public DepartmentEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<DepartmentModel>(entity =>
            {
                entity.HasKey(e => e.department_id).HasName("PRIMARY");

                entity.HasIndex(e => e.department_name, "departamentName_UNIQUE").IsUnique();
                entity.HasIndex(e => e.department_id, "id_UNIQUE").IsUnique();

                entity.Property(e => e.department_name).HasMaxLength(45);
            });
    }
}
