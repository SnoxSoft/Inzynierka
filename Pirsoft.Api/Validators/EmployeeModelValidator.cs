using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Pirsoft.Api.Validators;

public class EmployeeModelValidator : IEmployeeModelValidator
{
    public bool IsPeselValid(string validatedExpression)
    {
        var regex = new Regex("^[0-9]+$");

        return regex.IsMatch(validatedExpression) && validatedExpression.Length==11;
    }

    public bool IsBankAccountNumberValid(string bankAccountNumber)
    {
        var regex = new Regex("^[0-9]+$");

        return regex.IsMatch(bankAccountNumber) && bankAccountNumber.Length==26;
    }
    
    public bool IsEmailAddressValid(string emailAddress)
    {
        try
        {
            var email = new MailAddress(emailAddress);

            return true;
        }
        catch (FormatException)
        {
            return false;
        }
    }
    public bool IsPasswordValid(string password)
    {
        var regex = new Regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{14,}$");

        return regex.IsMatch(password) && password.Length >= 14;
        //14 znakow, 1 znak specjalny, 1 duza litera, 1 mala litera
    }

}

public interface IEmployeeModelValidator
{
    public bool IsPeselValid(string validatedExpression);
    public bool IsBankAccountNumberValid(string bankAccountNumber);
    public bool IsEmailAddressValid(string emailAddress);
}