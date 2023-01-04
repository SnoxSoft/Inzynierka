using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;

namespace Pirsoft.Api.Interfaces;

public interface IModel
{
    public EmployeeConcrete CreateEmployeeModel(Guid id, string firstName, string lastName, string email, string password, AccountType accountType, string pesel, string bankAccountNumber,
        int departmentId, int seniorityInMonths, DateTime employmentStartDate, bool isActive, bool passwordReset, DateTime dateOfBirth, double grossSalary, PositionType positionType);
}