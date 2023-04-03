import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import AbsencesListItem from "../components/absences/AbsencesListItem";
import Request from "./Request";
import FunctionForSortingJson from "../components/base/FunctionForSortingJson";
import {
    headerAbsencesDaysNoPayLeft, headerAbsencesEndOfDaysOff,
    labelFilter, pageNameAbsences,
    requestActionLabel,
    requestDescriptionLabel, requestStatusApprovedLabel, requestStatusDisapprovedLabel,
    requestStatusLabel, requestStatusWaitingLabel,
    serverIp
} from "../GlobalAppConfig";


function Absences(){
    document.title = pageNameAbsences;

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
    const [absencesStatus, setAbsencesStatus] = useState(undefined);
    const [absencesColors, setAbsencesColors] = useState(undefined);
    const [absencesTypes, setAbsencesTypes] = useState(undefined);

    // Załadowanie statusów nieobecnośći
    if(absencesStatus === undefined) {
        fetch(serverIp+"/getAbsencesStatus/")
            .then((response) => {response.json()
                .then((response) => {
                    setAbsencesStatus(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Załadowanie kolorów nieobecności
    if(absencesColors === undefined) {
        fetch(serverIp+"/getAbsencesColors/")
            .then((response) => {response.json()
                .then((response) => {
                    setAbsencesColors(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


    // Załadowanie typów nieobecnośći
    if(absencesTypes === undefined) {
        fetch(serverIp+"/getAbsencesTypes/")
            .then((response) => {response.json()
                .then((response) => {
                    setAbsencesTypes(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Ładowanie nieobecności pracownika, statusów nieobecności oraz nazwa nieobecności
    const [employeeAbsences, setEmployeeAbsences] = useState(Array);

    const fetchingEmployeeAbsences = () => {
        // Na endpoint należy wysłać body z danymi filtrowania
        // checkodrzucone, checkZatwierdzone, checkOczekujace, dateFrom, dateTo
        fetch(serverIp+"/getEmployeeAbsences/"+sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    response.sort(FunctionForSortingJson("from", "descending"))
                    setEmployeeAbsences(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Filtrowanie nieobecności
    const filtrAbsences = () => {
        fetchingEmployeeAbsences()
    }

    if (employeeAbsences[0] === undefined) {
        fetchingEmployeeAbsences()
    }

    // date from date to / type of day off / status
    const [absencesList, setAbsencesList] = useState([]);

    if (employeeAbsences[0] !== undefined && absencesList.length === 0){
        let absencesListLoad = [];

        let row = 1;
        for (const i of employeeAbsences) {
            if (i.from > new Date().toLocaleDateString("sv", options)) {
                absencesListLoad.push(
                    <AbsencesListItem key={row} employeeAbsence={i}
                                      absencesTypes={absencesTypes}
                                      absencesStatus={absencesStatus}
                                      absencesColors={absencesColors}/>
                )
                row++;
            } else {
                absencesListLoad.push(
                    <AbsencesListItem key={row} employeeAbsence={i} old={true}
                                      absencesTypes={absencesTypes}
                                      absencesStatus={absencesStatus}
                                      absencesColors={absencesColors}/>
                )
                row++;
            }
        }
        setAbsencesList(absencesListLoad)
    }

    return(
        <>
        {absencesVisible ?
        <div id={"absences"} className={"every-page-on-scroll flex flex-col text-workday"}
        style={{minWidth: 800}}>
            <div className={"flex p-4 gap-4 text-center flex-col"}>
                <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
                    <div className={"col-start-1 row-start-1 place-self-center"}>
                        {headerAbsencesEndOfDaysOff}: {leaveDays}, {headerAbsencesDaysNoPayLeft}: {onDemandDays}
                    </div>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <ReusableButton value={"Wystaw \nWniosek"} color={"bg-blue-menu"}
                            onClick={() => setAbsencesVisible(false)}/>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"gap-2 flex items-center justify-center"}>
                        <div className={"flex flex-col"}>
                            <label>{requestStatusWaitingLabel}</label>
                            <input type="checkbox" defaultChecked={true}
                                   onChange={(e) => setCheckOczekujace(e.target.checked)}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label>{requestStatusApprovedLabel}</label>
                            <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckZatwierdzone(e.target.checked)}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label>{requestStatusDisapprovedLabel}</label>
                            <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckodrzucone(e.target.checked)}/>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <ReusableButton value={labelFilter} formatting={"h-7 border-2 border-workday"} onClick={() => filtrAbsences()}/>
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