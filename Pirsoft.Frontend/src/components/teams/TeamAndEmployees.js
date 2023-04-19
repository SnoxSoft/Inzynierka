import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import TeamRow from "./TeamRow";
import EmployeeRow from "./EmployeeRow";

const TeamAndEmployees = ({row, team, employees, id}) => {

    const[employeesVisible, setEmployeesVisible] = useState(false);

    let createTeamsComponent = []

    createTeamsComponent.push(<TeamRow id={id} team={team} row={row}
           setEmployeesVisible={setEmployeesVisible}/>)

    employees.forEach((employee, employeeId) => {
        if(employee.team.toString().toUpperCase() === (team.value+'').toString().toUpperCase()){
            row = row + 1
            createTeamsComponent.push(
                employeesVisible ?
                <EmployeeRow id={id + "-employee-" + employeeId} employee={employee} row={row} team={team.value}/> :
                    <></>
            )

        }
    });

    return createTeamsComponent
}

export default TeamAndEmployees;