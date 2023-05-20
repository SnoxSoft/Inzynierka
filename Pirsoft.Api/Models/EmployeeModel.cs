using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pirsoft.Api.Models;

public class EmployeeModel : IApiModel
{
    [NotMapped]
    public int ApiInternalId { get; set; }

    [Key]
    public int employee_id { get => ApiInternalId; set => ApiInternalId = value; }
    public string first_name { get; set; } = null!;
    public string last_name { get; set; } = null!;
    public string email_address { get; set; } = null!;
    public string password { get; set; } = null!;
    public string pesel { get; set; } = null!;
    public string? bank_account_number { get; set; }
    public string? avatar_file_path { get; set; }
    public int seniority_in_months { get; set; }
    public DateTime employment_start_date { get; set; }
    public byte is_active { get; set; }
    public byte password_reset { get; set; }
    public DateTime birth_date { get; set; }
    public double salary_gross { get; set; }
    public int leave_base_days { get; set; }
    public int leave_demand_days { get; set; }
    public byte leave_is_seniority_threshold { get; set; }
    public int employee_contract_type_id { get; set; }
    public int employee_department_id { get; set; }
    public int employee_seniority_level_id { get; set; }
    public int employee_company_role_id { get; set; }

    public virtual CompanyRoleModel employee_company_role { get; set; } = null!;
    public virtual ContractTypeModel employee_contract_type { get; set; } = null!;
    public virtual DepartmentModel employee_department { get; set; } = null!;
    public virtual SeniorityLevelModel employee_seniority_level { get; set; } = null!;
    public virtual ICollection<AbsenceModel> absences { get; set; } = new List<AbsenceModel>();
    public virtual ICollection<PasswordResetTokenModel> password_reset_tokens { get; set; } = new List<PasswordResetTokenModel>();
    public virtual ICollection<SkillModel> skills { get; } = new List<SkillModel>();
}
