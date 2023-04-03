using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class SeniorityLevelCreator : ModelCreatorFactoryBase
    {
        private readonly ESeniorityLevel _seniorityLevel;

        public SeniorityLevelCreator(ESeniorityLevel seniorityLevel) => _seniorityLevel = seniorityLevel;

        public override IApiModel CreateModel() => new SeniorityLevelModel()
        {
            SeniorityLevel = _seniorityLevel.ToString(),
        };
    }
}
