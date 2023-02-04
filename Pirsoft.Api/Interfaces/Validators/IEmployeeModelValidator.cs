namespace Pirsoft.Api.Interfaces.Validators;

public interface IEmployeeModelValidator
{
    public bool IsPeselValid(string validatedExpression);

    public bool IsBankAccountNumberValid(string bankAccountNumber);

    public bool IsEmailAddressValid(string emailAddress);
}