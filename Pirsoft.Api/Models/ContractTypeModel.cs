namespace Pirsoft.Api.Models
{
    public partial class ContractTypeModel
    {
        public int Id { get; set; }
        public string ContractType { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
