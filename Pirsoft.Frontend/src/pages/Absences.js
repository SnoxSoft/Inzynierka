import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import AbsencesListItem from "../components/absences/AbsencesListItem";
import Request from "./Request";
import FunctionForSortingJson from "../components/base/FunctionForSortingJson";
import {
    headerAbsencesDaysNoPayLeft, headerAbsencesEndOfDaysOff,
    labelFilter, labelRequest, pageNameAbsences,
    requestActionLabel,
    requestDescriptionLabel, requestStatusApprovedLabel, requestStatusDisapprovedLabel,
    requestStatusLabel, requestStatusWaitingLabel,
    serverIp
} from "../GlobalAppConfig";
import {
    endpointGetEmployeeAbsences
} from "../EndpointAppConfig";
import {useNavigate} from "react-router-dom";
import {
    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes, fetchGetEmployeesAbsences
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

    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(futureThreeMonthsDate.toLocaleDateString("sv", options));

    // Będe potrzebować tu endpointa do czytania tych wartości
    const onDemandDays = 5;
    const leaveDays = 10;

    // Stany checkboxów
    const [checkOczekujace, setCheckOczekujace] = useState(true);
    const [checkZatwierdzone, setCheckZatwierdzone] = useState(true);
    const [checkodrzucone, setCheckodrzucone] = useState(true);

    // Zmienne do ładowania statusów i typów nieobecności
    const [requestsStatus, setRequestsStatus] = useState(null);
    const [absencesTypes, setAbsencesTypes] = useState(null);

    // Ładowanie nieobecności pracownika, statusów nieobecności oraz nazwa nieobecności
    const [employeeAbsences, setEmployeeAbsences] = useState(null);

    // Filtrowanie nieobecności
    function filtrAbsences(id){
        setEmployeeAbsences(null)
        fetchGetEmployeesAbsences(navigate, id)
            .then(employeeAbsences => setEmployeeAbsences(employeeAbsences));
    }

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

        if(employeeAbsences === null) {
            filtrAbsences()
        }
    })

    // W tej zmiennej znajduje się cała lista wniosków do wyświetlenia
    const [absencesList, setAbsencesList] = useState([]);

    if (employeeAbsences !== null && absencesList.length === 0){
        let absencesListLoad = [];

        let row = 0;
        for (const i of employeeAbsences) {
            absencesListLoad.push(
                <AbsencesListItem id={"absences-list-item-"+row} key={row} employeeAbsence={i}
                                  old={i.from <= new Date().toLocaleDateString("sv", options)}
                                  absencesTypes={absencesTypes}
                                  absencesStatus={requestsStatus}/>
            )
            row++;
        }
        setAbsencesList(absencesListLoad)
    }

    return(
        <>
        {absencesVisible ?
        <div id={"absences"} className={"every-page-on-scroll flex flex-col text-workday hover:cursor-default"}
        style={{minWidth: 800}}>
            <div className={"flex p-4 gap-4 text-center flex-col"}>
                <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
                    <div className={"col-start-1 row-start-1 place-self-center"}>
                        {headerAbsencesEndOfDaysOff}: {leaveDays}, {headerAbsencesDaysNoPayLeft}: {onDemandDays}
                    </div>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <ReusableButton id={"request"} value={labelRequest} color={"bg-blue-menu"}
                            onClick={() => setAbsencesVisible(false)}/>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <Calendar id={"absences"} setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"gap-2 flex items-center justify-center"}>
                        <div className={"flex flex-col"}>
                            <label>{requestStatusWaitingLabel}</label>
                            <input
                                id={"absences-waiting"}
                                type="checkbox" defaultChecked={true}
                               onChange={(e) => setCheckOczekujace(e.target.checked)}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label>{requestStatusApprovedLabel}</label>
                            <input
                                id={"absences-approved"}
                                type="checkbox" defaultChecked={true}
                                onChange={(e) => setCheckZatwierdzone(e.target.checked)}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label>{requestStatusDisapprovedLabel}</label>
                            <input
                                id={"absences-disapproved"}
                                type="checkbox" defaultChecked={true}
                                onChange={(e) => setCheckodrzucone(e.target.checked)}/>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <ReusableButton
                        id={"absences-filter"}
                        value={labelFilter} formatting={"h-7 border-2 border-workday"} onClick={() => filtrAbsences()}/>
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
        <Request setAbsencesVisible={setAbsencesVisible}/>
        }
        </>
    )
}
export default Absences;