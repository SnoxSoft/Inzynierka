import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import EmptyTeamRow from "./EmptyTeamRow";
import EmployeeRow from "./EmployeeRow";

const TeamRow = ({team, row, days, employees, currentMonthDaysOff}) => {

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

    function appendDay(day, row, col, daysOff) {
        let color = 'bg-workday'

        daysOff.forEach((d) => {
            if(day.date === d){
                color = 'bg-absent'
            }
        })

        if(day.weekend !== undefined && day.weekend){
            color = 'bg-weekend'
        }

        return <div
            className={
                "row-start-"+row+" col-start-"+col+" text-workday text-center border-workday border-2 w-7 h-6 hover:cursor-pointer "+color+" rounded-md"}>
            {/*{day.dayOfMonth}*/}
        </div>
    }

    let allTeamsDataLoad = [];

    let colTeam = 2
    days.forEach((day) => {
        allTeamsDataLoad.push(
            <EmptyTeamRow team={team} day={day} row={row} colTeam={colTeam}/>)
        colTeam = colTeam + 1
    });

    employees.forEach((employee) => {
        if(employee.team.toString().toUpperCase() === (team.value+'').toString().toUpperCase()){
            row = row + 1
            allTeamsDataLoad.push(
                <EmployeeRow employee={employee} row={row}/>)

            // szukanie dni wolnych danego pracownika
            let daysOffOfThisEmployee = []
            currentMonthDaysOff.forEach((e) => {
                if(e.employee === employee.id){
                    daysOffOfThisEmployee = e.daysoff
                }
            })

            // dodawanie komponentów dni pracownika
            let col = 2
            days.forEach((day) => {
                //console.log(day)
                allTeamsDataLoad.push(
                    appendDay(day, row, col, daysOffOfThisEmployee)
                )
                col = col + 1
            });
        }
    });

    return (
        <>
            <div key={"team" + team.value}
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