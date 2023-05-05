import EmployeeListItem from "./EmployeeListItem";

const EmployeesList = ({values, action, showRequest, teams, positions, positionLevels}) => {

    return <>
        {values.map((employee, employeeId) =>
            <EmployeeListItem id={"employees-list-item-" + employeeId} key={"employees-list-item-" + employeeId}
                employee={employee} action={action} showRequest={showRequest} teams={teams} positions={positions} positionLevels={positionLevels}/>)}
    </>
}

export default EmployeesList;