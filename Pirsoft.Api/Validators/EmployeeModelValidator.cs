using System.Text.RegularExpressions;

namespace Pirsoft.Api.Validators;

public class EmployeeModelValidator
{
    public bool IsPeselValid(string validatedExpression)
    {
        var regex = new Regex("^[0-9]+$");

        return regex.IsMatch(validatedExpression) && validatedExpression.Length==11;
    }
    
    
}