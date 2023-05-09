
import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import {FiSettings} from "react-icons/fi";
import {MdOpenInNew} from "react-icons/md";
import ReusableButton from "../base/ReusableButton";
import EmployeeRow from "./EmployeeRow";

const TeamRow = ({team, row, setEmployeesVisible, id,
                     editOptions = false, isSchedule = false,
                     days, employees, currentMonthDaysOff}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleRight key={"team-"+id+"-down"}/>);
    const [showHideEmployeesSchedule, setShowHideEmployeesSchedule] =
        useState(false)

    function changeVisibilityForPassword() {
        if (changeVisibilityIcon.type === VscTriangleDown) {
            setChangeVisibilityIcon(<VscTriangleRight key={"team-"+id+"-up"}/>);
            if(setEmployeesVisible !== undefined){
                setEmployeesVisible(false)
            }
            else setShowHideEmployeesSchedule(changeVisibilityIcon.type !== VscTriangleDown)

        } else {
            setChangeVisibilityIcon(<VscTriangleDown key={"team-"+id+"-down"}/>);
            if(setEmployeesVisible !== undefined){
                setEmployeesVisible(true)
            }
            else
            setShowHideEmployeesSchedule(changeVisibilityIcon.type !== VscTriangleDown)
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
                        "row-start-"+row+" col-start-"+col+" text-workday text-center border-workday border-2 w-6 h-6 "+color+" rounded-md place-self-center"}>
            {/*{day.dayOfMonth}*/}
        </div>
    }

    let allTeamsDataLoad = [];

    if(isSchedule) {
        console.clear()
        let colTeam = 2
        // days.forEach((day, dayId) => {
        //     // Dodanie pustego wiersza
        //     allTeamsDataLoad.push(
        //         <div id={id} key={id}
        //              className={"row-start-"+row+" col-start-"+colTeam+" text-workday"}>
        //         </div>
        //     )
        //     colTeam = colTeam + 1
        // });

        employees.forEach((employee, employeeId) => {
            if (employee.employee_department_id === team.department_id) {
                row = row + 1
                allTeamsDataLoad.push(
                    <EmployeeRow id={id + "-employee-" + employeeId} employee={employee} row={row}/>)

                // szukanie dni wolnych danego pracownika
                let daysOffOfThisEmployee = []
                currentMonthDaysOff.forEach((e) => {
                    // console.log(e)
                    // console.log(employee.employee_id)
                    if (e.employee === employee.employee_id) {
                        e.daysoff.map((day) => {
                            daysOffOfThisEmployee.push(day)
                        })
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
    }

    const[optionsEditVisible,setOptionsEditVisible] = useState(false)

    return (
        <>
        <div id={id + "-hover"} key={id + "-hover-key"}
                onMouseOver={() => editOptions && setOptionsEditVisible(true)}
                onMouseLeave={() => editOptions && setOptionsEditVisible(false)}
                className={"hover:cursor-pointer row-start-"+row+" col-start-1 text-workday text-left gap-2 flex flex-row"}>
            <div id={id + "-open"} key={id + "-open"} className={"flex flex-row"}
                 onClick={() => changeVisibilityForPassword()}>
                {/*<button>{changeVisibilityIcon}</button>*/}
                <div className={"pl-2"}>{team.department_name}</div>
            </div>

            {optionsEditVisible && editOptions ?
                <>
                    <ReusableButton id={id + "-view-team"} value={<MdOpenInNew/>}
                            formatting={""} color={""}
                            link={"/team-view/"+team.department_id}/>

                    <ReusableButton id={id + "-edit-team"} value={<FiSettings/>}
                            formatting={""} color={""}
                            link={"/team-edit/"+team.department_id}/>
                </> : <></>
            }
        </div>
            {(showHideEmployeesSchedule && !isSchedule) || isSchedule ?
                allTeamsDataLoad :
                <></>
            }
        </>
    )
}

export default TeamRow;