import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/base/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import RequestListItem from "../components/absences/RequestListItem";
import RequestWindow from "./RequestWindow";
import {
    headerAbsencesDaysNoPayLeft, headerAbsencesEndOfDaysOff,
    labelFilter, labelRequest, pageNameAbsences,
    requestActionLabel,
    requestDescriptionLabel, requestStatusApprovedLabel, requestStatusDisapprovedLabel,
    requestStatusLabel, requestStatusWaitingLabel
} from "../GlobalAppConfig";
import {useNavigate} from "react-router-dom";
import {
    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes, fetchGetEmployeeDataById, fetchGetOneEmployeeBetweenDatesDaysOff
} from "../DataFetcher";


function Absences(){
    document.title = pageNameAbsences;

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

    // Pokazywanie/chowanie nieobecności czy wybieranie wniosku
    const [absencesVisible, setAbsencesVisible] = useState(true)

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("schedule-list", {setWantedHeightForList});
        FunctionForResize("schedule-month", {setWantedHeightForList});
    }, []);


    // Stany checkboxów dla filtra
    const [checkWaiting, setCheckWaiting] = useState(true);
    const [checkApproved, setCheckApproved] = useState(true);
    const [checkRefused, setCheckRefused] = useState(true);
    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(futureThreeMonthsDate.toLocaleDateString("sv", options));

    // Zmienne do ładowania statusów i typów nieobecności
    const [requestsStatus, setRequestsStatus] = useState(null);
    const [absencesTypes, setAbsencesTypes] = useState(null);
    const [employee, setEmployee] = useState(null);

    // // Ładowanie nieobecności pracownika, statusów nieobecności oraz nazwa nieobecności
    // const [employeeAbsences, setEmployeeAbsences] = useState(null);

    // W tej zmiennej znajduje się cała lista wniosków do wyświetlenia
    const [absencesList, setAbsencesList] = useState(null);

    useEffect(() => {
        //Załadowanie osobistych wartości dni urlopowych
        if (employee === null) {
            setEmployee(null);
            fetchGetEmployeeDataById(sessionStorage.getItem('USER'), navigate)
                .then(employee => setEmployee(employee));
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

        if(employee !== null && requestsStatus !== null && absencesTypes !== null && absencesList === null){
            filtrAbsences()
        }
    })

    // Filtrowanie nieobecności
    function filtrAbsences(){
        // console.log(checkWaiting)
        // console.log(checkApproved)
        // console.log(checkRefused)
        //
        // console.log(dateFrom)
        // console.log(dateTo)

        //Trzeba wyczyścić listę przed każdym filtrem
        setAbsencesList([])

        fetchGetOneEmployeeBetweenDatesDaysOff(navigate, 2, dateFrom, dateTo)
            .then(employeeAbsences => {

                let absencesListLoad = [];
                let row = 0;

                if(employeeAbsences !== undefined){
                    employeeAbsences.map(absence => {
                        let addAbsence = null
                        if (checkWaiting && checkRefused && checkApproved) {
                            addAbsence = absence
                        } else if ((checkWaiting && !checkRefused && !checkApproved) && absence.absence_status_id === 1) {
                            addAbsence = absence
                        } else if ((!checkWaiting && checkRefused && !checkApproved) && absence.absence_status_id === 2) {
                            addAbsence = absence
                        } else if ((!checkWaiting && !checkRefused && checkApproved) && absence.absence_status_id === 3) {
                            addAbsence = absence
                        } else if ((checkWaiting && checkRefused && !checkApproved) && (absence.absence_status_id === 1 || absence.absence_status_id === 2)) {
                            addAbsence = absence
                        } else if ((!checkWaiting && checkRefused && checkApproved) && (absence.absence_status_id === 2 || absence.absence_status_id === 3)) {
                            addAbsence = absence
                        } else if ((checkWaiting && !checkRefused && checkApproved) && (absence.absence_status_id === 3 || absence.absence_status_id === 2)) {
                            addAbsence = absence
                        }

                        if(addAbsence !== null){
                            if(absence.employee_owner_id.toString().trim() !== sessionStorage.getItem('USER').toString().trim()){
                                addAbsence = null
                            }
                        }

                        if (addAbsence !== null) {
                            absencesListLoad.push(
                                <RequestListItem id={"absences-list-item-" + row} key={row} employeeAbsence={addAbsence}
                                                 old={addAbsence.absence_start_date < new Date().toLocaleDateString("sv", options)}
                                                 absencesTypes={absencesTypes}
                                                 requestsStatus={requestsStatus}
                                                 window={"absences"}/>
                            )
                            row++;
                        }
                    })
                }
                setAbsencesList(absencesListLoad)
            })
    }

    useEffect(() => {
        if(absencesVisible && employee !== null && requestsStatus !== null && absencesTypes !== null) {
            filtrAbsences();
        }
    },[absencesVisible])

    // Ładowanie tych wartości z informacji pracownika
    let demandDays = 0;
    let leaveDays = 0;

    if(employee !== null && employee !== undefined){
        demandDays = employee.leave_demand_days;
        leaveDays = employee.leave_base_days;
    }

    return(
        <>
        {absencesVisible ?
        <div id={"absences"} className={"every-page-on-scroll flex flex-col text-workday hover:cursor-default"}
        style={{minWidth: 800}}>
            <div className={"flex p-4 gap-4 text-center flex-col"}>
                <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
                    <div className={"col-start-1 row-start-1 place-self-center"}>
                        {headerAbsencesEndOfDaysOff}: {leaveDays}, {headerAbsencesDaysNoPayLeft}: {demandDays}
                    </div>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <ReusableButton id={"request"} value={labelRequest} color={"bg-blue-menu"}
                            onClick={() => setAbsencesVisible(false)}/>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <Calendar id={"absences"}
                              setDateTo={setDateTo} setDateFrom={setDateFrom}
                              from={dateFrom} to={dateTo}/>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"gap-2 flex items-center justify-center"}>
                        <div className={"flex flex-col place-items-center"}>
                            <label>{requestStatusWaitingLabel}</label>
                            <input
                                id={"absences-waiting"}
                                type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                               onChange={(e) => setCheckWaiting(e.target.checked)}/>
                        </div>
                        <div className={"flex flex-col place-items-center"}>
                            <label>{requestStatusApprovedLabel}</label>
                            <input
                                id={"absences-approved"}
                                type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                                onChange={(e) => setCheckApproved(e.target.checked)}/>
                        </div>
                        <div className={"flex flex-col place-items-center"}>
                            <label>{requestStatusDisapprovedLabel}</label>
                            <input
                                id={"absences-disapproved"}
                                type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                                onChange={(e) => setCheckRefused(e.target.checked)}/>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <ReusableButton
                        id={"absences-filter"}
                        value={labelFilter} formatting={"h-7 border-2 border-workday"} onClick={async () => {
                        filtrAbsences()
                    }}/>
                </div>
            </div>
            <div className={"text-start ml-4 mr-8 items-center h-6 bg-brown-menu rounded-md flex text-workday border-2 border-workday font-bold"}>
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
            <div id={"schedule-list"} className={"overflow-y-scroll overflow-ellipsis"} style={{ height: wantedHeightsForList}}>
                {absencesList}
            </div>
        </div> :
            <RequestWindow setAbsencesVisible={setAbsencesVisible} requestData={employee}/>
        }
        </>
    )
}
export default Absences;