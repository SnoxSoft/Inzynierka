import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import AbsencesListItem from "../components/absences/AbsencesListItem";


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
    const [checkodrzucone, setCheckodrzucone] = useState(true);

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
        // datas to use: checkodrzucone, checkZatwierdzone, checkOczekujace, dateFrom, dateTo
        fetch("http://127.0.0.1:3001/getEmployeeAbsences/"+sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    //console.log(response)
                    response.sort(getSortOrder("from"))
                    setEmployeeAbsences(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
        //reloading days off and demand days endpoint
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
                    <AbsencesListItem key={row} employeeAbsence={i} />
                )
                row++;
            } else {
                absencesListLoad.push(
                    <AbsencesListItem key={row} employeeAbsence={i} old={true}/>
                )
                row++;
            }
        }
        setAbsencesList(absencesListLoad)
    }

    return(
        <div id={"absences"} className="flex grow p-4 gap-4 text-center flex-col bg-green-menu rounded-md border-2 border-b-workday text-workday">
            <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
                <p className={"col-start-1 row-start-1 place-self-center"}>
                    ZOSTALO DNI URLOPOWYCH: {leaveDays}, TYM NA ŻĄDANIE: {onDemandDays}
                </p>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={"Wystaw \nWniosek"} color={"bg-blue-menu"}/>
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
                <ReusableButton value={"FILTRUJ"} onClick={() => filtrAbsences()}/>
            </div>
            <div id={"schedule-list"} className={"overflow-y-auto"} style={{ height: wantedHeightsForList}}>
                {absencesList}
            </div>
        </div>
    )
}
export default Absences;