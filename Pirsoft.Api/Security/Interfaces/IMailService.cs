using Pirsoft.Api.Models;

namespace Pirsoft.Api.Security.Interfaces;

public interface IMailService
{
    Task<bool> SendEmailAsync(MailModel mailModel, CancellationToken ct);
}