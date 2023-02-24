import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {HiArrowLeft} from "react-icons/hi";
import ScheduleListItem from "../components/schedule/ScheduleListItem";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import dayjs from "dayjs";

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
        FunctionForResize("schedule-month", {setWantedHeightForList});
        FunctionForResize("schedule-month-list", {setWantedHeightForList});
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

        setPickedMonth(pickedMonth)
        //console.log(pickedMonth.date)


        //ładowanie dni wolnych / wybranych / nieobecnych
        //monthDays/:id/:yyyy-mm

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
            dayjs(`${pickedYearCurrently}-${pickedMonthCurrently}-01`).daysInMonth()
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

    function appendDay(day, month, today) {
        //m-2 flex self-end place-self-center text-workday
        let color = 'dayoffmonth'

        if(day.isCurrentMonth){
            color = 'workday'
        }

        if(day.weekend !== undefined && day.weekend){
            color = 'weekend'
        }

        if(day.absent !== undefined && day.absent){
            color = 'absent'
        }

        if(day.dayoff !== undefined && day.dayoff){
            color = 'dayoff'
        }

        if(day.sick !== undefined && day.sick){
            color = 'sick'
        }

        let border = ''
        if(day.today){
            border = 'outline-dashed outline-4'
        }

        let style = 'flex flex-row justify-evenly hover:cursor-pointer bg-'+color+' m-2 rounded-md text-black '+border+' flex '

        return <div className={style}>
            {day.dayOfMonth}
        </div>
    }

    function createDaysForCurrentMonth(year, month) {
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
            return {
                date: dayjs(`${year}-${month+1}-${index + 1}`).format("YYYY-MM-DD"),
                dayOfMonth: index + 1,
                isCurrentMonth: true,
                today: today,
                weekend: dateCurrentlyChecked.getDay() === 6 || dateCurrentlyChecked.getDay() === 0 ? true : false
            };
        });
    }

    const getTextWeekday = (pickedDay) => {
        const pickedDayWeekDay = pickedDay.getDay()
        if(pickedDayWeekDay === 0){
            return weekdays[6]
        }
        else {
            return weekdays[pickedDayWeekDay-1]
        }
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

    return(
        <>
        {showHidePickedMonth ?
            <div id={"schedule-month"}
             className={"bg-green-menu rounded-md border-2 border-b-workday"}>
                <div className={"p-4 flex flex-row text-workday justify-between gap-4"}>
                    <button className={"flex flex-row self-center gap-2"} onClick={() => setShowHidePickedMonth(false)}>
                        <div className={"flex flex-row self-center"}><MdOutlineArrowBackIosNew /></div>
                        <div>WSTECZ</div>
                    </button>
                    <div className={"text-workday flex flex-row gap-8"}>
                        <div className={"flex place-self-center"}><MdOutlineArrowBackIosNew size={30}/></div>
                        <div className={"flex place-self-center font-bold 20"}>{pickedMonthText !== undefined ? pickedMonthText.text : ''}</div>
                        <div className={"flex place-self-center"}><MdOutlineArrowForwardIos size={30}/></div>
                    </div>
                    <div><ReusableButton value={"LEGENDA"}
                         onClick={() => console.log("tu bedzie legenda:)")}/></div>
                </div>
                <div id={"schedule-month-list"}
                     className={"grid grid-cols-7 p-2"}
                     style={{ height: wantedHeightsForList } }>
                        {daysOfWeek}
                        {calendarDays}
                </div>
            </div> :
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