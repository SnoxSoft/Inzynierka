import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {HiArrowLeft} from "react-icons/hi";
import ScheduleListItem from "../components/schedule/ScheduleListItem";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import dayjs from "dayjs";

function Schedule(){
    document.title = "PIRSOFT: Harmonogram osobisty";

    //ładowanie dni wolnych / wybranych / nieobecnych
    let daysOff = [Object]
    fetch("http://127.0.0.1:3001/monthDays/"+sessionStorage.getItem('USER'))
        .then((response) => {response.json()
            .then((response) => {
                daysOff = response
            });
        })
        .catch((err) => {
            console.log(err.message);
        })

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
        FunctionForResize("schedule-month-list", {setWantedHeightForList});

    }, []);



    const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];
    const filtrSchedule = () => {
        const dateFrom = new Date(from);
        const dateTo = new Date(to);

        const diff =
            dateTo.getMonth() -
            dateFrom.getMonth() +
            12 * (dateTo.getFullYear() - dateFrom.getFullYear())+1

        let localList = []
        for (let i = diff - 1; i >= 0; i--) {
            const newDateFrom = new Date(from);
            const newDate = new Date(newDateFrom.setMonth(newDateFrom.getMonth()+i))//.toLocaleDateString("sv", options);
            localList.push(
                {
                    text: monthNames[ newDate.getMonth()].toUpperCase()+" "+newDate.getFullYear(),
                    date: newDate.toLocaleDateString("sv", options)
                });
        }
        setMonthList(localList)

    }

    const[showHidePickedMonth, setShowHidePickedMonth] = useState(false);

    // funkcje dla wyswietlania calego wybranego miesiaca

    //const [pickedMonth, setPickedMonth] = useState({text: '', date: ''})//{text: 'luty 2023', date: '2023-02'})

    const [daysOfWeek, setDaysOfWeek] = useState([])
    const [calendarDays, setCalendarDays] = useState([])
    const weekdays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

    const [pickedMonthText, setPickedMonth] = useState('')


    const loadWholeMonthData = (pickedMonth) => {
console.clear()
        setPickedMonth(pickedMonth)
        //console.log(pickedMonth.date)

        const options2 = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        }

        const pickedMonthCurrently = parseInt(pickedMonth.date.substring(5,7))-1
        const pickedYearCurrently = parseInt(pickedMonth.date.substring(0,4))
        const pickedMonthDate = new Date(pickedYearCurrently, pickedMonthCurrently,1)

        let currentMonthDays =[];
        let previousMonthDays = [];
        let nextMonthDays = []

        let daysOfWeekLoad = []

        weekdays.forEach((weekday) => {
            daysOfWeekLoad.push(
                <div className={"m-2 flex self-end place-self-center text-workday"}>
                    {weekday.toString().toUpperCase()}
                </div>);
        });
        setDaysOfWeek(daysOfWeekLoad)

        const firstDayOfCurrentMonth = new Date(pickedYearCurrently, pickedMonthCurrently, 1)
        const lastDayOfCurrentMonth = new Date(pickedYearCurrently, pickedMonthCurrently+1, 0)

        currentMonthDays = createDaysForCurrentMonth(
            pickedYearCurrently,
            pickedMonthCurrently,
            daysOff
        );

        previousMonthDays = createDaysForPreviousMonth(firstDayOfCurrentMonth);

        nextMonthDays = createDaysForNextMonth(lastDayOfCurrentMonth);

        const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
        //console.log(days)

        let calendarDaysLoad = []

        days.forEach((day) => {
            calendarDaysLoad.push(appendDay(day));
        });

        setCalendarDays(calendarDaysLoad)
        setShowHidePickedMonth(true)
    }

    function appendDay(day) {
        //m-2 flex self-end place-self-center text-workday
        let color = 'bg-dayoffmonth'

        if(day.isCurrentMonth){
            color = 'bg-workday'
        }

        if(day.weekend !== undefined && day.weekend){
            color = 'bg-weekend'
        }

        if(day.reason !== undefined){
            //console.log(day.reason)
            if(day.reason === 'absent'){
                color = 'bg-absent'
            }
            if(day.reason === 'dayoff'){
                color = 'bg-dayoff'
            }
            if(day.reason === 'sick'){
                color = 'bg-sick'
            }
        }

        let border = ''
        if(day.today){
            border = 'outline-dashed outline-4'
        }

        //console.log(color)

        return <div className={'flex flex-row justify-evenly border-workday border-2 hover:cursor-pointer '+color+' m-2 rounded-md text-black '+border+' '}>
            {day.dayOfMonth}
        </div>
    }

    function createDaysForCurrentMonth(year, month, daysOff) {
        let today = false
        return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
            const dateToday = new Date()
            const dateCurrentlyChecked = new Date(year, month, index + 1)
            if(year === dateToday.getFullYear() &&
                month === dateToday.getMonth() &&
                index + 1 === dateToday.getDate()){
                today = true
            }
            else {today = false}
            let reason = 'noReason'
            for(let i = 0; i < daysOff.length; i++){
                const offDayFound = new Date(daysOff[i].date)
                if(year === offDayFound.getFullYear() &&
                    month === offDayFound.getMonth() &&
                    index + 1 === offDayFound.getDate()){
                    reason = daysOff[i].reason
                    //console.log(daysOff[i])
                }

            }
            return {
                date: dayjs(`${year}-${month+1}-${index + 1}`).format("YYYY-MM-DD"),
                dayOfMonth: index + 1,
                isCurrentMonth: true,
                today: today,
                weekend: dateCurrentlyChecked.getDay() === 6 || dateCurrentlyChecked.getDay() === 0 ? true : false,
                reason: reason
            };
        });
    }

    function createDaysForPreviousMonth(firstDayOfCurrentMonth) {
        const startingWeekDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()

        let visibleNumberOfDaysFromPreviousMonth = 0

        if(startingWeekDayOfCurrentMonth === 1){
            visibleNumberOfDaysFromPreviousMonth = 0
        }
        else if(startingWeekDayOfCurrentMonth === 0){
            visibleNumberOfDaysFromPreviousMonth = 6
        }
        else {
            visibleNumberOfDaysFromPreviousMonth = startingWeekDayOfCurrentMonth - 1
        }

        if(visibleNumberOfDaysFromPreviousMonth !== 0 && visibleNumberOfDaysFromPreviousMonth > 0) {
            let previousMonth = new Date(
                firstDayOfCurrentMonth.getFullYear(),
                firstDayOfCurrentMonth.getMonth(), 0);

            const previousMonthMinusVisibleDays = new Date(
                previousMonth.getFullYear(),
                previousMonth.getMonth(),
                previousMonth.getDate() - visibleNumberOfDaysFromPreviousMonth + 1)
            let today = false
            //console.log(visibleNumberOfDaysFromPreviousMonth)
            return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
                const dateToday = new Date()
                const dateHereNow = new Date(
                    previousMonthMinusVisibleDays.getFullYear(),
                    previousMonthMinusVisibleDays.getMonth(),
                    previousMonthMinusVisibleDays.getDate() + index)

                if(dateHereNow.getFullYear() === dateToday.getFullYear() &&
                    dateHereNow.getMonth() === dateToday.getMonth() &&
                    dateHereNow.getDate() === dateToday.getDate()){
                    today = true
                }
                else {today = false}
                return {
                    date: dayjs(
                        `${previousMonthMinusVisibleDays.getFullYear()}-${previousMonthMinusVisibleDays.getMonth() + 1}-${
                            previousMonthMinusVisibleDays.getDate() + index
                        }`
                    ).format("YYYY-MM-DD"),
                    dayOfMonth: previousMonthMinusVisibleDays.getDate() + index,
                    isCurrentMonth: false,
                    today: today
                };
            });
        }
        else {
            return []
        }
    }

    function createDaysForNextMonth(lastDayOfCurrentMonth) {
        const endingWeekDayOfCurrentMonth = lastDayOfCurrentMonth.getDay()

        let visibleNumberOfDaysFromNextMonth = 0

        if(endingWeekDayOfCurrentMonth === 1){
            visibleNumberOfDaysFromNextMonth = 6
        }
        else if(endingWeekDayOfCurrentMonth === 0){
            visibleNumberOfDaysFromNextMonth = 0
        }
        else {
            visibleNumberOfDaysFromNextMonth = 7 - endingWeekDayOfCurrentMonth
        }

        if(visibleNumberOfDaysFromNextMonth !== 0 && visibleNumberOfDaysFromNextMonth > 0) {
            const nextMonth = new Date(
                lastDayOfCurrentMonth.getFullYear(),
                lastDayOfCurrentMonth.getMonth()+1, 1);
            let today = false
            return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {

                const dateToday = new Date()
                const dateHereNow = new Date(
                    nextMonth.getFullYear(),
                    nextMonth.getMonth(),
                    nextMonth.getDate() + index)

                if(dateHereNow.getFullYear() === dateToday.getFullYear() &&
                    dateHereNow.getMonth() === dateToday.getMonth() &&
                    dateHereNow.getDate() === dateToday.getDate()){
                    today = true
                }
                else {today = false}

                return {
                    date: dayjs(
                        `${nextMonth.getFullYear()}-${nextMonth.getMonth() + 1}-${
                            nextMonth.getDate() + index
                        }`
                    ).format("YYYY-MM-DD"),
                    dayOfMonth: nextMonth.getDate() + index,
                    isCurrentMonth: false,
                    today: today
                };
            });
        }
        else {
            return []
        }
    }

    function getNumberOfDaysInMonth(year, month) {
        return dayjs(`${year}-${month+1}-01`).daysInMonth();
    }

    // to switch between months
    const [showingAlert, setShowingAlert] = useState(false)
    const changeMonth = (mode) => {

        const pickedMonthTextDate = new Date(pickedMonthText.date)

        if(mode === 'previous'){
            const pickedMonthTextDateMinusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth(),
                0)

            if(pickedMonthTextDateMinusOne.toLocaleDateString("sv", options) < dateStart){
                setShowingAlert(true);
                setTimeout(() => {setShowingAlert(false)}, 3000);
            }
            else {
                loadWholeMonthData({
                    text: monthNames[pickedMonthTextDateMinusOne.getMonth()].toUpperCase()+" "
                        +pickedMonthTextDateMinusOne.getFullYear(),
                    date: pickedMonthTextDateMinusOne.toLocaleDateString("sv", options)})
            }
        }

        if(mode === 'next'){
            const pickedMonthTextDatePlusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth()+1,
                1)

            if(pickedMonthTextDatePlusOne.toLocaleDateString("sv", options) > dateToday){
                setShowingAlert(true);
                setTimeout(() => {setShowingAlert(false)}, 3000);
            }
            else {
                loadWholeMonthData({
                    text: monthNames[pickedMonthTextDatePlusOne.getMonth()].toUpperCase()+" "
                        +pickedMonthTextDatePlusOne.getFullYear(),
                    date: pickedMonthTextDatePlusOne.toLocaleDateString("sv", options)})
            }
        }
    }

    useEffect(() => {
        FunctionForResize("schedule-month-list", {setWantedHeightForList});

    }, [pickedMonthText]);

    return(
        <>
        {showHidePickedMonth ?
            <div id={"schedule-month"}
             className={"every-page-on-scroll overflow-y-hidden"}
            style={{minWidth: 800}}>
                <div className={"p-4 flex flex-row text-workday justify-between gap-4"}>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <div>
                            <button className={"flex bg-d flex-row self-center gap-2"} onClick={() => setShowHidePickedMonth(false)}>
                                <div className={"flex flex-row self-center"}><MdOutlineArrowBackIosNew /></div>
                                <div>WSTECZ</div>
                            </button>
                        </div>
                    </div>
                    <div className={"col-start-1 row-start-1 place-self-center"}>
                        <div className={"text-workday flex flex-row gap-8"}>
                            <div className={"flex place-self-center hover:cursor-pointer"}
                                 onClick={() => changeMonth("previous")}>
                                <MdOutlineArrowBackIosNew size={30}/></div>
                            <div className={"flex font-bold 20 w-40 place-content-center"}>
                                {pickedMonthText !== undefined ? pickedMonthText.text : ''}
                            </div>
                            <div className={"flex place-self-center hover:cursor-pointer"}
                                 onClick={() => changeMonth("next")}>
                                <MdOutlineArrowForwardIos size={30}/>
                            </div>
                        </div>
                    </div>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <div>
                            <ReusableButton value={"LEGENDA"}
                                            onClick={() => console.log("tu bedzie legenda:)")}/>
                        </div>
                    </div>
                </div>

                <div className={"text-workday text-center"}>
                    {showingAlert ? 'Nie możesz przejść poza zakres' : ' ... '}
                </div>
                <div id={"schedule-month-list"}
                     className={"grid grid-cols-7 overflow-y-auto"}
                     style={{ height: wantedHeightsForList } }>
                        {daysOfWeek}
                        {calendarDays}
                </div>
            </div> :
            <div id={"schedule"}
                 className={"every-page-on-scroll overflow-y-hidden"}
            style={{minWidth: 800}}>
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
                <hr/>
                <div id={"schedule-list"} className={"rounded-md overflow-y-auto h-full"}>
                    <ul>
                        {monthList.map((p) =>
                            <ScheduleListItem key={p.value} text={p.text} date={p.date}
                                              loadWholeMonthData={loadWholeMonthData}/>
                        )}
                    </ul>
                </div>
            </div>
        }
        </>
    )
}

export default Schedule;