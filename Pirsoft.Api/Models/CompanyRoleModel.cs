using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class CompanyRoleModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        public string CompanyRole { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
