using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class ContractTypeModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        [Key]
        public int contract_id { get => ApiInternalId; set => ApiInternalId = value; }
        public string contract_type_name { get; set; } = null!;
        public virtual ICollection<EmployeeModel> employees { get; } = new List<EmployeeModel>();
    }
}
