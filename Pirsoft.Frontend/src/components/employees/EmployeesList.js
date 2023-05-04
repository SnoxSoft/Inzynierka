import EmployeeListItem from "./EmployeeListItem";

const EmployeesList = ({values, action, showRequest, teams, positions}) => {

    return <ul>
        {values.map((employee, employeeId) =>
            <EmployeeListItem id={"employees-list-item-" + employeeId} key={"employees-list-item-" + employeeId}
                employee={employee} action={action} showRequest={showRequest} teams={teams} positions={positions}/>)}
    </ul>
}

export default EmployeesList;