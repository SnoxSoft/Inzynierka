using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class AbsenceEntityBuilder : EntityBuilderBase<AbsenceModel>
    {
        public AbsenceEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<AbsenceModel>(entity =>
            {
                entity.HasKey(e => e.absence_id).HasName("PRIMARY");

                entity.HasIndex(e => e.absence_id, "Id_UNIQUE").IsUnique();

                entity.HasIndex(e => e.absence_employee_id, "fk_absence_employee_idx");

                entity.Property(e => e.absence_end_date).HasColumnType("date");
                entity.Property(e => e.absence_start_date).HasColumnType("date");

                entity.HasOne(d => d.absence_employee).WithMany(p => p.absences)
                    .HasPrincipalKey(p => p.employee_id)
                    .HasForeignKey(d => d.absence_employee_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_absence_employee");
            });
    }
}
