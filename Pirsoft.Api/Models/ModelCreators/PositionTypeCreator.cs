using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class PositionTypeCreator : ModelCreatorFactoryBase
    {
        private readonly EPositionType _positionType;

        public PositionTypeCreator(EPositionType positionType) => _positionType = positionType;

        public override IApiModel CreateModel() => new PositionTypeModel()
        {
            PositionType = _positionType.ToString(),
        };
    }
}
