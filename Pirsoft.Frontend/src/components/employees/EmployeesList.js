import EmployeeListItem from "./EmployeeListItem";

const EmployeesList = ({values, action, showRequest}) => {

    return <>
        {values.map((employee, employeeId) =>
            <EmployeeListItem id={"employees-list-item-" + employeeId} key={"employees-list-item-" + employeeId}
                employee={employee} action={action} showRequest={showRequest}/>)}
    </>
}

export default EmployeesList;