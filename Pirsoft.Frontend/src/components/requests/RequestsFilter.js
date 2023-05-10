import TeamsList from "../employees/search/fields/TeamsList";
import Calendar from "../base/Calendar";
import ReusableButton from "../base/ReusableButton";
import React from "react";
import {
    labelFilter,
    requestStatusApprovedLabel, requestStatusCreatedByMeLabel, requestStatusCreatedNotByMeLabel,
    requestStatusDisapprovedLabel, requestStatusWaitingLabel,
    labelTeam
} from "../../GlobalAppConfig";
import FirstNameAndLastName from "../grades/FirstNameAndLastName";

function RequestsFilter({
                            firstNameAndLastName, setFirstNameAndLastName,
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
                <FirstNameAndLastName id={"request-firstname-lastname"}
                                      value={firstNameAndLastName} onChange={setFirstNameAndLastName}/>
            </div>
            <div className={"flex gap-x-2 items-center"}>
                {labelTeam}
                <TeamsList id={"requests-teams-list"} className={""}
                           onChange={setTeam} value={team} teams={teamsList}/>
            </div>
        </div>
        <div className={"flex flex-row items-center justify-evenly"}>
            <div className={"flex flex-row gap-2"}>
                <div className={"flex flex-col place-items-center"}>
                    <label>{requestStatusWaitingLabel}</label>
                    <input type="checkbox" defaultChecked={true} className={"w-6 h-6 accent-workday"}
                           onChange={(e) => setCheckWaiting(e.target.checked)}/>
                </div>
                <div className={"flex flex-col place-items-center"}>
                    <label>{requestStatusApprovedLabel}</label>
                    <input id={"requests-approved"} type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                           onChange={(e) => setCheckApproved(e.target.checked)}/>
                </div>
                <div className={"flex flex-col place-items-center"}>
                    <label>{requestStatusDisapprovedLabel}</label>
                    <input id={"requests-disapproved"} type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                           onChange={(e) => setCheckRefused(e.target.checked)}/>
                </div>
            </div>
            <div className={"flex flex-row gap-2"}>
                <div className={"flex flex-col place-items-center"}>
                    <label>{requestStatusCreatedByMeLabel}</label>
                    <input id={"requests-created-by-me"} type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                           onChange={(e) => setCheckCreatedByCurrent(e.target.checked)}/>
                </div>
                <div className={"flex flex-col place-items-center"}>
                    <label>{requestStatusCreatedNotByMeLabel}</label>
                    <input id={"requests-created-not-by-me"} type="checkbox" defaultChecked={true} className={"w-5 h-5 accent-workday"}
                           onChange={(e) => setCheckNotCreatedByCurrent(e.target.checked)}/>
                </div>
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