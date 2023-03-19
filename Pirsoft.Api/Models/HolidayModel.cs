namespace Pirsoft.Api.Models
{
    public partial class HolidayModel : IApiModel
    {
        public int Id { get; set; }
        public int EmployeeId
        {
            get => Id;
            set => Id = value;
        }
        public DateOnly HolidayStart { get; set; }
        public DateOnly HolidayEnd { get; set; }
        public int Duration { get; set; }
        public virtual EmployeeModel Employee { get; set; } = null!;
    }
}
