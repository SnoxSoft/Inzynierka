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
        public sbyte unpaid { get; set; }
        public int absence_type_id { get; set; }
        public int employee_approver_id { get; set; }
        public int employee_owner_id { get; set; }
        public int absence_status_id { get; set; }

        public virtual AbsenceStatusModel absence_status { get; set; } = null!;
        public virtual AbsenceTypeModel absence_type { get; set; } = null!;
        public virtual EmployeeModel employee_approver { get; set; } = null!;
        public virtual EmployeeModel employee_owner { get; set; } = null!;
    }
}
