using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext() { }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public virtual DbSet<AbsenceModel> absences { get; set; }
        public virtual DbSet<CompanyRoleModel> company_roles { get; set; }
        public virtual DbSet<ContractTypeModel> contract_types { get; set; }
        public virtual DbSet<DepartmentModel> departments { get; set; }
        public virtual DbSet<EmployeeModel> employees { get; set; }
        public virtual DbSet<SeniorityLevelModel> seniority_levels { get; set; }
        public virtual DbSet<SkillModel> skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AbsenceModel>(entity =>
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

            modelBuilder.Entity<CompanyRoleModel>(entity =>
            {
                entity.HasKey(e => e.role_id).HasName("PRIMARY");

                entity.HasIndex(e => e.role_id, "id_UNIQUE").IsUnique();

                entity.HasIndex(e => e.role_name, "roleName_UNIQUE").IsUnique();

                entity.Property(e => e.role_name).HasMaxLength(45);
            });

            modelBuilder.Entity<ContractTypeModel>(entity =>
            {
                entity.HasKey(e => e.contract_id).HasName("PRIMARY");

                entity.HasIndex(e => e.contract_type_name, "contractName_UNIQUE").IsUnique();

                entity.HasIndex(e => e.contract_id, "id_UNIQUE").IsUnique();

                entity.Property(e => e.contract_type_name).HasMaxLength(45);
            });

            modelBuilder.Entity<DepartmentModel>(entity =>
            {
                entity.HasKey(e => e.department_id).HasName("PRIMARY");

                entity.HasIndex(e => e.department_name, "departamentName_UNIQUE").IsUnique();

                entity.HasIndex(e => e.department_id, "id_UNIQUE").IsUnique();

                entity.Property(e => e.department_name).HasMaxLength(45);
            });

            modelBuilder.Entity<EmployeeModel>(entity =>
            {
                entity.HasKey(e => new { e.employee_id, e.employee_contract_type_id, e.employee_department_id, e.employee_seniority_level_id, e.employee_company_role_id }).HasName("PRIMARY");

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

            modelBuilder.Entity<SeniorityLevelModel>(entity =>
            {
                entity.HasKey(e => e.seniority_level_id).HasName("PRIMARY");

                entity.HasIndex(e => e.seniority_level_id, "id_UNIQUE").IsUnique();

                entity.HasIndex(e => e.seniority_level_name, "position_UNIQUE").IsUnique();

                entity.Property(e => e.seniority_level_name).HasMaxLength(45);
            });

            modelBuilder.Entity<SkillModel>(entity =>
            {
                entity.HasKey(e => e.skill_id).HasName("PRIMARY");

                entity.HasIndex(e => e.skill_id, "id_UNIQUE").IsUnique();

                entity.HasIndex(e => e.skill_name, "skillName_UNIQUE").IsUnique();

                entity.Property(e => e.skill_name).HasMaxLength(45);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
