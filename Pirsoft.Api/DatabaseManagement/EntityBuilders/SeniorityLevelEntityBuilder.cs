using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class SeniorityLevelEntityBuilder : EntityBuilderBase<SeniorityLevelModel>
    {
        public SeniorityLevelEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<SeniorityLevelModel>(entity =>
            {
                entity.HasKey(e => e.seniority_level_id).HasName("PRIMARY");

                entity.HasIndex(e => e.seniority_level_id, "id_UNIQUE").IsUnique();
                entity.HasIndex(e => e.seniority_level_name, "position_UNIQUE").IsUnique();

                entity.Property(e => e.seniority_level_name).HasMaxLength(45);
            });
    }
}
