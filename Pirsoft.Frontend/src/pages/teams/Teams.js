import React, {useEffect, useState} from "react";
import FunctionForResize from "../../components/base/FunctionForResize";
import ReusableButton from "../../components/base/ReusableButton";
import TeamAndEmployees from "../../components/teams/TeamAndEmployees";
import FunctionForSortingJson from "../../components/base/FunctionForSortingJson";

function Teams(){
    document.title = "PIRSOFT: Zespoły w firmie";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    // Wszystkie zespoly ktore są potrzebne
    const [teams, setTeams] = useState(Object);
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    const [allTeams, setAllTeams] = useState([])


    // Ładowanie raz zespołów po załadowaniu okna a nie na bieżąco
    if (teams[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllTeams")
            .then((response) => response.json())
            .then((response) => {
                response.sort(FunctionForSortingJson("value", "ascending"))
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


    // Ładowanie wszystkich pracowników
    if (employees[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllEmployees")
            .then((response) => response.json())
            .then((response) => {
                response.sort(FunctionForSortingJson("lastname", "ascending"))
                setEmployees(response)
                setEmployeesLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [allTeamsAreLoadedInDivs, setAllTeamsAreLoadedInDivs] = useState(false)

    const loadWholeMonthDataForCompany = (today) => {
        setAllTeamsAreLoadedInDivs(false)
        setMonthDaysOffLoaded(false)

        let allTeamsLoad = []

        let row = 2
        teams.forEach((team) => {
            // Dodanie zespołów
            row = row + 1
            allTeamsLoad.push(<TeamAndEmployees row={row} team={team} employees={employees}/>)

        });

        // Ustawianie calego kalendarza i pokazanie go
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
             className={"every-page-on-scroll overflow-y-hidden"}
            style={{minWidth: 800}}>
                <div className={"flex flex-cols justify-end p-4"}>
                    <ReusableButton value={"DODAJ ZESPÓŁ"} link={"/team-create"}/>
                </div>
                <hr/>
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