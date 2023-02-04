using Pirsoft.Api.Enums;
using Pirsoft.Api.Interfaces;

namespace Pirsoft.Api.Models;

public class EmployeeModel : IModel
{
    private Guid? Id { get; set; } 
    public string? FirstName { get; set; } 
    public string? LastName { get; set; }
    public string? Email { get; set; } 
    public string? Password { get; set; }
    public AccountType? AccountType { get; set; }
    public string? Pesel { get; set; } 
    public string? BankAccountNumber { get; set; } 
    public int? DepartmentId { get; set; }
    public int? SeniorityInMonths { get; set; } 
    public DateTime? EmploymentStartDate { get; set; }
    public bool? IsActive { get; set; }
    public bool? PasswordReset { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public double? GrossSalary { get; set; }
    public PositionType? PositionType { get; set; }
}