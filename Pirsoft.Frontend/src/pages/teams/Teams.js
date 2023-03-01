import React, {useEffect, useState} from "react";
import FunctionForResize from "../../components/base/FunctionForResize";
import ReusableButton from "../../components/base/ReusableButton";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import TeamRow from "../../components/teams/TeamRow";
import EmployeeRow from "../../components/teams/EmployeeRow";
import TeamAndEmployees from "../../components/teams/TeamAndEmployees";

function Teams(){
    document.title = "PIRSOFT: Zespoły w firmie";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    //wszystkie zespoly ktore potrzebuje
    const [teams, setTeams] = useState(Object);
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    const [allTeams, setAllTeams] = useState([])

    function GetSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    // ładowanie raz zespołów po załądowaniu okna a nie na bieżąco
    if (teams[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllTeams")
            .then((response) => response.json())
            .then((response) => {
                response.sort(GetSortOrder("value"))
                setTeams(response)
                setTeamsLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [currentMonthDaysOff, setCurrentMonthDaysOff] = useState(Object);
    const [monthDaysOffLoaded, setMonthDaysOffLoaded] = useState(false)

    const [employees, setEmployees] = useState(Object);
    const [employeesLoaded, setEmployeesLoaded] = useState(false)


    // ładowanie wszystkich pracowników
    if (employees[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllEmployees")
            .then((response) => response.json())
            .then((response) => {
                response.sort(GetSortOrder("lastname"))
                setEmployees(response)
                setEmployeesLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [allTeamsAreLoadedInDivs, setAllTeamsAreLoadedInDivs] = useState(false)

    const loadWholeMonthDataForCompany = (today) => {

        //console.clear()
        setAllTeamsAreLoadedInDivs(false)
        setMonthDaysOffLoaded(false)

        let allTeamsLoad = []

        let row = 2
        teams.forEach((team) => {
            // dodanie zespołów
            row = row + 1
            allTeamsLoad.push(<TeamAndEmployees row={row} team={team} employees={employees}/>)

        });

        // ustawianie calego kalendarza i pokazanie go
        setAllTeams(allTeamsLoad)
        setAllTeamsAreLoadedInDivs(true)
    }

    if(teamsLoaded && employeesLoaded && allTeams.length === 0 && allTeamsAreLoadedInDivs === false){
        loadWholeMonthDataForCompany()
    }


    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
    }, [allTeams]);

    return(
        <>
        {teamsLoaded && allTeamsAreLoadedInDivs ?
            <div
             className={"bg-green-menu rounded-md border-2 border-b-workday p-4"}>
                <div className={"flex flex-cols justify-end"}>
                    <ReusableButton value={"DODAJ ZESPÓŁ"} link={"/team-add"}/>
                </div>
                <div id={"schedule-company-list"}
                     style={{ height: wantedHeightsForList } }
                     className={"rounded-md p-4 overflow-y-auto flex flex-col p-2 gap-2"}>
                    {allTeams}
                </div>
            </div>
            :
            <></>
        }
        </>
    )
}

export default Teams;