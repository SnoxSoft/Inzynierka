using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Pirsoft.Api.Configurators;
using Pirsoft.Api.Models;
using IMailService = Pirsoft.Api.Security.Interfaces.IMailService;

namespace Pirsoft.Api.Services;

public class MailService : IMailService
{
    private readonly MailConfigurator _settings;

    public MailService(IOptions<MailConfigurator> settings)
    {
        _settings = settings.Value;
    }

    public async Task<bool> SendEmailAsync(MailModel mailModel, CancellationToken ct = default)
    {
        try
        {
            var mail = new MimeMessage();
                
            // Sender
            mail.From.Add(new MailboxAddress(_settings.DisplayName, mailModel.From ?? _settings.From));
            mail.Sender = new MailboxAddress(mailModel.DisplayName ?? _settings.DisplayName, mailModel.From ?? _settings.From);

            // Receiver
            foreach (string mailAddress in mailModel.To)
                mail.To.Add(MailboxAddress.Parse(mailAddress));
                


            // Add Content to Mime Message
            var body = new BodyBuilder();
            mail.Subject = mailModel.Subject;
            body.HtmlBody = mailModel.Body;
            mail.Body = body.ToMessageBody();
                
            using var smtp = new SmtpClient();

            if (_settings.UseSSL)
            {
                await smtp.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.SslOnConnect, ct);
            }
            else if (_settings.UseStartTls)
            {
                await smtp.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.StartTls, ct);
            }
            await smtp.AuthenticateAsync(_settings.UserName, _settings.Password, ct);
            await smtp.SendAsync(mail, ct);
            await smtp.DisconnectAsync(true, ct);

            return true;

        }
        catch (Exception)
        {
            return false;
        }
    }
}