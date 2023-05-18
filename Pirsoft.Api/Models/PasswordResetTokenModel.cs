using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models;

public class PasswordResetTokenModel : IApiModel
{
    [NotMapped]
    public int ApiInternalId { get; set; }
    
    [Key]
    public int token_id { get; set; }
    public string email { get; set; } = null!;
    public string reset_code { get; set; } = null!;
    public DateTime expiration_time { get; set; }
    [ForeignKey("employee_id")]
    public int employee_id { get; set; }
}