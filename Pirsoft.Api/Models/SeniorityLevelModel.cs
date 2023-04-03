using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class SeniorityLevelModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        public string SeniorityLevel { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
