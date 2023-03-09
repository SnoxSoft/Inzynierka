import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import {useNavigate} from "react-router-dom";
import {CgClose} from "react-icons/cg";


const ApprovalOrRejectionRequest = ({dateFrom, dateTo, name, type, requestId, setRequestsVisible, requestPickedData}) => {
    document.title = "PIRSOFT: Zatwierdzanie wniosku urlopowego";

    console.log(requestPickedData)

    // Handler to call on window resize
    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("schedule-list", {setWantedHeightForList});
        FunctionForResize("schedule-month", {setWantedHeightForList});
    }, []);

    function rejectRequest(){

    }

    function approveRequest(){

    }

    function renameType(type) {
        if(type === 'dayoff'){
            return 'URLOP WYPOCZYNKOWY'
        }
        if(type === 'demand'){
            return 'URLOP NA ŻĄDANIE'
        }

        return type
    }

    return(
        <div id={"ApprovalOrRejectionRequest"} className={"flex grow p-4 gap-2 text-center flex-col bg-blue-menu rounded-md border-2 border-b-workday text-workday"}>
            <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    WNIOSEK URLOPOWY
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={<CgClose  size={30}/>}
                                    onClick={() => setRequestsVisible(true)}
                                    formatting={""} color={""}/>
                </div>
            </div>
            <div>{requestPickedData.name}</div>
            <div className={"flex grow p-4 gap-8 text-center flex-col "}>
                <div className={"flex justify-center"}>
                    <Calendar from={requestPickedData.from} to={requestPickedData.to} disabled={true}/>
                </div>
                <div className={"flex "}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        RODZAJ
                    </p>
                    <div className={"bg-workday text-black basis-1/3 rounded-md"}>
                        {renameType(requestPickedData.type)}
                    </div>
                </div>
                <div className={"flex"}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        URLOP BEZPŁATNY
                    </p>
                    <input type={"checkbox"} className={"h-5 w-5 checked:decoration-workday"} checked={requestPickedData.type} disabled={true}/>
                </div>
            </div>
            <div id={"schedule-list"} className={"flex justify-center gap-x-20"}>
                <div>
                    <ReusableButton value={"ODRZUC"} onClick={() => rejectRequest()}/>
                </div>
                <div className={"overflow-y-auto"} style={{ height: wantedHeightsForList}}>
                    <ReusableButton value={"ZATWIERDZ"} onClick={() => approveRequest()}/>
                </div>
            </div>
        </div>
    )
}
export default ApprovalOrRejectionRequest;