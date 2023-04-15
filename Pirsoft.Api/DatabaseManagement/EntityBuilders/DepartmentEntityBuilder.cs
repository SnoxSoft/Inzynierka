using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class DepartmentEntityBuilder : EntityBuilderBase<DepartmentModel>
    {
        public DepartmentEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
        {
            throw new NotImplementedException();
        }
    }
}
