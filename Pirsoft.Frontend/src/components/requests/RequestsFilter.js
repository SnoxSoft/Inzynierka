import TeamsList from "../employees/search/fields/TeamsList";
import Calendar from "../absences/Calendar";
import ReusableButton from "../base/ReusableButton";
import React from "react";
import {
    firstnameLabel,
    labelFilter,
    lastnameLabel,
    requestStatusApprovedLabel, requestStatusCreatedByMeLabel, requestStatusCreatedNotByMeLabel,
    requestStatusDisapprovedLabel, requestStatusWaitingLabel,
    labelTeam
} from "../../GlobalAppConfig";

function RequestsFilter({
                            setFirstName, firstName,
                            setLastName, lastName,
                            setTeam, team,
                            teamsList,
                            setCheckWaiting,
                            setCheckApproved,
                            setCheckRefused,
                            setCheckCreatedByCurrent,
                            setCheckNotCreatedByCurrent,
                            dateTo, setDateTo, dateFrom, setDateFrom,
                            filtrRequests
                        }){

    return (
    <div className={"flex flex-col gap-2 p-4"}>
        <div className={"flex justify-evenly items-center flex-wrap gap-2 hover:cursor-default"}>
            <div>
                {firstnameLabel} <input id={"requests-firstname"}
                                        className={"text-black rounded"}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}/>
            </div>
            <div>
                {lastnameLabel} <input id={"requests-lastname"}
                                       className={"text-black rounded"}
                                       onChange={(e) => setLastName(e.target.value)}
                                       value={lastName}/>
            </div>
            <div className={"flex gap-x-2 items-center"}>
                {labelTeam}
                <TeamsList id={"requests-teams-list"} className={""}
                           onChange={setTeam} value={team} teams={teamsList}/>
            </div>
        </div>
        <div className={"flex items-center justify-center gap-4"}>
            <div className={"flex flex-col"}>
                <label>{requestStatusWaitingLabel}</label>
                <input type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckWaiting(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>{requestStatusApprovedLabel}</label>
                <input id={"requests-approved"} type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckApproved(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>{requestStatusDisapprovedLabel}</label>
                <input id={"requests-disapproved"} type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckRefused(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>{requestStatusCreatedByMeLabel}</label>
                <input id={"requests-created-by-me"} type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckCreatedByCurrent(e.target.checked)}/>
            </div>
            <div className={"flex flex-col"}>
                <label>{requestStatusCreatedNotByMeLabel}</label>
                <input id={"requests-created-not-by-me"} type="checkbox" defaultChecked={true}
                       onChange={(e) => setCheckNotCreatedByCurrent(e.target.checked)}/>
            </div>
        </div>
        <div className={"flex justify-center"}>
            <Calendar id={"requests"} setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
        </div>
        <div className={"flex justify-center"}>
            <ReusableButton id={"requests-filter"} value={labelFilter} formatting={"h-7 border-2 border-workday"} onClick={() => filtrRequests()}/>
        </div>
    </div>
    )
}
export default RequestsFilter;