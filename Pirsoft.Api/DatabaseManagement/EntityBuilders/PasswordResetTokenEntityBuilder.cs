using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.DatabaseManagement.EntityBuilders
{
    public class PasswordResetTokenEntityBuilder : EntityBuilderBase<PasswordResetTokenModel>
    {
        public PasswordResetTokenEntityBuilder(ModelBuilder modelBuilder) : base(modelBuilder) { }

        public override ModelBuilder Build()
        {
            throw new NotImplementedException();
        }
    }
}
