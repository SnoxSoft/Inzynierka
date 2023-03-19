namespace Pirsoft.Api.Models
{
    public partial class PositionTypeModel : IApiModel
    {
        public int Id { get; set; }
        public string PositionType { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
