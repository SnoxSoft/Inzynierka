using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.CrudHandlers
{
    // -- DI as Singleton
    public sealed class CrudHandler : ICrudHandler
    {
        private readonly DatabaseContext _dbContext;

        public CrudHandler(DatabaseContext dbContext) => _dbContext = dbContext;

        public async Task CreateAsync<TModel>(TModel entity) where TModel : class, IApiModel
        {
            if (entity.ApiInternalId != 0)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property set, use {nameof(CrudHandler)}.UpdateAsync instead.", nameof(entity));
            }

            await _dbContext.Set<TModel>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<TModel?> ReadAsync<TModel>(int entityId) where TModel : class, IApiModel
        {
            return await _dbContext.Set<TModel>().FindAsync(entityId);
        }

        public async Task<IQueryable<TModel>> ReadAllAsync<TModel>() where TModel : class, IApiModel =>
            await Task.FromResult(_dbContext.Set<TModel>());

        public async Task UpdateAsync<TModel>(TModel entity) where TModel : class, IApiModel
        {
            if (entity.ApiInternalId < 1)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property value less than 1", nameof(entity));
            }

            _dbContext.Set<TModel>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync<TModel>(TModel entity) where TModel : class, IApiModel
        {
            if (entity.ApiInternalId < 1)
            {
                throw new ArgumentException($"Passed model object with '{nameof(entity.ApiInternalId)}' property value less than 1", nameof(entity));
            }

            _dbContext.Set<TModel>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public int PushChangesToDatabase()
            => _dbContext.SaveChanges(true);
    }

    public interface ICrudHandler
    {
        Task CreateAsync<TModel>(TModel entity) where TModel : class, IApiModel;
        Task<TModel?> ReadAsync<TModel>(int entityId) where TModel : class, IApiModel;
        Task<IQueryable<TModel>> ReadAllAsync<TModel>() where TModel : class, IApiModel;
        Task UpdateAsync<TModel>(TModel entity) where TModel : class, IApiModel;
        Task DeleteAsync<TModel>(TModel entity) where TModel : class, IApiModel;
        int PushChangesToDatabase();
    }
}
