using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement
{
    public partial class DatabaseContext : DbContext
    {
        private readonly IDatabaseModelBuilder _databaseModelBuilder = null!;

        public DatabaseContext() { }

        public DatabaseContext(DbContextOptions<DatabaseContext> options, IDatabaseModelBuilder databaseModelBuilder) : base(options)
            => _databaseModelBuilder = databaseModelBuilder;

        public virtual DbSet<AbsenceModel> absences { get; set; }
        public virtual DbSet<CompanyRoleModel> company_roles { get; set; }
        public virtual DbSet<ContractTypeModel> contract_types { get; set; }
        public virtual DbSet<DepartmentModel> departments { get; set; }
        public virtual DbSet<EmployeeModel> employees { get; set; }
        public virtual DbSet<SeniorityLevelModel> seniority_levels { get; set; }
        public virtual DbSet<SkillModel> skills { get; set; }
        public virtual DbSet<PasswordResetTokenModel> password_reset_tokens { get; set; }
        
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        
        public async Task AddPasswordResetTokenAsync(PasswordResetTokenModel passwordResetToken)
        {
            await password_reset_tokens.AddAsync(passwordResetToken);
        }

        public async Task RemovePasswordResetTokenAsync(PasswordResetTokenModel passwordResetToken)
        {
            password_reset_tokens.Remove(passwordResetToken);
            await SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _databaseModelBuilder.BuildModel(modelBuilder);

            OnModelCreatingPartial(modelBuilder);
        }
    }
}
