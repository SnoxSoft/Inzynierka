using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class EmployeeCreator : ModelCreatorFactoryBase
    {
        private readonly string _firstName;
        private readonly string _lastName;
        private readonly string _email;
        private readonly string _password;
        private readonly EAccountType _accountType;
        private readonly string _pesel;
        private readonly string _bankAccountNumber;
        private readonly int _departmentId;
        private readonly int _seniorityInMonths;
        private readonly DateTime _employmentStartDate;
        private readonly bool _isActive;
        private readonly bool _passwordReset;
        private readonly DateTime _dateOfBirth;
        private readonly double _grossSalary;
        private readonly EPositionType _positionType;

        public EmployeeCreator(string firstName, string lastName, string email, string password, EAccountType accountType, string pesel, string bankAccountNumber,
            int departmentId, int seniorityInMonths, DateTime employmentStartDate, bool isActive, bool passwordReset, DateTime dateOfBirth, double grossSalary, EPositionType positionType)
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

        public override IApiModel CreateModel() => new EmployeeModel
        {
            FirstName = _firstName,
            LastName = _lastName,
            Email = _email,
            Password = _password,
            // TODO: Michal - dopisać testy i implementację kreatorów
            //AccountType = _accountType, 
            Pesel = _pesel,
            BankAccountNumber = _bankAccountNumber,
            DepartmentId = _departmentId,
            SeniorityInMonths = _seniorityInMonths,
            EmploymentStartDate = DateOnly.FromDateTime(_employmentStartDate),
            IsActive = Convert.ToSByte(_isActive),
            PasswordReset = Convert.ToSByte(_passwordReset),
            DateOfBirth = DateOnly.FromDateTime(_dateOfBirth),
            GrossSalary = _grossSalary,
            // TODO: Michal - dopisać testy i implementację kreatorów
            //PositionType = _positionType
        };
    }
}