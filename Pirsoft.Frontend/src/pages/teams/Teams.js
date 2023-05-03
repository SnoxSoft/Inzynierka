import React, {useEffect, useState} from "react";
import FunctionForResize from "../../components/base/FunctionForResize";
import ReusableButton from "../../components/base/ReusableButton";
import TeamAndEmployees from "../../components/teams/TeamAndEmployees";
import FunctionForSortingJson from "../../components/base/FunctionForSortingJson";
import {labelCreateTeam, pageNameTeams, serverIp, serverIpProd} from "../../GlobalAppConfig";
import {endpointGetAllEmployees, endpointGetAllTeams} from "../../EndpointAppConfig";
import {
    fetchGetAbsencesTypes, fetchGetAllEmployees,
    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetRequestsStatuses
} from "../../DataFetcher";
import {useNavigate} from "react-router-dom";

function Teams(){
    document.title = pageNameTeams;

    const navigate = useNavigate();

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    // Wszystkie zespoly ktore są potrzebne
    const [teams, setTeams] = useState(null);
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    const [allTeams, setAllTeams] = useState([])

    const [employeesList, setEmployeesList] = useState(null);
    const [employeesLoaded, setEmployeesLoaded] = useState(false)

    useEffect(() => {
        // Ładowanie raz zespołów po załadowaniu okna a nie na bieżąco
        if(teams === null) {
            setTeams(null);
            fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, false)
                .then(teams => setTeams(teams));
        }

        // Pobranie listy wszystkich pracowników
        if (employeesList === null) {
            fetchGetAllEmployees(navigate, true)
                .then(employeesList => setEmployeesList(employeesList));
        }
    })

    const [currentMonthDaysOff, setCurrentMonthDaysOff] = useState(Object);
    const [monthDaysOffLoaded, setMonthDaysOffLoaded] = useState(false)

    const [allTeamsAreLoadedInDivs, setAllTeamsAreLoadedInDivs] = useState(false)

    const loadWholeMonthDataForCompany = (today) => {
        setAllTeamsAreLoadedInDivs(false)
        setMonthDaysOffLoaded(false)

        let allTeamsLoad = []

        let row = 2
        teams.forEach((team, teamId) => {
            // Dodanie zespołów
            row = row + 1
            allTeamsLoad.push(
                <TeamAndEmployees id={"team-"+teamId} row={row} team={team} employees={employeesList}/>
            )

        });

        // Ustawianie calego kalendarza i pokazanie go
        setAllTeams(allTeamsLoad)
        setAllTeamsAreLoadedInDivs(true)
    }

    if(teams && employeesList && allTeams.length === 0 && allTeamsAreLoadedInDivs === false){
        loadWholeMonthDataForCompany()
    }

    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
    }, [allTeams]);

    return(
        <>
        {teams && allTeamsAreLoadedInDivs ?
            <div
             className={"every-page-on-scroll overflow-y-hidden"}
            style={{minWidth: 800}}>
                <div className={"flex flex-cols justify-end p-4"}>
                    <ReusableButton id={"teams-create-team"} value={labelCreateTeam} link={"/team-create"}/>
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