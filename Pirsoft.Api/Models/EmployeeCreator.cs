using Pirsoft.Api.Enums;
using Pirsoft.Api.Factory;
using Pirsoft.Api.Interfaces;

namespace Pirsoft.Api.Models
{
    public class EmployeeCreator : Creator
    {
        private readonly string _firstName;
        private readonly string _lastName;
        private readonly string _email;
        private readonly string _password;
        private readonly AccountType _accountType;
        private readonly string _pesel;
        private readonly string _bankAccountNumber;
        private readonly int _departmentId;
        private readonly int _seniorityInMonths;
        private readonly DateTime _employmentStartDate;
        private readonly bool _isActive;
        private readonly bool _passwordReset;
        private readonly DateTime _dateOfBirth;
        private readonly double _grossSalary;
        private readonly PositionType _positionType;
        
        public EmployeeCreator(string firstName, string lastName, string email, string password, AccountType accountType, string pesel, string bankAccountNumber,
            int departmentId, int seniorityInMonths, DateTime employmentStartDate, bool isActive, bool passwordReset, DateTime dateOfBirth, double grossSalary, PositionType positionType)
        {
            _firstName = firstName;
            _lastName = lastName;
            _email = email;
            _password = password;
            _accountType = accountType;
            _pesel = pesel;
            _bankAccountNumber = bankAccountNumber;
            _departmentId = departmentId;
            _seniorityInMonths = seniorityInMonths;
            _employmentStartDate = employmentStartDate;
            _isActive = isActive;
            _passwordReset = passwordReset;
            _dateOfBirth = dateOfBirth;
            _grossSalary = grossSalary;
            _positionType = positionType;
        }
        
        public override IModel CreateModel() => new EmployeeModel
        {
            FirstName = _firstName,
            LastName = _lastName,
            Email = _email,
            Password = _password,
            AccountType = _accountType,
            Pesel = _pesel,
            BankAccountNumber = _bankAccountNumber,
            DepartmentId = _departmentId,
            SeniorityInMonths = _seniorityInMonths,
            EmploymentStartDate = _employmentStartDate,
            IsActive = _isActive,
            PasswordReset = _passwordReset,
            DateOfBirth = _dateOfBirth,
            GrossSalary = _grossSalary,
            PositionType = _positionType
        };
    }
}