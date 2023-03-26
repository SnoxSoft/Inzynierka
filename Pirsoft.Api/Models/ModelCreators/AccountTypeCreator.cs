using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class AccountTypeCreator : ModelCreatorFactoryBase
    {
        private readonly EAccountType _accountType;

        public AccountTypeCreator(EAccountType accountType) => _accountType = accountType;

        public override IApiModel CreateModel() => new AccountTypeModel()
        {
            AccountType = _accountType.ToString(),
        };
    }
}
