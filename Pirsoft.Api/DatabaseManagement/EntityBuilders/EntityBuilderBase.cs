using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public abstract class EntityBuilderBase<TApiModel> : IEntityBuilder where TApiModel : class, IApiModel
    {
        protected readonly ModelBuilder _modelBuilder = null!;

        public EntityBuilderBase(ModelBuilder modelBuilder) => _modelBuilder = modelBuilder;

        public abstract ModelBuilder Build();

        public string GetEntityPrimaryKey(ModelBuilder builder)
        {
            IMutableEntityType? matchingEntity = builder.Model.GetEntityTypes()
                .Where(e => e.Name.Equals(typeof(TApiModel).FullName))
                .FirstOrDefault();

            return (matchingEntity?.FindPrimaryKey()?.Properties[0].Name) ?? string.Empty;
        }
    }

    public interface IEntityBuilder
    {
        ModelBuilder Build();
        string GetEntityPrimaryKey(ModelBuilder modelBuilder);
    }
}
