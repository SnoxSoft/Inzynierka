import {useSelector} from "react-redux";
import {selectAll, selectByTeamAndPosition} from "../store/EmployeesListSlice";
import EmployeesList from "../components/employees/EmpolyeesList";
import TeamsList from "../components/employees/search/TeamsList";
import PositionsList from "../components/employees/search/PositionsList";
import FirstnameAndLastname from "../components/employees/search/FirstnameAndLastname";
import {useState} from "react";
import {createSelector} from "@reduxjs/toolkit";
import ReusableButton from "../components/ReusableButton";

function Employees(){

    const[firstnameAndLastname, setFirstnameAndLastname] = useState()
    const[teamsList, setTeamsList] = useState()
    const[positionsList, setPositionsList] = useState()

    const employeesList2 = useSelector(selectAll());

    const[employeesList, setEmployeesList] = useState(employeesList2)

    const findEmployees = (e) => {
        e.preventDefault()

        if(firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0){
            console.log(firstnameAndLastname)
        }

        if(teamsList !== undefined && teamsList.toString().length !== 0){
            console.log(teamsList)
        }

        if(positionsList !== undefined && positionsList.toString().length !== 0){
            console.log(positionsList)
        }

    }

    return(
        <div className={"w-full m-4 bg-green-menu rounded-md border-2 border-b-workday text-workday"}>
                <div className={"p-4 grid grid-cols-4 grid-rows-4 place-items-start"}>
                    <p>Wyszukaj pracownika</p>

                    <p className={"col-start-1"}>Imię i nazwisko: </p>
                    <FirstnameAndLastname className={"col-start-2"} onChange={setFirstnameAndLastname}/>

                    <p className={"col-start-1"}>Zespół: </p>
                    <TeamsList className={"col-start-2"} onChange={setTeamsList}/>

                    <p className={"col-start-1"}>Stanowisko: </p>
                    <PositionsList className={"col-start-2"} onChange={setPositionsList}/>
                    <div className={"col-start-4 row-start-4"}>
                        <ReusableButton value={"SZUKAJ"} onClick={findEmployees}/>
                    </div>
                </div>

            <div className={"h-96 hover:overflow-y-auto overflow-y-hidden"} >

                {employeesList ? <EmployeesList values={[employeesList][0]}/> : <p />}

            </div>

        </div>
    );
}

export default Employees;