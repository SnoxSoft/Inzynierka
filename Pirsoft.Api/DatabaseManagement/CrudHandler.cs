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
            throw new NotImplementedException();
        }

        public TModel? Read<TModel>(int entityId) where TModel : class, IApiModel
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TModel> ReadAll<TModel>() where TModel : class, IApiModel
        {
            throw new NotImplementedException();
        }

        public void Update<TModel>(TModel entity) where TModel : class, IApiModel
        {
            throw new NotImplementedException();
        }

        public void Delete<TModel>(TModel entity) where TModel : class, IApiModel
        {
            throw new NotImplementedException();
        }

        public int PushChangesToDatabase()
        {
            throw new NotImplementedException();
        }
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
