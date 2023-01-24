﻿using System.Text.RegularExpressions;

namespace Pirsoft.Api.Validators;

public class EmployeeModelValidator
{
    public static bool IsPeselValid(string validatedExpression)
    {
        var regex = new Regex("^[0-9]+$");

        return regex.IsMatch(validatedExpression) && validatedExpression.Length==11;
    }

    public static bool IsBankAccountNumberValid(string bankAccountNumber)
    {
        var regex = new Regex("^[0-9]+$");

        return regex.IsMatch(bankAccountNumber) && bankAccountNumber.Length==26;
    }
}