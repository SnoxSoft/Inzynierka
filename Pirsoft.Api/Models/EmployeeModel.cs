namespace Pirsoft.Api.Models;

public class EmployeeModel : IApiModel
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Pesel { get; set; } = null!;
    public string? BankAccountNumber { get; set; }
    public int SeniorityInMonths { get; set; }
    public DateOnly EmploymentStartDate { get; set; }
    public sbyte IsActive { get; set; }
    public sbyte PasswordReset { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public double GrossSalary { get; set; }
    public int ContractIdId { get; set; }
    public int DepartmentId { get; set; }
    public int PositionId { get; set; }
    public int AccountTypeId { get; set; }
    public virtual AccountTypeModel AccountType { get; set; } = null!;
    public virtual ContractTypeModel ContractType { get; set; } = null!;
    public virtual DepartmentModel Department { get; set; } = null!;
    public virtual HolidayModel? Holiday { get; set; }
    public virtual PositionModel PositionType { get; set; } = null!;
    public virtual ICollection<SkillModel> Skills { get; } = new List<SkillModel>();
}