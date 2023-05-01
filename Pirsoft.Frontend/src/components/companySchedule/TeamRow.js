import React, {useEffect, useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import EmptyTeamRow from "./EmptyTeamRow";
import EmployeeRow from "./EmployeeRow";

const TeamRow = ({team, row, days, employees, currentMonthDaysOff, id}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleRight/>);
    const [showHideEmployeesSchedule, setShowHideEmployeesSchedule] =
        useState(false)

    function changeVisibilityForPassword() {
        if (changeVisibilityIcon.type === VscTriangleDown) {
            setChangeVisibilityIcon(<VscTriangleRight key={"team-"+id+"-up"}/>);
        } else {
            setChangeVisibilityIcon(<VscTriangleDown key={"team-"+id+"-down"}/>);
        }
        setShowHideEmployeesSchedule(changeVisibilityIcon.type !== VscTriangleDown)
    }

    function appendDay(day, row, col, daysOff, employeeId, dayId) {
        let color = 'bg-workday'

        daysOff.forEach((d) => {
            if(day.date === d){
                color = 'bg-absent'
            }
        })

        if(day.weekend !== undefined && day.weekend){
            color = 'bg-weekend'
        }

        return <div id={id+"-employee-"+employeeId+"-day-"+dayId}
                    key={id+"-employee-"+employeeId+"-day-"+dayId}
            className={
                "row-start-"+row+" col-start-"+col+" text-workday text-center border-workday border-2 w-6 h-6 "+color+" rounded-md"}>
            {/*{day.dayOfMonth}*/}
        </div>
    }

    let allTeamsDataLoad = [];

    let colTeam = 2
    days.forEach((day, dayId) => {
        allTeamsDataLoad.push(
            <EmptyTeamRow id={id+"-empty-"+dayId} row={row} colTeam={colTeam}/>)
        colTeam = colTeam + 1
    });

    employees.forEach((employee, employeeId) => {
        if(employee.employee_department_id === (team.department_id+'')){
            row = row + 1
            allTeamsDataLoad.push(
                <EmployeeRow id={id+"-employee-"+employeeId} employee={employee} row={row}/>)

            // szukanie dni wolnych danego pracownika
            let daysOffOfThisEmployee = []
            currentMonthDaysOff.forEach((e) => {
                if(e.employee === employee.employee_id){
                    daysOffOfThisEmployee = e.daysoff
                }
            })

            // dodawanie komponentów dni pracownika
            let col = 2
            days.forEach((day, dayId) => {
                //console.log(day)
                allTeamsDataLoad.push(
                    appendDay(day, row, col, daysOffOfThisEmployee, employeeId, dayId)
                )
                col = col + 1
            });
        }
    });

    return (
        <>
            <div id={id} key={id}
                    onClick={() => changeVisibilityForPassword()}
                    className={"hover:cursor-pointer row-start-"+row+" col-start-1 w-max text-workday text-left"}>
                <button>{changeVisibilityIcon}</button>
                {team.department_name}
            </div>
            {showHideEmployeesSchedule ?
                allTeamsDataLoad :
                <></>
            }
        </>
    )

}

export default TeamRow;