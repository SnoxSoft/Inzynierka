namespace Pirsoft.Api.Models
{
    public partial class SkillModel : IApiModel
    {
        public int Id { get; set; }
        public string SkillName { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
