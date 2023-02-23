import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {HiArrowLeft} from "react-icons/hi";
import ScheduleListItem from "../components/schedule/ScheduleListItem";

function Schedule(){
    document.title = "PIRSOFT: Harmonogram osobisty";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    const options = {
        year: "numeric",
        month: "2-digit",
    }

    const dateToday = new Date().toLocaleDateString("sv", options)
    const dateStart = sessionStorage.getItem('START').substring(0,7)

    const dateTodayMinusThreeMonths = new Date()
    dateTodayMinusThreeMonths.setMonth(dateTodayMinusThreeMonths.getMonth() - 2);
    const dateTodayMinusThreeMonthsFormatted = dateTodayMinusThreeMonths.toLocaleDateString("sv", options)

    const [from, setFrom] = useState(
        dateTodayMinusThreeMonthsFormatted < dateStart ?
        dateStart :
        dateTodayMinusThreeMonthsFormatted);
    const [to, setTo] = useState(dateToday);

    const [monthList, setMonthList] = useState([])

    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("schedule", {setWantedHeightForList});
        FunctionForResize("schedule-list", {setWantedHeightForList});
    }, []);
    const filtrSchedule = () => {
        const dateFrom = new Date(from);
        const dateTo = new Date(to);

        const diff =
            dateTo.getMonth() -
            dateFrom.getMonth() +
            12 * (dateTo.getFullYear() - dateFrom.getFullYear())+1

        const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ];


        let localList = []
        for (let i = 0; i < diff; i++) {
            const newDateFrom = new Date(from);
            const newDate = new Date(newDateFrom.setMonth(newDateFrom.getMonth()+i))//.toLocaleDateString("sv", options);
            localList.push(
                {
                    text: monthNames[ newDate.getMonth()].toUpperCase()+" "+newDate.getFullYear(),
                    value: newDate.toLocaleDateString("sv", options)
                });
        }
        setMonthList(localList)

    }

    const[showHidePickedMonth, setShowHidePickedMonth] = useState(true);

    return(
        <>
        {showHidePickedMonth ?
            <div id={"schedule"}
             className={"bg-green-menu rounded-md border-2 border-b-workday"}>
                <div className={"p-4 flex flex-wrap flex-col text-center text-workday gap-4"}>
                    <p>MIESIĄCE TWOJEJ PRACY</p>
                    <div className={"flex flex-row gap-4 flex-wrap"}>
                        <div className={"flex flex-row gap-4 place-self-center"}>
                            <p className={""}>OD: </p>
                            <input className={"grow border text-left text-black rounded-md h-6 w-52"}
                                id="month-year-from"
                                type="month"
                                name="month"
                                value={from}
                                min={dateStart}
                                max={dateToday}
                                required
                                pattern="[0-9]{4}-[0-9]{2}"
                                onChange={(e) => {
                                    setFrom(e.target.value)
                                    if(e.target.value > to){
                                        setFrom(to)
                                    }
                                }
                            }
                            />
                        </div>

                        <div className={"flex flex-row gap-4 place-self-center"}>
                            <p className={""}>DO: </p>
                            <input className={"grow border text-left text-black rounded-md h-6 w-52"}
                                   id="month-year-to"
                                   type="month"
                                   name="month"
                                   value={to}
                                   min={dateStart}
                                   max={dateToday}
                                   required
                                   pattern="[0-9]{4}-[0-9]{2}"
                                   onChange={(e) => {
                                       setTo(e.target.value)
                                       if(e.target.value < from){
                                           setTo(from)
                                       }
                                   } }
                            />
                        </div>
                        <div className={"grow"}><ReusableButton value={"FILTRUJ"}
                            onClick={() => filtrSchedule()}/></div>
                    </div>
                </div>
                <div id={"schedule-list"} className={"rounded-md overflow-y-auto"}
                     style={{ height: wantedHeightsForList } }>
                    <ul>
                        {monthList.map((p) =>
                            <ScheduleListItem key={p.value} text={p.text} date={p.value} setShowHidePickedMonth={setShowHidePickedMonth}/>
                        )}
                    </ul>
                </div>
            </div> :
            <></>
        }
        </>
    )
}

export default Schedule;