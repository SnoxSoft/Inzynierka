using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement
{
    // -- DI as Singleton
    public sealed class CrudHandler : ICrudHandler
    {
        private readonly DatabaseContext _dbContext;

        public CrudHandler(DatabaseContext dbContext) => _dbContext = dbContext;

        public void Create<TModel>(TModel entity) where TModel : class, IApiModel
        {
            if (entity.ApiInternalId != 0)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property set, use {nameof(CrudHandler)}.Update instead.", nameof(entity));
            }

            _dbContext.Set<TModel>().Add(entity);
        }

        public TModel? Read<TModel>(int entityId) where TModel : class, IApiModel
            => _dbContext.Set<TModel>().Find(entityId);

        public IEnumerable<TModel> ReadAll<TModel>() where TModel : class, IApiModel
            => _dbContext.Set<TModel>().AsEnumerable();

        public void Update<TModel>(TModel entity) where TModel : class, IApiModel
        {
            if (entity.ApiInternalId < 1)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property value less than 1", nameof(entity));
            }

            _dbContext.Set<TModel>().Update(entity);
        }

        public void Delete<TModel>(TModel entity) where TModel : class, IApiModel
        {
            if (entity.ApiInternalId < 1)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property value less than 1", nameof(entity));
            }

            _dbContext.Set<TModel>().Remove(entity);
        }

        public int PushChangesToDatabase()
            => _dbContext.SaveChanges(true);
    }

    public interface ICrudHandler
    {
        void Create<TModel>(TModel entity) where TModel : class, IApiModel;
        TModel? Read<TModel>(int entityId) where TModel : class, IApiModel;
        IEnumerable<TModel> ReadAll<TModel>() where TModel : class, IApiModel;
        void Update<TModel>(TModel entity) where TModel : class, IApiModel;
        void Delete<TModel>(TModel entity) where TModel : class, IApiModel;
        int PushChangesToDatabase();
    }
}
