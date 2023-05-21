import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import ScheduleListItem from "../components/schedule/ScheduleListItem";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import dayjs from "dayjs";
import {
    absent,
    alertCantGoFurther,
    calendarLabelFrom,
    calendarLabelTo, dayoff, demand, labelBack,
    labelFilter,
    legendLabel, months,
    monthsOfYourWorkLabel, occasional, pageNameSchedule, sick,
    weekdays
} from "../GlobalAppConfig";
import Legend from "../components/legend/Legend";
import {Popup} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {fetchGetAbsencesTypes, fetchGetEmployeeDataById, fetchGetOneEmployeeBetweenDatesDaysOff} from "../DataFetcher";
import {getLocalStorageKeyWithExpiry} from "../components/jwt/LocalStorage";

function Schedule(){
    document.title = pageNameSchedule;

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

    // Ładowanie listy do wybrania miesiąca
    const [monthList, setMonthList] = useState([])
    const [absencesTypes, setAbsencesTypes] = useState(null)
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        // Pobranie szczegółowych danych pracownika
        if(employee === null && getLocalStorageKeyWithExpiry("loggedEmployee") !== null) {
            fetchGetEmployeeDataById(getLocalStorageKeyWithExpiry("loggedEmployee").UserId, navigate)
                .then(employee => {
                    setFrom(
                        dateTodayMinusThreeMonthsFormatted < dateStart ?
                            employee.employment_start_date.toString().substring(0, 7) :
                            dateTodayMinusThreeMonthsFormatted);
                    setEmployee(employee);
                    filtrSchedule()
                        .then(scheduleList => setMonthList(scheduleList))
                });
        }

        if(monthList.length === 0) {
            filtrSchedule()
                .then(scheduleList => setMonthList(scheduleList))
        }

        // Załadowanie typów nieobecności
        if(absencesTypes === null) {
            setAbsencesTypes(null)
            fetchGetAbsencesTypes(navigate)
                .then(absencesTypes => setAbsencesTypes(absencesTypes));
        }
    })

    const options = {
        year: "numeric",
        month: "2-digit",
    }

    const optionsForEndpoint = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }

    const dateToday = new Date().toLocaleDateString("sv", options)
    const dateStart = new Date().toLocaleDateString("sv", options)

    const dateTodayMinusThreeMonths = new Date()
    dateTodayMinusThreeMonths.setMonth(dateTodayMinusThreeMonths.getMonth() - 2);
    const dateTodayMinusThreeMonthsFormatted = dateTodayMinusThreeMonths.toLocaleDateString("sv", options)

    const [from, setFrom] = useState(
        dateTodayMinusThreeMonthsFormatted < dateStart ?
            dateStart :
            dateTodayMinusThreeMonthsFormatted);
    const [to, setTo] = useState(dateToday);

    async function filtrSchedule(){
        const dateFrom = new Date(from);
        const dateTo = new Date(to);

        const diff =
            dateTo.getMonth() -
            dateFrom.getMonth() +
            12 * (dateTo.getFullYear() - dateFrom.getFullYear())+1

        let localList = []
        for (let i = diff - 1; i >= 0; i--) {
            const newDateFrom = new Date(from);
            const newDate = new Date(newDateFrom.setMonth(newDateFrom.getMonth()+i))
            localList.push(
                {
                    text: months[ newDate.getMonth()]+" "+newDate.getFullYear(),
                    date: newDate.toLocaleDateString("sv", options)
                });
        }
        return localList
    }

    // Pokazanie miesiąca abo listy miesięcy
    const[showHidePickedMonth, setShowHidePickedMonth] = useState(false);

    const [daysOfWeek, setDaysOfWeek] = useState([])
    const [calendarDays, setCalendarDays] = useState([])

    // Tekst wyświetlany jaki miesiąc ostał wybrany
    const [pickedMonthText, setPickedMonth] = useState('')

    const loadWholeMonthData = (pickedMonth) => {
        setPickedMonth(pickedMonth)
        setCalendarDays([])

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
                    {weekday.toString()}
                </div>);
        });
        setDaysOfWeek(daysOfWeekLoad)

        const firstDayOfCurrentMonth = new Date(pickedYearCurrently, pickedMonthCurrently, 1)
        const lastDayOfCurrentMonth = new Date(pickedYearCurrently, pickedMonthCurrently+1, 0)

        const firstDayOfMonthForEndpoint = firstDayOfCurrentMonth.toLocaleDateString("sv", optionsForEndpoint)
        const lastDayOfMonthForEndpoint = lastDayOfCurrentMonth.toLocaleDateString("sv", optionsForEndpoint)

        // Ładowanie dni wolnych po załadowaniu okna a nie na bieżąco
        fetchGetOneEmployeeBetweenDatesDaysOff(navigate, getLocalStorageKeyWithExpiry("loggedEmployee").UserId, firstDayOfMonthForEndpoint, lastDayOfMonthForEndpoint)
            .then(monthDaysOff => {

                let monthDaysOfff = []
                // Tutaj tworzę jsona do pokazania dni wolnych na kalendarzu
                if(monthDaysOff !== undefined && monthDaysOff !== null) {
                    monthDaysOff.map((days) => {
                        if(days.absence_status_id === 3){
                            let absenceTypeForDay = "absent"
                            let absenceNameForDay = ""

                            absencesTypes.map((absenceType) => {
                                if(absenceType.absence_type_id === days.absence_type_id){
                                    absenceTypeForDay = absenceType.absence_type_category;
                                    absenceNameForDay = absenceType.absence_type_name;
                                }
                            })
                            let absenceDateStart = new Date(days.absence_start_date)
                            let absenceDateEnd = new Date(days.absence_end_date)
                            let dayDifference = absenceDateEnd.getDate() - absenceDateStart.getDate()

                            for(let day = 0; day <= dayDifference; day++){
                               let dayData =  {
                                    date: absenceDateStart.toLocaleDateString("sv", optionsForEndpoint),
                                    reason: absenceTypeForDay,
                                    name: absenceNameForDay
                                }
                                monthDaysOfff.push(dayData)
                                absenceDateStart.setDate(absenceDateStart.getDate() + 1)
                            }
                        }
                    })
                }

                currentMonthDays = createDaysForCurrentMonth(
                    pickedYearCurrently,
                    pickedMonthCurrently,
                    monthDaysOfff
                );

                previousMonthDays = createDaysForPreviousMonth(firstDayOfCurrentMonth);
                nextMonthDays = createDaysForNextMonth(lastDayOfCurrentMonth);

                const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

                let calendarDaysLoad = []
                days.forEach((day) => {
                    calendarDaysLoad.push(appendDay(day));
                });
                setCalendarDays(calendarDaysLoad)
            }).then(r => setShowHidePickedMonth(true));
    }

    //funkcja edytująca wybrane pola na podstawie danej nieobecności
    function appendDay(day) {
        let color = 'bg-dayoffmonth'

        if(day.isCurrentMonth){
            color = 'bg-workday'
        }

        if(day.reason !== undefined){
            if(day.reason === absent){
                color = 'bg-absent'
            }
            if(day.reason === dayoff || day.reason === demand || day.reason === occasional){
                color = 'bg-dayoff'
            }
            if(day.reason === sick){
                color = 'bg-sick'
            }
        }

        if(day.weekend !== undefined && day.weekend){
            color = 'bg-weekend'
            day.name = "";
        }

        let border = ''
        if(day.today){
            border = 'outline-dashed outline-4'
        }

        return <div className={'flex flex-col h-20 border-workday border-2 hover:cursor-default '+color+' m-2 rounded-md text-black '+border+' '}>
            <div className={"bg-dayoffmonth bg-opacity-50 text-center self-stretch"}>{day.dayOfMonth}</div>
            <div className={"text-center text-xs"}>{day.name} </div>
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
            let name = ''
            for(let i = 0; i < daysOff.length; i++){
                const offDayFound = new Date(daysOff[i].date)
                if(year === offDayFound.getFullYear() &&
                    month === offDayFound.getMonth() &&
                    index + 1 === offDayFound.getDate()){
                    reason = daysOff[i].reason
                    name = daysOff[i].name
                }
            }
            return {
                date: dayjs(`${year}-${month+1}-${index + 1}`).format("YYYY-MM-DD"),
                dayOfMonth: index + 1,
                isCurrentMonth: true,
                today: today,
                weekend: dateCurrentlyChecked.getDay() === 6 || dateCurrentlyChecked.getDay() === 0 ? true : false,
                name: name,
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

    // Czy pokazać powiadomienie gdy nie można prześć poza zakres pracy
    const [showingAlert, setShowingAlert] = useState(false)
    const changeMonth = (mode) => {
        const pickedMonthTextDate = new Date(pickedMonthText.date)

        if(mode === 'previous'){
            const pickedMonthTextDateMinusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth(),
                0)

            if(pickedMonthTextDateMinusOne.toLocaleDateString("sv", options) < from){
                setShowingAlert(true);
                setTimeout(() => {setShowingAlert(false)}, 3000);
            }
            else {
                loadWholeMonthData({
                    text: months[pickedMonthTextDateMinusOne.getMonth()].toUpperCase()+" "
                        +pickedMonthTextDateMinusOne.getFullYear(),
                    date: pickedMonthTextDateMinusOne.toLocaleDateString("sv", options)})
            }
        }

        if(mode === 'next'){
            const pickedMonthTextDatePlusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth()+1,
                1)

            if(pickedMonthTextDatePlusOne.toLocaleDateString("sv", options) > to){
                setShowingAlert(true);
                setTimeout(() => {setShowingAlert(false)}, 3000);
            }
            else {
                loadWholeMonthData({
                    text: months[pickedMonthTextDatePlusOne.getMonth()].toUpperCase()+" "
                        +pickedMonthTextDatePlusOne.getFullYear(),
                    date: pickedMonthTextDatePlusOne.toLocaleDateString("sv", options)})
            }
        }
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        FunctionForResize("schedule-month-list", {setWantedHeightForList});
    }, [pickedMonthText, calendarDays]);

    useEffect(() => {
        FunctionForResize("schedule-month-list", {setWantedHeightForList});
    }, []);

    return(
        <>
        {showHidePickedMonth ?
            <div id={"schedule-month"}
             className={"every-page-on-scroll overflow-y-hidden hover:cursor-default"}
            style={{minWidth: 800}}>
                <div className={"p-4 flex flex-row text-workday justify-between gap-4"}>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <div>
                            <button id={"button-close-month"} className={"flex bg-d flex-row self-center gap-2"}
                                    onClick={() => setShowHidePickedMonth(false)}>
                                <div className={"flex flex-row self-center"}><MdOutlineArrowBackIosNew /></div>
                                <div>{labelBack}</div>
                            </button>
                        </div>
                    </div>
                    <div className={"col-start-1 row-start-1 place-self-center"}>
                        <div className={"text-workday flex flex-row gap-8"}>
                            <div id={"schedule-previous-month"}
                                className={"flex place-self-center hover:cursor-pointer"}
                                 onClick={() => changeMonth("previous")}>
                                <MdOutlineArrowBackIosNew size={30}/></div>
                            <div className={"flex font-bold 20 w-40 place-content-center"}>
                                {pickedMonthText !== undefined ? pickedMonthText.text : ''}
                            </div>
                            <div id={"schedule-next-month"}
                                className={"flex place-self-center hover:cursor-pointer"}
                                 onClick={() => changeMonth("next")}>
                                <MdOutlineArrowForwardIos size={30}/>
                            </div>
                        </div>
                    </div>
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        <div>
                            <Popup
                                content={<Legend id={"schedule-legend-window"} bigLegend={true}/>}
                                position={"left center"}
                                trigger={<ReusableButton id={"schedule-legend"}
                                    value={legendLabel}/>}
                            />
                        </div>
                    </div>
                </div>

                <div id={"schedule-alert-message"}
                    className={"text-workday text-center"}>
                    {showingAlert ? alertCantGoFurther : ' ... '}
                </div>
                <div id={"schedule-month-list"}
                     className={"grid grid-cols-7 overflow-y-auto"}
                     style={{ height: wantedHeightsForList } }>
                        {daysOfWeek}
                        {calendarDays}
                </div>
            </div> :
            <div id={"schedule"}
                 className={"every-page-on-scroll overflow-y-hidden hover:cursor-default"}
            style={{minWidth: 800}}>
                <div className={"p-4 flex flex-wrap flex-col text-center text-workday gap-4"}>
                    <p>{monthsOfYourWorkLabel}</p>
                    <div className={"flex flex-row gap-4 flex-wrap"}>
                        <div className={"flex flex-row gap-4 place-self-center"}>
                            <p className={""}>{calendarLabelFrom}</p>
                            <input className={"grow border text-left text-black rounded-md h-6 w-52"}
                                   id="schedule-month-year-from"
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
                            <p className={""}>{calendarLabelTo}</p>
                            <input className={"grow border text-left text-black rounded-md h-6 w-52"}
                                   id="schedule-month-year-to"
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
                        <div className={"grow"}>
                            <ReusableButton value={labelFilter}
                                            id={"schedule-filter-button"}
                                            onClick={() =>
                                                filtrSchedule().then(scheduleList => setMonthList(scheduleList))}/></div>
                    </div>
                </div>
                <hr/>
                <div id={"schedule-list"} className={"rounded-md overflow-y-auto h-full"}>
                    <ul>
                        {monthList.map((p, id) =>
                            <ScheduleListItem key={p.value} text={p.text} date={p.date}
                                              loadWholeMonthData={loadWholeMonthData} listId={id}/>
                        )}
                    </ul>
                </div>
            </div>
        }
        </>
    )
}

export default Schedule;