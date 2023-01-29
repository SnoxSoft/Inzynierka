// using Pirsoft.Api.Enums;
// using Pirsoft.Api.Interfaces;
// using Pirsoft.Api.Models;
// using Pirsoft.Api.Validators;
//
// namespace Pirsoft.Api.Services;
//
// public class EmployeeService
// {
//     private readonly EmployeeModelValidator _employeeModelValidator;
//
//     public EmployeeService()
//     {
//         _employeeModelValidator = new EmployeeModelValidator();
//     }
//     
//     public IModel CreateEmployee(string firstName, string lastName, string email, string password, AccountType accountType, string pesel, string bankAccountNumber,
//         int departmentId, int seniorityInMonths, DateTime employmentStartDate, bool isActive, bool passwordReset, DateTime dateOfBirth, double grossSalary, PositionType positionType)
//     {
//         if (!_employeeModelValidator.IsPeselValid(pesel))
//             pesel = "Missing data";
//         if (!_employeeModelValidator.IsEmailAddressValid(email))
//             email = "Missing data";
//         if (!_employeeModelValidator.IsBankAccountNumberValid(bankAccountNumber))
//             bankAccountNumber = "Missing data";
//         
//         var employee = new EmployeeCreator(firstName, lastName, email, password, accountType, pesel, bankAccountNumber, departmentId,
//             seniorityInMonths, employmentStartDate, isActive, passwordReset, dateOfBirth, grossSalary, positionType);
//
//         return employee.CreateModel();
//     }
// }