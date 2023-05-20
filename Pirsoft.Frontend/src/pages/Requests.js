import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import {
    accountEmployee,
    accountHR, accountManagement, accountPresident, accountTeamLeader,
    pageNameRequests,
    requestActionLabel,
    requestDescriptionLabel,
    requestStatusLabel
} from "../GlobalAppConfig";
import RequestsFilter from "../components/requests/RequestsFilter";
import {useNavigate} from "react-router-dom";
import {
    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes, fetchGetAllEmployees, fetchGetAllEmployeesBetweenDatesDaysOff
} from "../DataFetcher";
import RequestWindow from "./RequestWindow";
import RequestListItem from "../components/absences/RequestListItem";
import {getLocalStorageKeyWithExpiry} from "../components/jwt/LocalStorage";

function Requests(){
    document.title = pageNameRequests;

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

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

    // Checkboxy fo filtrowania
    const [checkWaiting, setCheckWaiting] = useState(true);
    const [checkApproved, setCheckApproved] = useState(true);
    const [checkRefused, setCheckRefused] = useState(true);
    const [checkCreatedByCurrent, setCheckCreatedByCurrent] = useState(true);
    const [checkNotCreatedByCurrent, setCheckNotCreatedByCurrent] = useState(true)

    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(futureThreeMonthsDate.toLocaleDateString("sv", options));

    // Imie i nazwisko dla filtra
    const [firstNameAndLastName, setFirstNameAndLastName] = useState('')

    // Zespół do filtrowania
    const[team, setTeam] = useState();

    // Pokazanie lub schowanie listy wniosków / akceptacji/odrzucenia wniosku
    const [requestsVisible, setRequestsVisible] = useState(true)

    const [requestPickedData, setRequestPickedData] = useState(undefined)

    // Zmienne do ładowania statusów i typów nieobecności
    const [requestsStatus, setRequestsStatus] = useState(null);
    const [absencesTypes, setAbsencesTypes] = useState(null);
    const [teamsList, setTeamsList] = useState(null);

    // W tej zmiennej znajduje się cała lista wniosków do wyświetlenia
    const [requestsList, setRequestsList] = useState(null);
    const [employeesList, setEmployeesList] = useState(null)

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
            (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR &&
                getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountPresident &&
                getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountTeamLeader)){
            navigate("/")
        }

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

        // Pobranie listy wszystkich pracowników
        if (employeesList === null) {
            fetchGetAllEmployees(navigate)
                .then(employeesList => setEmployeesList(employeesList));
        }

        if(requestsStatus !== null && absencesTypes !== null && teamsList !== null && employeesList !== null && requestsList === null) {
            filtrRequests()
        }
    })

    // Filtrowanie wniosków
    function filtrRequests() {

        setRequestsList([])
        let row = 0;
        fetchGetAllEmployeesBetweenDatesDaysOff(navigate, dateFrom, dateTo)
            .then(employeeRequests => {
                let requestsListLoad = [];
                if (employeeRequests !== undefined) {
                    employeeRequests.map(request => {
                        let addRequest = null

                        // Duza funkcja filtrujaca
                        let currentUserId = getLocalStorageKeyWithExpiry("loggedEmployee") !== null ? getLocalStorageKeyWithExpiry("loggedEmployee").UserId : null;
                        if(currentUserId === null){
                            return;
                        }

                        if (checkWaiting && checkRefused && checkApproved && checkCreatedByCurrent && checkNotCreatedByCurrent) {
                            addRequest = request
                        } else if(checkWaiting && checkRefused && checkApproved &&
                            checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                            currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                            addRequest = request
                        }
                        else if(checkWaiting && checkRefused && checkApproved &&
                            !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                            currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()){
                            addRequest = request
                        }else {
                            // Opcje dla oczekujace
                            if ((checkWaiting && !checkRefused && !checkApproved) && request.absence_status_id === 1 &&
                                checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((checkWaiting && !checkRefused && !checkApproved) && request.absence_status_id === 1 &&
                                !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((checkWaiting && !checkRefused && !checkApproved) && request.absence_status_id === 1 &&
                                checkCreatedByCurrent && checkNotCreatedByCurrent) {
                                addRequest = request
                            }

                            // Opcje dla odrzucone
                            if ((!checkWaiting && checkRefused && !checkApproved) && request.absence_status_id === 2 &&
                                checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((!checkWaiting && checkRefused && !checkApproved) && request.absence_status_id === 2 &&
                                !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((!checkWaiting && checkRefused && !checkApproved) && request.absence_status_id === 2 &&
                                checkCreatedByCurrent && checkNotCreatedByCurrent) {
                                addRequest = request
                            }

                            // Opcje dla zatwierdzone
                            if ((!checkWaiting && !checkRefused && checkApproved) && request.absence_status_id === 3 &&
                                checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((!checkWaiting && !checkRefused && checkApproved) && request.absence_status_id === 3 &&
                                !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((!checkWaiting && !checkRefused && checkApproved) && request.absence_status_id === 3 &&
                                checkCreatedByCurrent && checkNotCreatedByCurrent) {
                                addRequest = request
                            }

                            // Opcje dla oczekujace i odrzucone
                            if ((checkWaiting && checkRefused && !checkApproved) && (request.absence_status_id === 1 || request.absence_status_id === 2) &&
                                checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((checkWaiting && checkRefused && !checkApproved) && (request.absence_status_id === 1 || request.absence_status_id === 2) &&
                                !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((checkWaiting && checkRefused && !checkApproved) && (request.absence_status_id === 1 || request.absence_status_id === 2) &&
                                checkCreatedByCurrent && checkNotCreatedByCurrent) {
                                addRequest = request
                            }

                            // Opcje za odrzucone i zatwierdzone
                            if ((!checkWaiting && checkRefused && checkApproved) && (request.absence_status_id === 2 || request.absence_status_id === 3) &&
                                checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((!checkWaiting && checkRefused && checkApproved) && (request.absence_status_id === 2 || request.absence_status_id === 3) &&
                                !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((!checkWaiting && checkRefused && checkApproved) && (request.absence_status_id === 2 || request.absence_status_id === 3) &&
                                checkCreatedByCurrent && checkNotCreatedByCurrent) {
                                addRequest = request
                            }

                            // Opcje dla zatwierdzone i oczekujace
                            if ((checkWaiting && !checkRefused && checkApproved) && (request.absence_status_id === 3 || request.absence_status_id === 2) &&
                                checkCreatedByCurrent && !checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() === request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((checkWaiting && !checkRefused && checkApproved) && (request.absence_status_id === 3 || request.absence_status_id === 2) &&
                                !checkCreatedByCurrent && checkNotCreatedByCurrent &&
                                currentUserId.toString().trim() !== request.employee_approver_id.toString().trim()) {
                                addRequest = request
                            }
                            if ((checkWaiting && !checkRefused && checkApproved) && (request.absence_status_id === 3 || request.absence_status_id === 1) &&
                                checkCreatedByCurrent && checkNotCreatedByCurrent) {
                                addRequest = request
                            }
                        }

                        // Tutaj ładuje dane pracownika
                        let employeeName = null
                        let employeeTeam = null
                        let employeeRole = null
                        let employeeId = null
                        if(employeesList !== undefined && employeesList !== null) {
                            employeesList.map(employee => {
                                if (request.employee_owner_id === employee.employee_id) {
                                    employeeName = employee.first_name + " " + employee.last_name;
                                    employeeId = employee.employee_id;
                                    employeeRole = employee.employee_company_role.role_name;
                                    teamsList.map(team => {
                                        if (team.department_id === employee.employee_department_id) {
                                            employeeTeam = team
                                        }
                                    })
                                }
                            })
                        }

                        // ostatni etap filtra - szukanie nazwy i zespolu
                        if(addRequest !== null && employeeName !== null && employeeTeam !== null) {
                            // Wybrany tylko zespół
                            if((firstNameAndLastName === undefined || firstNameAndLastName.trim() === "") &&
                                (team !== undefined && team !== 0)){
                                if(employeeTeam.department_id !== team){
                                    addRequest = null
                                }
                            }
                            // Wybrana tylko nazwa pracownika
                            if((firstNameAndLastName !== undefined && firstNameAndLastName.trim() !== "") &&
                                (team === undefined || team === 0)){
                                if(employeeName.includes(firstNameAndLastName)){
                                }
                                else {
                                    addRequest = null
                                }
                            }
                            // Wybrana i nazwa i zespół
                            if((firstNameAndLastName !== undefined && firstNameAndLastName.trim() !== "") &&
                                (team !== undefined && team !== 0)){
                                if(employeeName.includes(firstNameAndLastName) && employeeTeam.department_id === team){

                                }
                                else {
                                    addRequest = null
                                }
                            }

                            if(addRequest !== null &&
                                getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                                ((getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR &&
                                    getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== employeeId.toString()) ||
                                    getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountPresident ||
                                    (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountTeamLeader &&
                                        getLocalStorageKeyWithExpiry("loggedEmployee").Department_name === employeeTeam.department_name &&
                                        employeeRole === accountEmployee &&
                                        getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== employeeId.toString()))
                                ){
                                requestsListLoad.push(
                                    <RequestListItem id={"request-list-item-" + row} employeeAbsence={addRequest}
                                                     key={row}
                                                     setRequestsVisible={setRequestsVisible}
                                                     old={addRequest.absence_start_date <= new Date().toLocaleDateString("sv", options)}
                                                     setRequestPickedData={setRequestPickedData}
                                                     employeeName={employeeName}
                                                     employeeTeam={employeeTeam.department_name}
                                                     employeeRole={employeeRole}
                                                     absencesTypes={absencesTypes}
                                                     requestsStatus={requestsStatus}
                                                     filtrRequests={filtrRequests}
                                                     window={"requests"}/>
                                )
                                row++;
                            }
                        }
                    })
                    setRequestsList(requestsListLoad)
                }
            })
    }

    useEffect(() => {
        if(requestsVisible && employeesList !== null && requestsStatus !== null && absencesTypes !== null) {
            filtrRequests();
        }
    },[requestsVisible])


    return(
        <>
            {requestsVisible ?
            <div id={"absences"} className={"every-page-on-scroll flex flex-col text-workday"}
                style={{minWidth: 800}}>
                <RequestsFilter
                    setFirstNameAndLastName={setFirstNameAndLastName} firstNameAndLastName={firstNameAndLastName}
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
            </div> :
                <RequestWindow setRequestsVisible={setRequestsVisible}
                        requestData={requestPickedData} mode={"approval"}/>
            }
        </>
    )
}
export default Requests;