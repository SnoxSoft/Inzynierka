using Microsoft.EntityFrameworkCore;

namespace Pirsoft.Api.DatabaseManagement
{
    public class DatabaseModelBuilder : IDatabaseModelBuilder
    {
        public ModelBuilder BuildModel(ModelBuilder modelBuilder)
        {
            throw new NotImplementedException();
        }
    }

    public interface IDatabaseModelBuilder
    {
        ModelBuilder BuildModel(ModelBuilder modelBuilder);
    }
}
