using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models
{
    public class Employee
    {
        private Guid Id 
        { 
           set => Guid.NewGuid();
           get => Id;
        }
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public string Email
        {
            set => Email = ValidateEmail(Email); 
            get => Email;
        }
        public string Password { get; set; }
        public AccountType AccountType { get; set; }
        public string Pesel
        { 
            set => Pesel = ValidatePesel(Pesel); 
            get => Pesel;
        }
        public string BankAccountNumber
        {
            set => BankAccountNumber = ValidateBankAccountNumber(BankAccountNumber); 
            get => BankAccountNumber;
        }
        public int DepartamentId { get; set; }
        public int SeniorityInMonths 
        {
            get => CalculateSeniority();
        }
        public DateTime EmploymentStartDate { get; set; }
        public bool IsActive { get; set; }
        public bool PasswordReset { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double GrossSalary { get; set; }
        public PositionType PositionType { get; set; }


        private string ValidateEmail(string email)
        {
            return "test";
        }

        private string ValidatePesel(string pesel)
        {
            return "test";
        }

        private string ValidateBankAccountNumber(string bankAccount)
        {
            return "test";
        }

        private int CalculateSeniority()
        {
            return 0;
        }
    }   
}