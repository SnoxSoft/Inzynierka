using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class DepartmentModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        public string DepartmentName { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
