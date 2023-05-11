import React, {useState} from "react";
import TeamRow from "./TeamRow";
import EmployeeRow from "./EmployeeRow";

const TeamAndEmployees = ({row, team, employees, id}) => {

    const[employeesVisible, setEmployeesVisible] = useState(false);

    let createTeamsComponent = []

    createTeamsComponent.push(<TeamRow id={id} team={team} row={row}
           setEmployeesVisible={setEmployeesVisible} editOptions={true}/>)

    employees.forEach((employee, employeeId) => {
        if(employee.employee_department_id === team.department_id){
            row = row + 1
            createTeamsComponent.push(
                employeesVisible ?
                <EmployeeRow id={id + "-employee-" + employeeId}
                     employee={employee} row={row}/> :
                    <></>
            )

        }
    });

    return createTeamsComponent
}

export default TeamAndEmployees;