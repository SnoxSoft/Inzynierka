using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class CompanyRoleCreator : ModelCreatorFactoryBase
    {
        private readonly ECompanyRole _companyRole;

        public CompanyRoleCreator(ECompanyRole companyRole) => _companyRole = companyRole;

        public override IApiModel CreateModel() => new CompanyRoleModel()
        {
            CompanyRole = _companyRole.ToString(),
        };
    }
}
