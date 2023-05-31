using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class EmployeeCreator : ModelCreatorFactoryBase
    {
        private readonly string _firstName;
        private readonly string _lastName;
        private readonly string _email;
        private readonly string _password;
        private readonly string _pesel;
        private readonly string _bankAccountNumber;
        private readonly string _avatarFilePath;
        private readonly int _departmentId;
        private readonly int _leaveBaseDays;
        private readonly int _leaveDemandDays;
        private readonly int _seniorityInMonths;
        private readonly double _grossSalary;
        private readonly bool _isActive;
        private readonly bool _leaveIsSeniorityThreshold;
        private readonly bool _passwordReset;
        private readonly string _passwordSalt;
        private readonly DateTime _birthDate;
        private readonly DateTime _employmentStartDate;
        private readonly ECompanyRole _companyRole;
        private readonly EContractType _contractType;
        private readonly ESeniorityLevel _seniorityLevel;

        public EmployeeCreator(string firstName, string lastName, string email, string password, string pesel, string bankAccountNumber, string avatarFilePath,
            int departmentId, int leaveBaseDays, int leaveDemandDays, int seniorityInMonths, double grossSalary, bool isActive, bool leaveIsSeniorityThreshold, bool passwordReset, string passwordSalt,
            DateTime birthDate, DateTime employmentStartDate, ECompanyRole companyRole, EContractType contractType, ESeniorityLevel seniorityLevel)
        {
            _firstName = firstName;
            _lastName = lastName;
            _email = email;
            _password = password;
            _pesel = pesel;
            _bankAccountNumber = bankAccountNumber;
            _avatarFilePath = avatarFilePath;
            _departmentId = departmentId;
            _leaveBaseDays = leaveBaseDays;
            _leaveDemandDays = leaveDemandDays;
            _seniorityInMonths = seniorityInMonths;
            _grossSalary = grossSalary;
            _isActive = isActive;
            _leaveIsSeniorityThreshold = leaveIsSeniorityThreshold;
            _passwordReset = passwordReset;
            _birthDate = birthDate;
            _employmentStartDate = employmentStartDate;
            _companyRole = companyRole;
            _contractType = contractType;
            _seniorityLevel = seniorityLevel;
            _passwordSalt = passwordSalt;
        }

        public override IApiModel CreateModel() => new EmployeeModel
        {
            first_name = _firstName,
            last_name = _lastName,
            email_address = _email,
            password = _password,
            pesel = _pesel,
            bank_account_number = _bankAccountNumber,
            avatar_file_path = _avatarFilePath,
            seniority_in_months = _seniorityInMonths,
            leave_base_days = _leaveBaseDays,
            leave_demand_days = _leaveDemandDays,
            salary_gross = _grossSalary,
            is_active = Convert.ToByte(_isActive),
            leave_is_seniority_threshold = Convert.ToByte(_leaveIsSeniorityThreshold),
            password_reset = Convert.ToByte(_passwordReset),
            birth_date = _birthDate,
            employment_start_date = _employmentStartDate,
            employee_department_id = _departmentId,
            employee_company_role_id = (int)_companyRole,
            employee_contract_type_id = (int)_contractType,
            employee_seniority_level_id = (int)_seniorityLevel,
        };
    }
}
