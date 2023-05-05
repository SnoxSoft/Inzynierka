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
                entity.HasIndex(e => e.absence_type_id, "fk_absence_absence_type_idx");
                entity.HasIndex(e => e.employee_approver_id, "fk_absence_approver_idx");
                entity.HasIndex(e => e.employee_owner_id, "fk_absence_employee_idx");
                entity.HasIndex(e => e.absence_status_id, "fk_absence_status_idx");

                entity.Property(e => e.absence_end_date).HasColumnType("date");
                entity.Property(e => e.absence_start_date).HasColumnType("date");

                entity.HasOne(d => d.absence_status).WithMany(p => p.absences)
                    .HasForeignKey(d => d.absence_status_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_absence_absence_status");

                entity.HasOne(d => d.absence_type).WithMany(p => p.absences)
                    .HasForeignKey(d => d.absence_type_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_absence_absence_type");

                entity.HasOne(d => d.employee_approver).WithMany(p => p.absenceemployee_approvers)
                    .HasForeignKey(d => d.employee_approver_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_absence_employee_approver");

                entity.HasOne(d => d.employee_owner).WithMany(p => p.absenceemployee_owners)
                    .HasForeignKey(d => d.employee_owner_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_absence_employee_owner");
            });
    }
}
