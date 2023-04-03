using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class CompanyRoleModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        [Key]
        public int role_id { get => ApiInternalId; set => ApiInternalId = value; }
        public string role_name { get; set; } = null!;
        public virtual ICollection<EmployeeModel> employees { get; } = new List<EmployeeModel>();
    }
}
