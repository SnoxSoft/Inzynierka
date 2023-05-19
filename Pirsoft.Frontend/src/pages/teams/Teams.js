import React, {useEffect, useState} from "react";
import FunctionForResize from "../../components/base/FunctionForResize";
import ReusableButton from "../../components/base/ReusableButton";
import TeamAndEmployees from "../../components/teams/TeamAndEmployees";
import {accountHR, accountPresident, labelCreateTeam, labelSkillFinder, pageNameTeams} from "../../GlobalAppConfig";
import {
    fetchGetAllEmployees,
    fetchGetAllTeamsAndAddZeroRecordAndSort
} from "../../DataFetcher";
import {useNavigate} from "react-router-dom";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";

function Teams(){
    document.title = pageNameTeams;

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    // Wszystkie zespoly ktore są potrzebne
    const [teams, setTeams] = useState(null);

    const [allTeams, setAllTeams] = useState([])

    // Pobranie wszystkich pracowników
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        // Ładowanie raz zespołów po załadowaniu okna a nie na bieżąco
        if(teams === null) {
            setTeams(null);
            fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, false)
                .then(teams => setTeams(teams));
        }

        // Pobranie listy wszystkich pracowników
        if (employees === null) {
            fetchGetAllEmployees(navigate, true)
                .then(employeesList => setEmployees(employeesList));
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
                <TeamAndEmployees id={"team-"+teamId} row={row} team={team} employees={employees}/>
            )

        });

        // Ustawianie calego kalendarza i pokazanie go
        setAllTeams(allTeamsLoad)
        setAllTeamsAreLoadedInDivs(true)
    }

    if(teams && employees && allTeams.length === 0 && allTeamsAreLoadedInDivs === false){
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
                <div className={"flex flex-cols justify-between p-4"}>
                    <ReusableButton id={"teams-finder-open"} value={labelSkillFinder}
                                    link={getLocalStorageKeyWithExpiry("loggedEmployee") !== null ? "/employee-skill-finder" : ""}
                                    color={"bg-blue-menu"} formatting={"border-2 border-b-workday min-w-min w-32 h-12"}/>
                    {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                        (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR ||
                        getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountPresident) ?
                    <ReusableButton id={"teams-create-team"} value={labelCreateTeam}
                                    link={getLocalStorageKeyWithExpiry("loggedEmployee") !== null ? "/team-create" : ""}
                                    disabled={getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                                        (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR &&
                                            getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountPresident)}/> :
                        <></>
                    }
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