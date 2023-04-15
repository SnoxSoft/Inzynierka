using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class SkillEntityBuilder : EntityBuilderBase<SkillModel>
    {
        public SkillEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
            => _modelBuilder.Entity<SkillModel>(entity =>
            {
                entity.HasKey(e => e.skill_id).HasName("PRIMARY");
                entity.HasIndex(e => e.skill_id, "id_UNIQUE").IsUnique();
                entity.HasIndex(e => e.skill_name, "skillName_UNIQUE").IsUnique();
                entity.Property(e => e.skill_name).HasMaxLength(45);
            });
    }
}
