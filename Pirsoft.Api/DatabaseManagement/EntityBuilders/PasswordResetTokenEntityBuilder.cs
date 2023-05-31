using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class PasswordResetTokenEntityBuilder : EntityBuilderBase<PasswordResetTokenModel>
    {
        public PasswordResetTokenEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<PasswordResetTokenModel>(entity =>
            {
                entity.HasKey(e => e.token_id).HasName("PRIMARY");

                entity.HasIndex(e => e.token_employee_id, "fk_token_employee_id_idx");
                entity.HasIndex(e => e.reset_code, "reset_code_UNIQUE").IsUnique();
                entity.HasIndex(e => e.token_id, "token_id_UNIQUE").IsUnique();

                entity.Property(e => e.email).HasMaxLength(45);
                entity.Property(e => e.expiration_time).HasColumnType("datetime");

                entity.HasOne(d => d.token_employee).WithMany(p => p.password_reset_tokens)
                    .HasForeignKey(d => d.token_employee_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_token_employee_id");
            });
    }
}
