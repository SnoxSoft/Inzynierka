namespace Pirsoft.Api.Models
{
    public partial class CompanyRoleModel : IApiModel
    {
        public int Id { get; set; }
        public string CompanyRole { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
