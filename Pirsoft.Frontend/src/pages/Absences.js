import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";


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
    const [checkUdrzucone, setCheckUdrzucone] = useState(true);

    //order sorting function for absences (future to past)
    function getSortOrder(prop) {
        return function(a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    // fetching of data for endpoint
    const [employeeAbsences, setEmployeeAbsences] = useState(Array);
    const fetchingEmployeeAbsences = () => {
        console.log(checkUdrzucone, checkZatwierdzone, checkOczekujace, dateFrom, dateTo)
        fetch("http://127.0.0.1:3001/getEmployeeAbsences/"+sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    console.log(response)
                    response.sort(getSortOrder("from"))
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
    const [deleteAbsence,setDeleteAbsence] = useState([]);

    if (employeeAbsences[0] !== undefined && absencesList.length === 0){
        let absencesListLoad = [];
        let row = 1;
        for (const i of employeeAbsences) {
            if (i.from > new Date().toLocaleDateString("sv", options)) {
                absencesListLoad.push(
                    <div className={"grid grid-cols-2 text-start m-2 items-center h-12"} key={row}>
                        <div>W terminie {i.from} - {i.to}. Type: {i.type}.</div>
                        <div className={"grid grid-cols-3 items-center"}> Status: {i.state}.<ReusableButton value={"Usun"} onClick={deleteAbsence}/></div>
                    </div>
                )
                row++;
            } else {
                absencesListLoad.push(
                    <div className={"grid grid-cols-2 text-start m-2 text-weekend items-center h-12"} key={row}>
                        <div>W terminie {i.from} - {i.to}. Type: {i.type}.</div>
                        <div className={"grid grid-cols-3 items-center"}> Status: {i.state}.</div>
                    </div>
                )
                row++;
            }
        }
        setAbsencesList(absencesListLoad)
    }

    return(
        <div id={"absences"} className="flex bg-green-menu rounded-md border-2 border-b-workday text-workday">
            <div className={"grow p-4"}>
                <div className={"flex flex-col text-workday text-center gap-4 "}>
                    <div className={"flex items-center justify-between"}>
                        <h1> ZOSTALO DNI URLOPOWYCH: {leaveDays}, TYM NA ZADANIE: {onDemandDays}</h1>
                        <ReusableButton value={"Wystaw \nWniosek"} color={"bg-blue-menu"}/>
                    </div>
                    <div>
                        <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
                    </div>
                    <div className={"flex justify-between"}>
                        <div className={"    gap-2 flex items-center justify-left"}>
                            <input type="checkbox" id="oczekujace" name="oczekujace" value="oczekujace" defaultChecked={true} onChange={(e) => setCheckOczekujace(e.target.checked)}/>
                            <label htmlFor="oczekujace">oczekujace</label>
                            <input type="checkbox" id="zatwierdzone" name="zatwierdzone" value="zatwierdzone" defaultChecked={true} onChange={(e) => setCheckZatwierdzone(e.target.checked)}/>
                            <label htmlFor="zatwierdzone">zatwierdzone</label>
                            <input type="checkbox" id="udrzucone" name="udrzucone" value="udrzucone" defaultChecked={true} onChange={(e) => setCheckUdrzucone(e.target.checked)}/>
                            <label htmlFor="udrzucone">udrzucone</label>
                        </div>
                        <div><ReusableButton value={"FILTRUJ"}
                                                                             onClick={() => filtrAbsences()}
                        /></div>
                    </div>
                    <div id={"schedule-list"} className={"overflow-y-auto"} style={{ height: wantedHeightsForList}} >
                        {absencesList}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Absences;