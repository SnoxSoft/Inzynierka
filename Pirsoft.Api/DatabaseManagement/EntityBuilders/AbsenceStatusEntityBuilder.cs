using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class AbsenceStatusEntityBuilder : EntityBuilderBase<AbsenceStatusModel>
    {
        public AbsenceStatusEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<AbsenceStatusModel>(entity =>
            {
                entity.HasKey(e => e.absence_status_id).HasName("PRIMARY");

                entity.HasIndex(e => e.absence_status_id, "absence_status_id_UNIQUE").IsUnique();
                entity.HasIndex(e => e.absence_status_name, "absence_status_name_UNIQUE").IsUnique();
                entity.HasIndex(e => e.absence_status_name_eng, "absence_status_name_eng_UNIQUE").IsUnique();

                entity.Property(e => e.absence_status_name).HasMaxLength(45);
                entity.Property(e => e.absence_status_name_eng).HasMaxLength(45);
            });
    }
}
