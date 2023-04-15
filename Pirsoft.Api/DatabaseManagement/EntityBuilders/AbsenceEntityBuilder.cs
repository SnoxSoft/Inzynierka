using Microsoft.EntityFrameworkCore;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class AbsenceEntityBuilder : IEntityBuilder
    {
        private readonly ModelBuilder _modelBuilder = null!;

        public AbsenceEntityBuilder(ModelBuilder modelBuilder) => _modelBuilder = modelBuilder;

        public ModelBuilder Build()
        {
            throw new NotImplementedException();
        }

        public string GetEntityPrimaryKey(ModelBuilder modelBuilder)
        {
            throw new NotImplementedException();
        }
    }

    public interface IEntityBuilder
    {
        ModelBuilder Build();
        string GetEntityPrimaryKey(ModelBuilder modelBuilder);
    }
}
