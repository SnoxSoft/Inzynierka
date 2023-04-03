using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class SkillModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        [Key]
        public int skill_id { get => ApiInternalId; set => ApiInternalId = value; }
        public string skill_name { get; set; } = null!;
        public virtual ICollection<EmployeeModel> employees { get; } = new List<EmployeeModel>();
    }
}
