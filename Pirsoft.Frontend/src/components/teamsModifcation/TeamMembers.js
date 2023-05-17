import TeamMember from "./TeamMember";
const TeamMembers = ({employeeData, setEmployeeData}) => {
    let showAllEmployees = []

    employeeData.forEach((employee, employeeId) => {
        showAllEmployees.push(<TeamMember id={"team-employee-" + employeeId} value={employee}
          employeeData={employeeData} setEmployeeData={setEmployeeData}/>)
    })

    return (
        <div className={"flex flex-col place-items-center gap-4"}>
            {showAllEmployees}
        </div>
    )
}

export default TeamMembers;