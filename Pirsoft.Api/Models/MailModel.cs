namespace Pirsoft.Api.Models;

public class MailModel
{
    public string To { get; set;  }
    public string? From { get; }

    public string? DisplayName { get; }
    
    public string Subject { get; }

    public string? ResetCode { get; set; }

    public MailModel(string to, string? resetCode = null, string? from = null, string? displayName = null)
    {
        // Receiver
        To = to;

        // Sender
        From = from;
        DisplayName = displayName;

        // Content
        Subject = "Kod do zresetowania hasła - ważny 24 godziny";
        ResetCode = resetCode;
    }
}