using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models
{
    public partial class HolidayModel : IApiModel
    {
        [NotMapped]
        public int ApiInternalId { get; set; }

        public int EmployeeId
        {
            get => ApiInternalId;
            set => ApiInternalId = value;
        }
        public DateOnly HolidayStart { get; set; }
        public DateOnly HolidayEnd { get; set; }
        public int Duration { get; set; }
        public virtual EmployeeModel Employee { get; set; } = null!;
    }
}
