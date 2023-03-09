import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import Select from "react-select";
import {CgClose} from "react-icons/cg";


const Request = ({setAbsencesVisible}) =>{
    document.title = "PIRSOFT: Wniosek";

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
    const leaveDays = 0;

    // method to verify unpaid leave button.
    const checker = (numberOfDaysOff) => {
        if (numberOfDaysOff === 0){
            return true
        }else return false
    };

    const option = [
        { value: checker(leaveDays), label: 'URLOP WYPOCZYNKOWY'},
        { value: (checker(leaveDays) || checker(onDemandDays)), label: 'URLOP NA ZADANIE' }
    ]

    // checkbox state
    const [leaveDaysLeft, setLeaveDaysLeft] = useState(false);

    if (leaveDays === 0 && leaveDaysLeft !== true){
        setLeaveDaysLeft(true);
    }

    // fetching of data for endpoint
    const [approvers, setApprovers] = useState(Array);

    const fetchingApprovers = () => {
        fetch("http://127.0.0.1:3001/getApprovers/"+sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    setApprovers(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
        //reloading days off and demand days endpoint
    }

    if (approvers[0] === undefined) {
        fetchingApprovers()
    }

    const [approversList, setApproversList] = useState([]);

    if (approvers[0] !== undefined && approversList.length === 0){
        let approversListLoad = [];
        for (const i of approvers) {
            approversListLoad.push(
                <div className={"text-black"}>
                    {i.name}, {i.role}
                </div>
            )
        }
        setApproversList(approversListLoad)
    }

    return(
        <div id={"Request"} className="flex grow p-4 gap-8 text-center flex-col bg-blue-menu rounded-md border-2 border-b-workday text-workday">
            <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    WNIOSEK URLOPOWY
                </div>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <ReusableButton value={<CgClose  size={30}/>}
                                        onClick={() => setAbsencesVisible(true)}
                        formatting={""} color={""}/>
                    </div>
            </div>
            <div className={"flex justify-center"}>
                <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
            </div>
            <div className={"flex "}>
                <p className={"basis-1/3 text-end pr-4"}>
                    RODZAJ
                </p>
                <div className={"bg-workday text-black basis-1/3"}>
                    <Select options={option} isOptionDisabled={(option) => option.value} defaultValue={{ value: '', label: 'URLOP WYPOCZYNKOWY'}}
                            className={"h-6"}/>
                </div>
            </div>
            <div className={"flex"}>
                <p className={"basis-1/3 text-end pr-4"}>
                    URLOP BEZPŁATNY
                </p>
                <input type={"checkbox"} className={"h-5 w-5 checked:decoration-workday"} checked={leaveDaysLeft} disabled={true}/>
            </div>
            <div id={"schedule-list"} className={"flex"}>
                <p className={"text-end basis-1/3 pr-4"}>
                    ZATWIERDZA
                </p>
                <div className={"flex flex-col basis-4/12 justify-start bg-workday rounded-md gap-1"}>
                    {approversList}
                </div>
            </div>
            <div className={"overflow-y-auto flex justify-evenly"} style={{ height: wantedHeightsForList}}>
                <ReusableButton value={"ZATWIERDZ"} onClick={() => setAbsencesVisible(true)}/>
            </div>
        </div>
    )
}
export default Request;