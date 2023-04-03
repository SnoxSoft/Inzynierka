using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class EmployeeCreator : ModelCreatorFactoryBase
    {
        private readonly string _firstName;
        private readonly string _lastName;
        private readonly string _email;
        private readonly string _password;
        private readonly ECompanyRole _companyRole;
        private readonly string _pesel;
        private readonly string _bankAccountNumber;
        private readonly int _departmentId;
        private readonly int _seniorityInMonths;
        private readonly DateTime _employmentStartDate;
        private readonly bool _isActive;
        private readonly bool _passwordReset;
        private readonly DateTime _dateOfBirth;
        private readonly double _grossSalary;
        private readonly ESeniorityLevel _seniorityLevel;

        public EmployeeCreator(string firstName, string lastName, string email, string password, ECompanyRole companyRole, string pesel, string bankAccountNumber,
            int departmentId, int seniorityInMonths, DateTime employmentStartDate, bool isActive, bool passwordReset, DateTime dateOfBirth, double grossSalary, ESeniorityLevel seniorityLevel)
        {
            _firstName = firstName;
            _lastName = lastName;
            _email = email;
            _password = password;
            _companyRole = companyRole;
            _pesel = pesel;
            _bankAccountNumber = bankAccountNumber;
            _departmentId = departmentId;
            _seniorityInMonths = seniorityInMonths;
            _employmentStartDate = employmentStartDate;
            _isActive = isActive;
            _passwordReset = passwordReset;
            _dateOfBirth = dateOfBirth;
            _grossSalary = grossSalary;
            _seniorityLevel = seniorityLevel;
        }

        public override IApiModel CreateModel() => new EmployeeModel
        {
            FirstName = _firstName,
            LastName = _lastName,
            Email = _email,
            Password = _password,
            CompanyRole = (CompanyRoleModel)new CompanyRoleCreator(_companyRole).CreateModel(), 
            Pesel = _pesel,
            BankAccountNumber = _bankAccountNumber,
            DepartmentId = _departmentId,
            SeniorityInMonths = _seniorityInMonths,
            EmploymentStartDate = DateOnly.FromDateTime(_employmentStartDate),
            IsActive = Convert.ToSByte(_isActive),
            PasswordReset = Convert.ToSByte(_passwordReset),
            DateOfBirth = DateOnly.FromDateTime(_dateOfBirth),
            GrossSalary = _grossSalary,
            SeniorityLevel = (SeniorityLevelModel)new SeniorityLevelCreator(_seniorityLevel).CreateModel(),
        };
    }
}
