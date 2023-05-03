using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class EmployeeEntityBuilder : EntityBuilderBase<EmployeeModel>
    {
        public EmployeeEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<EmployeeModel>(entity =>
            {
                entity.HasKey(e => new { e.employee_id}).HasName("PRIMARY");

                entity.HasIndex(e => e.email_address, "email_UNIQUE").IsUnique();
                entity.HasIndex(e => e.employee_company_role_id, "fk_employee_company_role_idx");
                entity.HasIndex(e => e.employee_contract_type_id, "fk_employee_contract_type_idx");
                entity.HasIndex(e => e.employee_department_id, "fk_employee_department_idx");
                entity.HasIndex(e => e.employee_seniority_level_id, "fk_employee_seniority_level_idx");
                entity.HasIndex(e => e.employee_id, "id_UNIQUE").IsUnique();
                entity.HasIndex(e => e.pesel, "pesel_UNIQUE").IsUnique();

                entity.Property(e => e.employee_id).ValueGeneratedOnAdd();
                entity.Property(e => e.bank_account_number).HasMaxLength(26);
                entity.Property(e => e.birth_date).HasColumnType("date");
                entity.Property(e => e.email_address).HasMaxLength(120);
                entity.Property(e => e.employment_start_date).HasColumnType("date");
                entity.Property(e => e.first_name).HasMaxLength(50);
                entity.Property(e => e.last_name).HasMaxLength(50);
                entity.Property(e => e.password).HasMaxLength(120);
                entity.Property(e => e.pesel).HasMaxLength(11);

                entity.HasOne(d => d.employee_company_role).WithMany(p => p.employees)
                    .HasForeignKey(d => d.employee_company_role_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_company_role");

                entity.HasOne(d => d.employee_contract_type).WithMany(p => p.employees)
                    .HasForeignKey(d => d.employee_contract_type_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_contract_type");

                entity.HasOne(d => d.employee_department).WithMany(p => p.employees)
                    .HasForeignKey(d => d.employee_department_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_department");

                entity.HasOne(d => d.employee_seniority_level).WithMany(p => p.employees)
                    .HasForeignKey(d => d.employee_seniority_level_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_seniority_level");

                entity.HasMany(d => d.skills).WithMany(p => p.employees)
                    .UsingEntity<Dictionary<string, object>>(
                        "employees_skill",
                        r => r.HasOne<SkillModel>().WithMany()
                            .HasForeignKey("skill_id")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("fk_employees_skills_skill"),
                        l => l.HasOne<EmployeeModel>().WithMany()
                            .HasPrincipalKey("employee_id")
                            .HasForeignKey("employee_id")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("fk_employees_skills_employee"),
                        j =>
                        {
                            j.HasKey("employee_id", "skill_id").HasName("PRIMARY");
                            j.ToTable("employees_skills");
                            j.HasIndex(new[] { "employee_id" }, "fk_employee_has_skills_employee1_idx");
                            j.HasIndex(new[] { "skill_id" }, "fk_skill_idx");
                        });
            });
    }
}
