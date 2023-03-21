import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import AbsencesListItem from "../components/absences/AbsencesListItem";
import Request from "./Request";
import FunctionForSortingJson from "../components/base/FunctionForSortingJson";


function Absences(){
    document.title = "PIRSOFT: Moje nieobecnosci";

    // calendar initial date setters and options
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }
    const currentDate = new Date();
    currentDate.setDate(1);
    const previousThreeMonthsDate = new Date(currentDate.getFullYear(),currentDate.getMonth() - 3, currentDate.getDate())
    const futureThreeMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, currentDate.getDate())

    // show/hide absences and take  aday off
    const [absencesVisible, setAbsencesVisible] = useState(true)

    // Handler to call on window resize
    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("schedule-list", {setWantedHeightForList});
        FunctionForResize("schedule-month", {setWantedHeightForList});
    }, []);

    // calendar component get/set
    const [dateFrom, setDateFrom] = useState(previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(futureThreeMonthsDate.toLocaleDateString("sv", options));

    //hard coded value for testing will need to replace with endpoint
    const onDemandDays = 5;
    const leaveDays = 10;

    // checkboxes states
    const [checkOczekujace, setCheckOczekujace] = useState(true);
    const [checkZatwierdzone, setCheckZatwierdzone] = useState(true);
    const [checkodrzucone, setCheckodrzucone] = useState(true);

    // Zmienne do ładowania statusów i typów nieobecności
    const [absencesStatus, setAbsencesStatus] = useState(undefined);
    const [absencesColors, setAbsencesColors] = useState(undefined);
    const [absencesTypes, setAbsencesTypes] = useState(undefined);

    // Załadowanie statusów nieobecnośći
    if(absencesStatus === undefined) {
        fetch("http://127.0.0.1:3001/getAbsencesStatus/")
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
        fetch("http://127.0.0.1:3001/getAbsencesColors/")
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
        fetch("http://127.0.0.1:3001/getAbsencesTypes/")
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
        // datas to use: checkodrzucone, checkZatwierdzone, checkOczekujace, dateFrom, dateTo
        fetch("http://127.0.0.1:3001/getEmployeeAbsences/"+sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    //console.log(response)
                    response.sort(FunctionForSortingJson("from", "descending"))
                    setEmployeeAbsences(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    //filtruj button log
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
                        ZOSTALO DNI URLOPOWYCH: {leaveDays}, TYM NA ŻĄDANIE: {onDemandDays}
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
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckOczekujace(e.target.checked)}/>
                        <label htmlFor="oczekujace">OCZEKUJĄCE</label>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckZatwierdzone(e.target.checked)}/>
                        <label htmlFor="zatwierdzone">ZATWIERDZONE</label>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckodrzucone(e.target.checked)}/>
                        <label htmlFor="odrzucone">ODRZUCONE</label>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <ReusableButton value={"FILTRUJ"} formatting={"h-7 border-2 border-workday"} onClick={() => filtrAbsences()}/>
                </div>
            </div>
            <div className={"text-start ml-4 mr-8 items-center h-6 bg-brown-menu rounded-md flex text-workday border-2 border-workday font-bold"}>
                <div className={"p-2 flex rounded-md basis-8/12"}>
                    OPIS WNIOSKU
                </div>
                <div className={"flex basis-1/12 place-content-center rounded-md "}>
                    STATUS
                </div>
                <div className={"flex justify-evenly basis-3/12"}>
                    AKCJE
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