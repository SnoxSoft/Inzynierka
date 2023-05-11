using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class AbsenceTypeEntityBuilder : EntityBuilderBase<AbsenceTypeModel>
    {
        public AbsenceTypeEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<AbsenceTypeModel>(entity =>
            {
                entity.HasKey(e => e.absence_type_id).HasName("PRIMARY");

                entity.HasIndex(e => e.absence_type_id, "absence_type_id_UNIQUE").IsUnique();
                entity.HasIndex(e => e.absence_type_name, "absence_type_name_UNIQUE").IsUnique();

                entity.Property(e => e.absence_type_category).HasMaxLength(45);
                entity.Property(e => e.absence_type_name).HasMaxLength(45);
            });
    }
}
