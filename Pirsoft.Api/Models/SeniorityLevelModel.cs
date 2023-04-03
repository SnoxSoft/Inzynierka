namespace Pirsoft.Api.Models
{
    public partial class SeniorityLevelModel : IApiModel
    {
        public int Id { get; set; }
        public string SeniorityLevel { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
