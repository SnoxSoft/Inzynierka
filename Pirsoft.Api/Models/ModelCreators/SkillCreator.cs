﻿using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class SkillCreator : ModelCreatorFactoryBase
    {
        private readonly ESkill _skill;

        public SkillCreator(ESkill skill) => _skill = skill;

        public override IApiModel CreateModel() => new SkillModel()
        {
            skill_name = _skill.ToString(),
        };
    }
}
