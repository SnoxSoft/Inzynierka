using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class SeniorityLevelModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        [Key]
        public int seniority_level_id { get => ApiInternalId; set => ApiInternalId = value; }
        public string seniority_level_name { get; set; } = null!;
        public virtual ICollection<EmployeeModel> employees { get; } = new List<EmployeeModel>();
    }
}
