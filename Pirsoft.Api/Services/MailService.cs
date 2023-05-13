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
            // Initialize a new instance of the MimeKit.MimeMessage class
            var mail = new MimeMessage();

            #region Sender / Receiver

            // Sender
            mail.From.Add(new MailboxAddress(_settings.DisplayName, mailModel.From ?? _settings.From));
            mail.Sender = new MailboxAddress(mailModel.DisplayName ?? _settings.DisplayName,
                mailModel.From ?? _settings.From);

            // Receiver
            foreach (string mailAddress in mailModel.To)
                mail.To.Add(MailboxAddress.Parse(mailAddress));

            // Set Reply to if specified in mail data
            if (!string.IsNullOrEmpty(mailModel.ReplyTo))
                mail.ReplyTo.Add(new MailboxAddress(mailModel.ReplyToName, mailModel.ReplyTo));

            // BCC
            // Check if a BCC was supplied in the request
            if (mailModel.Bcc != null)
            {
                // Get only addresses where value is not null or with whitespace. x = value of address
                foreach (string mailAddress in mailModel.Bcc.Where(x => !string.IsNullOrWhiteSpace(x)))
                    mail.Bcc.Add(MailboxAddress.Parse(mailAddress.Trim()));
            }

            // CC
            // Check if a CC address was supplied in the request
            if (mailModel.Cc != null)
            {
                foreach (string mailAddress in mailModel.Cc.Where(x => !string.IsNullOrWhiteSpace(x)))
                    mail.Cc.Add(MailboxAddress.Parse(mailAddress.Trim()));
            }

            #endregion

            #region Content

            // Add Content to Mime Message
            var body = new BodyBuilder();
            mail.Subject = mailModel.Subject;
            body.HtmlBody = mailModel.Body;
            mail.Body = body.ToMessageBody();

            #endregion

            #region Send Mail

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

            #endregion

            return true;

        }
        catch (Exception)
        {
            return false;
        }
    }
}