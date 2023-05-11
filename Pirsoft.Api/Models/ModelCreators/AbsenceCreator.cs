using Pirsoft.Api.Enums;

namespace Pirsoft.Api.Models.ModelCreators
{
    public class AbsenceCreator : ModelCreatorFactoryBase
    {
        private readonly DateTime _absenceStartDate;
        private readonly DateTime _absenceEndDate;
        private readonly sbyte _unpaid;
        private readonly int _absenceTypeId;
        private readonly int _employeeApproverId;
        private readonly int _employeeOwnerId;
        private readonly int _absenceStatusId;
        
        public AbsenceCreator(DateTime absenceStartDate, DateTime absenceEndDate, sbyte unpaid, 
            int absenceTypeId, int employeeApproverId, int employeeOwnerId, int absenceStatusId)
        {
            _absenceStartDate = absenceStartDate;
            _absenceEndDate = absenceEndDate;
            _unpaid = unpaid;
            _absenceTypeId = absenceTypeId;
            _employeeApproverId = employeeApproverId;
            _employeeOwnerId = employeeOwnerId;
            _absenceStatusId = absenceStatusId;
        }

        public override IApiModel CreateModel() => new AbsenceModel
        {
            absence_start_date = _absenceStartDate,
            absence_end_date = _absenceEndDate,
            unpaid = Convert.ToSByte(_unpaid),
            absence_type_id = (int)_absenceTypeId,
            employee_approver_id = (int)_employeeApproverId,
            employee_owner_id = (int)_employeeOwnerId,
            absence_status_id = (int)_absenceStatusId
        };
    }
}
