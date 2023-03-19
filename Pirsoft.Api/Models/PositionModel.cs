namespace Pirsoft.Api.Models
{
    public partial class PositionModel : IApiModel
    {
        public int Id { get; set; }
        public string Position { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
