using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Pirsoft.Api.Services;

public class EmailService
{
    private readonly string _smtpServer;
    private readonly int _smtpPort;
    private readonly string _smtpUsername;
    private readonly string _smtpPassword;

    public EmailService(string smtpServer, int smtpPort, string smtpUsername, string smtpPassword)
    {
        _smtpServer = smtpServer;
        _smtpPort = smtpPort;
        _smtpUsername = smtpUsername;
        _smtpPassword = smtpPassword;
    }

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        var emailMessage = new MimeMessage();

        emailMessage.From.Add(new MailboxAddress("Pirsoft no reply", "your-email@example.com"));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("html") { Text = message };

        using var client = new SmtpClient();

        client.ServerCertificateValidationCallback = (s, c, h, e) => true;

        await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
        await client.SendAsync(emailMessage);
        await client.DisconnectAsync(true);
    }
}