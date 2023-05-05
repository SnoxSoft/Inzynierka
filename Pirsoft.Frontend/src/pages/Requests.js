import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import RequestsListItem from "../components/requests/RequestsListItem";
import ApprovalOrRejectionRequest from "./ApprovalOrRejectionRequest";
import {
    pageNameRequests,
    requestActionLabel,
    requestDescriptionLabel,
    requestStatusLabel
} from "../GlobalAppConfig";
import RequestsFilter from "../components/requests/RequestsFilter";
import {useNavigate} from "react-router-dom";
import {
    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetEmployeesRequests,
    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes
} from "../DataFetcher";

function Requests(){
    document.title = pageNameRequests;

    const navigate = useNavigate();

    // Opcje dla wyświetlenia daty w formacie tekstowym
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }
    const currentDate = new Date();
    currentDate.setDate(1);
    const previousThreeMonthsDate = new Date(currentDate.getFullYear(),currentDate.getMonth() - 3, currentDate.getDate())
    const futureThreeMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, currentDate.getDate())

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("schedule-list", {setWantedHeightForList});
        FunctionForResize("schedule-month", {setWantedHeightForList});
    }, []);

    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(futureThreeMonthsDate.toLocaleDateString("sv", options));

    // Imie i nazwisko dla filtra
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Zespół do filtrowania
    const[team, setTeam] = useState();

    // Checkboxy fo filtrowania
    const [checkWaiting, setCheckWaiting] = useState(true);
    const [checkApproved, setCheckApproved] = useState(true);
    const [checkRefused, setCheckRefused] = useState(true);
    const [checkCreatedByCurrent, setCheckCreatedByCurrent] = useState(true);
    const [checkNotCreatedByCurrent, setCheckNotCreatedByCurrent] = useState(true)

    // Pokazanie lub schowanie listy wniosków / akceptacji/odrzucenia wniosku
    const [requestsVisible, setRequestsVisible] = useState(true)

    const [requestPickedData, setRequestPickedData] = useState(undefined)

    // Zmienne do ładowania statusów i typów nieobecności
    const [employeeRequests, setEmployeeRequests] = useState(null);
    const [requestsStatus, setRequestsStatus] = useState(null);
    const [absencesTypes, setAbsencesTypes] = useState(null);
    const [teamsList, setTeamsList] = useState(null);

    useEffect(() => {
        // Załadowanie statusów wniosków
        if (requestsStatus === null) {
            setRequestsStatus(null);
            fetchGetRequestsStatuses(navigate)
                .then(requestStatus => setRequestsStatus(requestStatus));
        }

        // Załadowanie typów nieobecności
        if(absencesTypes === null) {
            setAbsencesTypes(null)
            fetchGetAbsencesTypes(navigate)
                .then(absencesTypes => setAbsencesTypes(absencesTypes));
        }

        if(teamsList === null) {
            setTeamsList(null);
            fetchGetAllTeamsAndAddZeroRecordAndSort(navigate)
                .then(teamsList => setTeamsList(teamsList));
        }

        if(employeeRequests === null) {
            filtrRequests()
        }
    })

    // Filtrowanie wniosków
    function filtrRequests(){
        console.log(firstName)
        console.log(lastName)
        console.log(team)

        console.log(checkWaiting)
        console.log(checkApproved)
        console.log(checkRefused)

        console.log(checkCreatedByCurrent)
        console.log(checkNotCreatedByCurrent)

        console.log(dateFrom)
        console.log(dateTo)

        setEmployeeRequests(null)
        fetchGetEmployeesRequests(navigate, sessionStorage.getItem("USER"))
            .then(employeeRequests => setEmployeeRequests(employeeRequests));
    }

    // W tej zmiennej znajduje się cała lista wniosków do wyświetlenia
    const [requestsList, setRequestsList] = useState([]);

    // Tworzenie listy wniosków urlopowych, wnioski już przestarzałe są w szarym kolorze
    if (employeeRequests !== null && requestsList.length === 0){
        let requestsListLoad = [];
        let row = 0;
        for (const i of employeeRequests) {
            requestsListLoad.push(
                <RequestsListItem id={"request-list-item-"+row} employeeRequest={i} key={row} setRequestsVisible={setRequestsVisible}
                                  old={i.from <= new Date().toLocaleDateString("sv", options)}
                                  setRequestPickedData={setRequestPickedData}
                                  requestsTypes={absencesTypes}
                                  requestsStatus={requestsStatus}/>
            )
            row++;
        }
        setRequestsList(requestsListLoad)
    }

    return(
        <>
        {requestsVisible ?
        <div id={"absences"} className={"every-page-on-scroll flex flex-col text-workday"}
            style={{minWidth: 800}}>
            <RequestsFilter
                setFirstName={setFirstName} firstName={firstName}
                setLastName={setLastName} lastName={lastName}
                setTeam={setTeam} team={team}
                teamsList={teamsList}
                setCheckWaiting={setCheckWaiting}
                setCheckApproved={setCheckApproved}
                setCheckRefused={setCheckRefused}
                setCheckCreatedByCurrent={setCheckCreatedByCurrent}
                setCheckNotCreatedByCurrent={setCheckNotCreatedByCurrent}
                dateTo={dateTo} setDateTo={setDateTo} dateFrom={dateFrom} setDateFrom={setDateFrom}
                filtrRequests={filtrRequests}
            />

            <div className={"text-start ml-4 mr-8 items-center h-6 rounded-md flex bg-brown-menu border-2 border-workday text-workday font-bold hover:cursor-default"}>
                <div className={"p-2 flex rounded-md basis-8/12"}>
                    {requestDescriptionLabel}
                </div>
                <div className={"flex basis-1/12 place-content-center rounded-md "}>
                    {requestStatusLabel}
                </div>
                <div className={"flex justify-evenly basis-3/12"}>
                    {requestActionLabel}
                </div>
            </div>
            <div id={"schedule-list"} className={"overflow-y-auto"} style={{ height: wantedHeightsForList}} >
                {requestsList}
            </div>
        </div>
        :
            <ApprovalOrRejectionRequest setRequestsVisible={setRequestsVisible}
                                        requestPickedData={requestPickedData}
                                        requestsTypes={absencesTypes}/>
        }
            </>
    )
}
export default Requests;