import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import EmptyTeamRow from "./EmptyTeamRow";
import EmployeeRow from "./EmployeeRow";

const TeamRow = ({team, row, days, employees, currentMonthDaysOff, id}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleDown/>);
    const [showHideEmployeesSchedule, setShowHideEmployeesSchedule] = useState(false)

    function changeVisibilityForTeamData() {
        if (changeVisibilityIcon.type === VscTriangleDown) {
            setChangeVisibilityIcon(<VscTriangleRight />);
            setShowHideEmployeesSchedule(true);
        } else {
            setChangeVisibilityIcon(<VscTriangleDown />);
            setShowHideEmployeesSchedule(false);
        }
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
                "row-start-"+row+" col-start-"+col+" text-workday text-center border-workday border-2 w-7 h-6 "+color+" rounded-md"}>
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
        if(employee.team.toString().toUpperCase() === (team.value+'').toString().toUpperCase()){
            row = row + 1
            allTeamsDataLoad.push(
                <EmployeeRow id={id+"-employee-"+employeeId} employee={employee} row={row}/>)

            // szukanie dni wolnych danego pracownika
            let daysOffOfThisEmployee = []
            currentMonthDaysOff.forEach((e) => {
                if(e.employee === employee.id){
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
                    onClick={() => changeVisibilityForTeamData()}
                    className={"hover:cursor-pointer row-start-"+row+" col-start-1 w-max text-workday text-left"}>
                <button>{changeVisibilityIcon}</button>
                {team.value}
            </div>
            {showHideEmployeesSchedule ?
                allTeamsDataLoad :
                <></>
            }
        </>
    )

}

export default TeamRow;