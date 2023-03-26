namespace Pirsoft.Api.Models
{
    public partial class DepartmentModel : IApiModel
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
