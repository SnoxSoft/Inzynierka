using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class ContractTypeModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        public string ContractType { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
