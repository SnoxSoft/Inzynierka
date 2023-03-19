namespace Pirsoft.Api.Models
{
    public partial class AccountTypeModel : IApiModel
    {
        public int Id { get; set; }
        public string AccountType { get; set; } = null!;
        public virtual ICollection<EmployeeModel> Employees { get; } = new List<EmployeeModel>();
    }
}
