import TeamsList from "../employees/search/fields/TeamsList";
import Calendar from "../absences/Calendar";
import ReusableButton from "../base/ReusableButton";
import React from "react";

function RequestsFilter({
                            handleNameChange, userName,
                            handleSurnameChange, userSurname,
                            setUserTeam,
                            setCheckOczekujace,
                            setCheckZatwierdzone,
                            setCheckOdrzucone,
                            setCheckCreatedByCurrent,
                            setCheckNotCreatedByCurrent,
                            dateTo, setDateTo, dateFrom, setDateFrom,
                            filtrRequests
                        }){

    return (
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
            <div className={"flex flex-col"}>
                <label>OCZEKUJĄCE</label>
                <input type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckOczekujace(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>ZATWIERDZONE</label>
                <input type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckZatwierdzone(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>ODRZUCONE</label>
                <input type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckOdrzucone(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>WYSTAWIONE PREZE MNIE</label>
                <input type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckCreatedByCurrent(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>NIE WYSTAWIONE PREZE MNIE</label>
                <input type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckNotCreatedByCurrent(e.target.checked)}/>
            </div>
        </div>
        <div className={"flex justify-center"}>
            <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
        </div>
        <div className={"flex justify-center"}>
            <ReusableButton value={"FILTRUJ"} formatting={"h-7 border-2 border-workday"} onClick={() => filtrRequests()}/>
        </div>
    </div>
    )
}
export default RequestsFilter;