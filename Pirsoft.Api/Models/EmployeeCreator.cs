using Pirsoft.Api.Factory;
using Pirsoft.Api.Interfaces;

namespace Pirsoft.Api.Models
{
    public class EmployeeCreator : Creator
    {
        public override IModel CreateModel(Guid Id, string FirstName)
        {
            //validate here
            return new EmployeeConcrete();
        }
    }   
}