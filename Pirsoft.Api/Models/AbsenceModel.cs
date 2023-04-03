using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class AbsenceModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        [Key]
        public int absence_id { get => ApiInternalId; set => ApiInternalId = value; }
        public DateTime absence_start_date { get; set; }
        public DateTime absence_end_date { get; set; }
        public int duration { get; set; }
        public int absence_employee_id { get; set; }
        public virtual EmployeeModel absence_employee { get; set; } = null!;
    }
}
