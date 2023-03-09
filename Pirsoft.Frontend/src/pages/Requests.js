import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import TeamsList from "../components/employees/search/fields/TeamsList";
import RequestsListItem from "../components/requests/RequestsListItem";
import ApprovalOrRejectionRequest from "./ApprovalOrRejectionRequest";


function Requests(){
    document.title = "PIRSOFT: WNIOSKI PRACOWNIKOW";

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

    // calendar get/set
    const [dateFrom, setDateFrom] = useState(previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(futureThreeMonthsDate.toLocaleDateString("sv", options));

    // Team data
    const[userTeam, setUserTeam] = useState();

    // checkboxes states
    const [checkOczekujace, setCheckOczekujace] = useState(true);
    const [checkZatwierdzone, setCheckZatwierdzone] = useState(true);
    const [checkOdrzucone, setCheckOdrzucone] = useState(true);
    const [checkCreatedByCurrent, setCheckCreatedByCurrent] = useState(true);
    const [checkNotCreatedByCurrent, setCheckNotCreatedByCurrent] = useState(true)

    // to show or hide request approval/rejection
    const [requestsVisible, setRequestsVisible] = useState(true)

    const [requestPickedData, setRequestPickedData] = useState(undefined)

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

    //name , surname input field computing
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const handleNameChange = event => {
        setUserName(event.target.value);
    };
    const handleSurnameChange = event => {
        setUserSurname(event.target.value);
    };

    // fetching of data for endpoint
    const [employeeAbsences, setEmployeeAbsences] = useState(Array);
    const fetchingEmployeesAbsences = () => {
        console.log(checkOdrzucone, checkZatwierdzone, checkOczekujace, dateFrom, dateTo, checkCreatedByCurrent, checkNotCreatedByCurrent, userName, userSurname, userTeam)
        fetch("http://127.0.0.1:3001/getEmployeesAbsences/"+sessionStorage.getItem("USER"))
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
        fetchingEmployeesAbsences()
    }
    if (employeeAbsences[0] === undefined) {
        fetchingEmployeesAbsences()
    }

    // date from date to / type of day off / status
    const [absencesList, setAbsencesList] = useState([]);
    function deleteAbsence(){
        //endpoint for removing dayoff
        //reloading days off and demand days endpoint
    }

    // Absences of employees list method (future/past days off)
    if (employeeAbsences[0] !== undefined && absencesList.length === 0){
        let absencesListLoad = [];
        let row = 1;
        for (const i of employeeAbsences) {
            if (i.from > new Date().toLocaleDateString("sv", options)) {
                absencesListLoad.push(
                    <RequestsListItem employeeAbsence={i} key={row} setRequestsVisible={setRequestsVisible}
                                      setRequestPickedData={setRequestPickedData}/>
                )
                row++;
            } else {
                absencesListLoad.push(
                    <RequestsListItem employeeAbsence={i} key={row} old={true}/>
                )
                row++;
            }
        }
        setAbsencesList(absencesListLoad)
    }

    return(
        <>
        {requestsVisible ?
        <div id={"absences"} className="bg-green-menu menu rounded-md border-2 border-b-workday text-workday text-center">
            <div className={"flex flex-col gap-4 p-4"}>
                <div className={"flex justify-evenly items-center"}>
                    <div>
                        IMIE <input className={"text-black rounded"} onChange={handleNameChange} value={userName}/>
                    </div>
                    <div>
                        NAZWISKO <input className={"text-black rounded"} onChange={handleSurnameChange} value={userSurname}/>
                    </div>
                    <div className={"flex gap-x-2 items-center"}>
                        ZESPOL
                        <TeamsList className={""} onChange={setUserTeam}/>
                    </div>
                </div>
                <div className={"flex items-center justify-center gap-4"}>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckOczekujace(e.target.checked)}/>
                        <label htmlFor="oczekujace">OCZEKUJĄCE</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckZatwierdzone(e.target.checked)}/>
                        <label htmlFor="zatwierdzone">ZATWIERDZONE</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckOdrzucone(e.target.checked)}/>
                        <label htmlFor="odrzucone">ODRZUCONE</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckCreatedByCurrent(e.target.checked)}/>
                        <label htmlFor="current">WYSTAWIONE PREZE MNIE</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={(e) => setCheckNotCreatedByCurrent(e.target.checked)}/>
                        <label htmlFor="notcurrent">NIE WYSTAWIONE PREZE MNIE</label>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
                </div>
                <div className={"flex justify-center"}>
                    <ReusableButton value={"FILTRUJ"} formatting={"h-7 border-2 border-workday"} onClick={() => filtrAbsences()}/>
                </div>
            </div>

            <div className={"text-start ml-4 mr-8 items-center h-6 rounded-md flex bg-brown-menu border-2 border-workday text-workday font-bold"}>
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
            <div id={"schedule-list"} className={"overflow-y-auto"} style={{ height: wantedHeightsForList}} >
                {absencesList}
            </div>
        </div>
        :
            <ApprovalOrRejectionRequest setRequestsVisible={setRequestsVisible}
                                        requestPickedData={requestPickedData}/>
        }
            </>
    )
}
export default Requests;