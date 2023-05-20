using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models;

public partial class PasswordResetTokenModel : IApiModel
{
    [NotMapped]
    public int ApiInternalId { get; set; }

    [Key]
    public int token_id { get => ApiInternalId; set => ApiInternalId = value; }

    public string email { get; set; } = null!;

    public int reset_code { get; set; }

    public DateTime expiration_time { get; set; }

    public int token_employee_id { get; set; }

    public virtual EmployeeModel token_employee { get; set; } = null!;
}