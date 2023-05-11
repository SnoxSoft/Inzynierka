using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.EntityBuilders;

namespace Pirsoft.Api.DatabaseManagement
{
    public class DatabaseModelBuilder : IDatabaseModelBuilder
    {
        public ModelBuilder BuildModel(ModelBuilder modelBuilder)
        {
            foreach (IEntityBuilder builder in getEntityBuilders(modelBuilder))
            {
                builder.Build();
            }

            return modelBuilder;
        }

        private IEntityBuilder[] getEntityBuilders(ModelBuilder modelBuilder)
            => new IEntityBuilder[]
            {
                new AbsenceEntityBuilder(modelBuilder),
                new AbsenceStatusEntityBuilder(modelBuilder),
                new AbsenceTypeEntityBuilder(modelBuilder),
                new CompanyRoleEntityBuilder(modelBuilder),
                new ContractTypeEntityBuilder(modelBuilder),
                new DepartmentEntityBuilder(modelBuilder),
                new EmployeeEntityBuilder(modelBuilder),
                new SeniorityLevelEntityBuilder(modelBuilder),
                new SkillEntityBuilder(modelBuilder),
            };
    }

    public interface IDatabaseModelBuilder
    {
        ModelBuilder BuildModel(ModelBuilder modelBuilder);
    }
}
