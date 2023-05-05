using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class AbsenceTypeEntityBuilder : EntityBuilderBase<AbsenceTypeModel>
    {
        public AbsenceTypeEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
        {
            throw new NotImplementedException();
        }
    }
}
