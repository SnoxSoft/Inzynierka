import EmployeeListItem from "./EmployeeListItem";

const EmployeesList = ({values, action, showRequest}) => {

    return <ul>
        {values.map((employee, employeeId) =>
            <EmployeeListItem id={"employees-list-item-" + employeeId} key={employee.id}
                employee={employee} action={action} showRequest={showRequest}/>)}
    </ul>
}

export default EmployeesList;