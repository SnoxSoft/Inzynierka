import React, {useEffect, useState} from "react";
import FunctionForResize from "../../components/base/FunctionForResize";
import ReusableButton from "../../components/base/ReusableButton";
import TeamAndEmployees from "../../components/teams/TeamAndEmployees";
import {labelCreateTeam, pageNameTeams} from "../../GlobalAppConfig";
import {
    fetchGetAllEmployees,
    fetchGetAllTeamsAndAddZeroRecordAndSort
} from "../../DataFetcher";
import {useNavigate} from "react-router-dom";

function Teams(){
    document.title = pageNameTeams;

    const navigate = useNavigate();

    // Wszystkie zespoly ktore są potrzebne
    const [teamsList, setTeamsList] = useState(null);
    const [employeesList, setEmployeesList] = useState(null);

    useEffect(() => {
        // Ładowanie raz zespołów po załadowaniu okna a nie na bieżąco
        if(teamsList === null) {
            setTeamsList(null);
            fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, false)
                .then(teams => setTeamsList(teams));
        }

        // Pobranie listy wszystkich pracowników
        if (employeesList === null) {
            fetchGetAllEmployees(navigate, true)
                .then(employeesList => setEmployeesList(employeesList));
        }
    })

    // Wartości potrzebne do załadowania danych zespołów
    const [allTeamsAreLoadedInDivs, setAllTeamsAreLoadedInDivs] = useState(false)
    const [allTeams, setAllTeams] = useState([])

    const loadWholeMonthDataForCompany = (today) => {
        setAllTeamsAreLoadedInDivs(false)
        let allTeamsLoad = []

        let row = 2
        teamsList.forEach((team, teamId) => {
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

    if(teamsList && employeesList && allTeams.length === 0 && allTeamsAreLoadedInDivs === false){
        loadWholeMonthDataForCompany()
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
    }, [allTeams]);

    return(
        <>
        {teamsList && allTeamsAreLoadedInDivs ?
            <div
             className={"every-page-on-scroll overflow-y-hidden"}
            style={{minWidth: 800}}>
                <div className={"flex flex-cols justify-end p-4"}>
                    <ReusableButton id={"teamsList-create-team"} value={labelCreateTeam} link={"/team-create"}/>
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