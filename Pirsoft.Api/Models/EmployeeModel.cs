using Pirsoft.Api.Enums;
using Pirsoft.Api.Interfaces;

namespace Pirsoft.Api.Models;

public class EmployeeModel : IModel
{
    private Guid? Id { get; set; } 
    private string? FirstName { get; set; } 
    private string? LastName { get; set; }
    private string? Email { get; set; } 
    private string? Password { get; set; }
    private AccountType? AccountType { get; set; }
    private string? Pesel { get; set; } 
    private string? BankAccountNumber { get; set; } 
    private int? DepartmentId { get; set; }
    private int? SeniorityInMonths { get; set; } 
    private DateTime? EmploymentStartDate { get; set; }
    private bool? IsActive { get; set; }
    private bool? PasswordReset { get; set; }
    private DateTime? DateOfBirth { get; set; }
    private double? GrossSalary { get; set; }
    private PositionType? PositionType { get; set; }
}