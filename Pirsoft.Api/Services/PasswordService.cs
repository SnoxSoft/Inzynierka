namespace Pirsoft.Api.Services;

public class PasswordService
{
    private const int ResetCodeLength = 48;

    public string GenerateResetCode()
    {
        var random = new Random();
        var resetCode = "";

        for (int i = 0; i < ResetCodeLength; i++)
        {
            resetCode += random.Next(0, 9).ToString();
        }

        return resetCode;
    }
}