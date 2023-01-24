using Pirsoft.Api.Factory;
using Pirsoft.Api.Interfaces;

namespace Pirsoft.Api.Models
{
    public class EmployeeCreator : Creator
    {
        public override IModel CreateModel() => new EmployeeModel();
    }
}