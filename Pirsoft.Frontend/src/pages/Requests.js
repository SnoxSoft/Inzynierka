import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import TeamsList from "../components/employees/search/fields/TeamsList";
import RequestsListItem from "../components/requests/RequestsListItem";
import ApprovalOrRejectionRequest from "./ApprovalOrRejectionRequest";
import FunctionForSortingJson from "../components/base/FunctionForSortingJson";
import {serverIp} from "../Configure";

function Requests(){
    document.title = "PIRSOFT: WNIOSKI PRACOWNIKOW";

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

    // Zespół do filtrowania
    const[userTeam, setUserTeam] = useState();

    // Checkboxy fo filtrowania
    const [checkOczekujace, setCheckOczekujace] = useState(true);
    const [checkZatwierdzone, setCheckZatwierdzone] = useState(true);
    const [checkOdrzucone, setCheckOdrzucone] = useState(true);
    const [checkCreatedByCurrent, setCheckCreatedByCurrent] = useState(true);
    const [checkNotCreatedByCurrent, setCheckNotCreatedByCurrent] = useState(true)

    // Pokazanie lub schowanie listy wniosków / akceptacji/odrzucenia wniosku
    const [requestsVisible, setRequestsVisible] = useState(true)

    const [requestPickedData, setRequestPickedData] = useState(undefined)

    // Imie i nazwisko dla filtra
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const handleNameChange = event => {
        setUserName(event.target.value);
    };
    const handleSurnameChange = event => {
        setUserSurname(event.target.value);
    };

    // Pobranie listy wniosków
    const [employeeRequests, setEmployeeRequests] = useState(Array);
    const fetchingEmployeesRequests = () => {
        fetch(serverIp+"/getEmployeesRequests/"+sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    response.sort(FunctionForSortingJson("from", "descending"))
                    setEmployeeRequests(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Zmienne do ładowania statusów i typów nieobecności
    const [requestsStatus, setRequestsStatus] = useState(undefined);
    const [requestsColors, setRequestsColors] = useState(undefined);
    const [requestsTypes, setRequestsTypes] = useState(undefined);

    // Załadowanie statusów wniosków
    if(requestsStatus === undefined) {
        fetch(serverIp+"/getRequestsStatus/")
            .then((response) => {response.json()
                .then((response) => {
                    setRequestsStatus(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Załadowanie kolorów nieobecności
    if(requestsColors === undefined) {
        fetch(serverIp+"/getRequestsColors/")
            .then((response) => {response.json()
                .then((response) => {
                    setRequestsColors(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Załadowanie typów nieobecnośći
    if(requestsTypes === undefined) {
        fetch(serverIp+"/getRequestsTypes/")
            .then((response) => {response.json()
                .then((response) => {
                    setRequestsTypes(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Filtrowanie wniosków
    const filtrRequests = () => {
        fetchingEmployeesRequests()
    }
    if (employeeRequests[0] === undefined) {
        fetchingEmployeesRequests()
    }

    // W tej zmiennej znajduje się cała lista wniosków
    const [requestsList, setRequestsList] = useState([]);

    // Tworzenie listy wniosków urlopowych, wnioski już przestarzałe są w szarym kolorze
    if (employeeRequests[0] !== undefined && requestsList.length === 0){
        let requestsListLoad = [];
        let row = 1;
        for (const i of employeeRequests) {
            if (i.from > new Date().toLocaleDateString("sv", options)) {
                requestsListLoad.push(
                    <RequestsListItem employeeRequest={i} key={row} setRequestsVisible={setRequestsVisible}
                                      setRequestPickedData={setRequestPickedData}
                                      requestsTypes={requestsTypes}
                                      requestsStatus={requestsStatus}
                                      requestsColors={requestsColors}/>
                )
                row++;
            } else {
                requestsListLoad.push(
                    <RequestsListItem employeeRequest={i} key={row} old={true}
                                      requestsTypes={requestsTypes}
                                      requestsStatus={requestsStatus}
                                      requestsColors={requestsColors}/>
                )
                row++;
            }
        }
        setRequestsList(requestsListLoad)
    }

    return(
        <>
        {requestsVisible ?
        <div id={"absences"} className={"every-page-on-scroll flex flex-col text-workday"}
            style={{minWidth: 800}}>
            <div className={"flex flex-col gap-2 p-4"}>
                <div className={"flex justify-evenly items-center flex-wrap gap-2"}>
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
                    <ReusableButton value={"FILTRUJ"} formatting={"h-7 border-2 border-workday"} onClick={() => filtrRequests()}/>
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
                {requestsList}
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