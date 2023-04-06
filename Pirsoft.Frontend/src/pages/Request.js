import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import Select from "react-select";
import {CgClose} from "react-icons/cg";
import {
    labelApprove,
    labelRequest,
    labelRequestApprovers,
    labelRequestNoPay,
    labelRequestType, pageNameRequest,
    serverIp
} from "../GlobalAppConfig";
import {endpointGetRequestApprovers} from "../EndpointAppConfig";


const Request = ({setAbsencesVisible}) =>{
    document.title = pageNameRequest;

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

    // Będe potrzebować tu endpointa do czytania tych wartości przy wybraniu wniosku
    const onDemandDays = 5;
    const leaveDays = 0;

    // Metoda do ustawienia bezpłatnego dnia
    const checker = (numberOfDaysOff) => {
        if (numberOfDaysOff === 0){
            return true
        }else return false
    };

    // Pobranie tych danych z endpointu..
    const option = [
        { value: checker(leaveDays), label: 'Urlop wypoczynkowy'},
        { value: (checker(leaveDays) || checker(onDemandDays)), label: 'Urlop na żądanie' }
    ]

    // Zaznaczenie opcji urlop bezpłaty jeśli brak dni urlopowych
    const [leaveDaysLeft, setLeaveDaysLeft] = useState(false);

    if (leaveDays === 0 && leaveDaysLeft !== true){
        setLeaveDaysLeft(true);
    }

    // Pobranie listy osób, które mogą zatwierdzić wniosek
    const [approvers, setApprovers] = useState(Array);

    const fetchingApprovers = () => {
        fetch(serverIp + "/" + endpointGetRequestApprovers + "/" + sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    setApprovers(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
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
        <div id={"Request"}
             className={"every-page-on-scroll flex text-center flex-col bg-blue-menu text-workday p-4 hover:cursor-default"}
             style={{minWidth: 800}}>
            <div className={"grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    {labelRequest}
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={<CgClose  size={30}/>}
                                    onClick={() => setAbsencesVisible(true)}
                    formatting={""} color={""}/>
                </div>
            </div>
            <br/>
            <div className={"flex p-4 gap-8 text-center flex-col"}>
                <div className={"flex justify-center"}>
                    <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
                </div>
                <div className={"flex "}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        {labelRequestType}
                    </p>
                    <div className={"bg-workday text-black basis-1/3"}>
                        <Select options={option} isOptionDisabled={(option) => option.value} defaultValue={{ value: '', label: 'Urlop wypoczynkowy'}}
                                className={"h-6"}/>
                    </div>
                </div>
                <div className={"flex"}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        {labelRequestNoPay}
                    </p>
                    <input type={"checkbox"} className={"h-5 w-5 checked:decoration-workday"} checked={leaveDaysLeft} disabled={true}/>
                </div>
                <div id={"schedule-list"} className={"flex"}>
                    <p className={"text-end basis-1/3 pr-4"}>
                        {labelRequestApprovers}
                    </p>
                    <div className={"flex flex-col basis-4/12 justify-start bg-workday rounded-md gap-1"}>
                        {approversList}
                    </div>
                </div>
            </div>
            <br/>
            <div className={"flex justify-evenly"} style={{ height: wantedHeightsForList}}>
                <ReusableButton value={labelApprove} onClick={() => setAbsencesVisible(true)}/>
            </div>
        </div>
    )
}
export default Request;