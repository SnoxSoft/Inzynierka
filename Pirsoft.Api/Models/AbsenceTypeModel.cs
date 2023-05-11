using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class AbsenceTypeModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        [Key]
        public int absence_type_id { get => ApiInternalId; set => ApiInternalId = value; }
        public string absence_type_name { get; set; } = null!;
        public string absence_type_category { get; set; } = null!;
        public virtual ICollection<AbsenceModel> absences { get; set; } = new List<AbsenceModel>();
    }
}
