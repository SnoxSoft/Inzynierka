﻿namespace Pirsoft.Api.Services;

public class PasswordService : IPasswordService
{
    private const int ResetCodeLength = 8;

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

public interface IPasswordService
{
    string GenerateResetCode();
}