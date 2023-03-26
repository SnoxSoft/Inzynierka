using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() { }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public virtual DbSet<AccountTypeModel> Account_type { get; set; }
        public virtual DbSet<ContractTypeModel> Contract_type { get; set; }
        public virtual DbSet<DepartmentModel> Departament { get; set; }
        public virtual DbSet<EmployeeModel> Employee { get; set; }
        public virtual DbSet<HolidayModel> Holiday { get; set; }
        public virtual DbSet<PositionTypeModel> Position { get; set; }
        public virtual DbSet<SkillModel> Skills { get; set; }
    }
}
