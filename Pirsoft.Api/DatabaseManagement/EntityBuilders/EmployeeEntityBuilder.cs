using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class EmployeeEntityBuilder : EntityBuilderBase<EmployeeModel>
    {
        public EmployeeEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
        {
            throw new NotImplementedException();
        }
    }
}
