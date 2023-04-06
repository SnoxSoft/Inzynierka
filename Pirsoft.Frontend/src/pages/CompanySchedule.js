import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import dayjs from "dayjs";
import TeamRow from "../components/companySchedule/TeamRow";
import FunctionForSortingJson from "../components/base/FunctionForSortingJson";
import {legendLabel, legendToday, months, pageNameCompanySchedule, serverIp, weekdays} from "../GlobalAppConfig";
import {endpointGetAllCompanyMonthDaysOff, endpointGetAllEmployees, endpointGetAllTeams} from "../EndpointAppConfig";
import {Popup} from "semantic-ui-react";
import Legend from "../components/legend/Legend";

function CompanySchedule(){
    document.title = pageNameCompanySchedule;

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    const[wantedWidthForList, setWantedWidthForList] = useState(1000);

    //wszystkie zespoly ktore potrzebuje
    const [teams, setTeams] = useState(Object);
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    const [allTeams, setAllTeams] = useState([])

    // ładowanie raz zespołów po załądowaniu okna a nie na bieżąco
    if (teams[0] === undefined) {
        fetch(serverIp + "/" + endpointGetAllTeams)
            .then((response) => response.json())
            .then((response) => {
                response.sort(FunctionForSortingJson("value", "ascending"))
                setTeams(response)
                setTeamsLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [currentMonthDaysOff, setCurrentMonthDaysOff] = useState(Object);
    const [monthDaysOffLoaded, setMonthDaysOffLoaded] = useState(false)
    const loadMonthDaysOff = (data) => {
        // ładowanie dni wolnych / wybranych / nieobecnych w wybranym miesiacu

        fetch(serverIp + "/" + endpointGetAllCompanyMonthDaysOff + "/2022-02")
            .then((response) => response.json())
            .then((response) => {
                setCurrentMonthDaysOff(response)
                setMonthDaysOffLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [employees, setEmployees] = useState(Object);
    const [employeesLoaded, setEmployeesLoaded] = useState(false)

    // ładowanie wszystkich pracowników
    if (employees[0] === undefined) {
        fetch(serverIp + "/" + endpointGetAllEmployees)
            .then((response) => response.json())
            .then((response) => {
                response.sort(FunctionForSortingJson("lastname", "ascending"))
                setEmployees(response)
                setEmployeesLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [allTeamsAreLoadedInDivs, setAllTeamsAreLoadedInDivs] = useState(false)

    const [pickedMonthText, setPickedMonth] = useState('')

    const [daysOfWeek, setDaysOfWeek] = useState([])
    const [calendarDays, setCalendarDays] = useState([])

    const loadWholeMonthData = (pickedMonth) => {
        setPickedMonth(pickedMonth)

        const pickedMonthCurrently = parseInt(pickedMonth.date.substring(5,7))-1
        const pickedYearCurrently = parseInt(pickedMonth.date.substring(0,4))
        const pickedMonthDate = new Date(pickedYearCurrently, pickedMonthCurrently,1)

        let currentMonthDays = [];
        let daysOfWeekLoad = []

        weekdays.forEach((weekday) => {
            daysOfWeekLoad.push(
                <div className={"m-2 flex self-end place-self-center text-workday"}>
                    {weekday.toString()}
                </div>);
        });
        setDaysOfWeek(daysOfWeekLoad)

        currentMonthDays = createDaysForCurrentMonth(
            pickedYearCurrently,
            pickedMonthCurrently
        );

        const days = [...currentMonthDays];

        return days
    }

    const getTextWeekday = (pickedDay) => {
        const pickedDayWeekDay = new Date(pickedDay).getDay()
        if(pickedDayWeekDay === 0){
            return weekdays[6]
        }
        else {
            return weekdays[pickedDayWeekDay-1]
        }
    }

    const loadWholeMonthDataForCompany = (today) => {
        setAllTeamsAreLoadedInDivs(false)
        setMonthDaysOffLoaded(false)

        const optionsForFormatDate = {
            year: "numeric",
            month: "2-digit",
        }

        const days = loadWholeMonthData({
            text: months[today.getMonth()]+" "
                +today.getFullYear(),
            date: today.toLocaleDateString("sv", optionsForFormatDate)})

        let allTeamsLoad = []

        // Naglowek miesiaca dwa puste pola
        allTeamsLoad.push(
            <div
                className={"row-start-1 col-start-1"}>
            </div>)
        allTeamsLoad.push(
            <div
                className={"row-start-2 col-start-1"}>
            </div>)

        let colDayOfWeek = 2
        days.forEach((day) => {
            allTeamsLoad.push(
                <div key={"top-weekdays-"+day.dayOfMonth}
                     className={"hover:cursor-default row-start-1 col-start-"+colDayOfWeek+" text-workday text-center w-8 h-12"}>
                    <div>
                        {getTextWeekday(day.date)}
                    </div>
                    <div>
                        {day.dayOfMonth}
                    </div>
                </div>)
            colDayOfWeek = colDayOfWeek + 1
        });

        let row = 1
        teams.forEach((team) => {
            // dodanie zespołów
            row = row + 1
            allTeamsLoad.push(
                <TeamRow team={team} row={row} days={days}
                    employees={employees} currentMonthDaysOff={currentMonthDaysOff}/>)

        });

        // ustawianie calego kalendarza i pokazanie go
        setAllTeams(allTeamsLoad)
        setAllTeamsAreLoadedInDivs(true)
    }

    if(teamsLoaded && employeesLoaded && allTeams.length === 0 && allTeamsAreLoadedInDivs === false){
        loadMonthDaysOff(new Date())
        if(monthDaysOffLoaded) {
            loadWholeMonthDataForCompany(new Date())
        }
    }

    function createDaysForCurrentMonth(year, month) {
        return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
             const dateCurrentlyChecked = new Date(year, month, index + 1)
            return {
                date: dayjs(`${year}-${month+1}-${index + 1}`).format("YYYY-MM-DD"),
                dayOfMonth: index + 1,
                weekend: dateCurrentlyChecked.getDay() === 6 || dateCurrentlyChecked.getDay() === 0 ? true : false,
            };
        });
    }

    function getNumberOfDaysInMonth(year, month) {
        return dayjs(`${year}-${month+1}-01`).daysInMonth();
    }

    const changeMonth = (mode) => {
        const pickedMonthTextDate = new Date(pickedMonthText.date)

        if(mode === 'previous'){
            const pickedMonthTextDateMinusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth(),
                0)

            loadMonthDaysOff(pickedMonthTextDateMinusOne)
            if(monthDaysOffLoaded) {
                loadWholeMonthDataForCompany(pickedMonthTextDateMinusOne)
            }
        }

        if(mode === 'next'){
            const pickedMonthTextDatePlusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth()+1,
                1)

            loadMonthDaysOff(pickedMonthTextDatePlusOne)
            if(monthDaysOffLoaded) {
                loadWholeMonthDataForCompany(pickedMonthTextDatePlusOne)
            }
        }
    }

    function FunctionForResizeScheduleWidth(){

        //const leftMenuComponent = document.getElementById("left-menu");

        const scheduleParentComponent = document.getElementById("company-schedule-parent");

        //const currentComponent = document.getElementById("schedule-company-list");
        if(scheduleParentComponent){//leftMenuComponent != null && currentComponent != null){
            const currentComponentPosition = scheduleParentComponent.getBoundingClientRect();
            //setWantedWidthForList(window.outerWidth - currentComponentPosition.x)
            setWantedWidthForList(currentComponentPosition.width)
        }
    }

    useEffect(() => {
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
        //FunctionForResizeScheduleWidth()
    }, );

    const users = [
        {
            name: 'Elliot Fu',
            bio: 'Elliot has been a member since July 2012',
            avatar: '/images/avatar/small/elliot.jpg',
        },
        {
            name: 'Stevie Feliciano',
            bio: 'Stevie has been a member since August 2013',
            avatar: '/images/avatar/small/stevie.jpg',
        },
        {
            name: 'Matt',
            bio: 'Matt has been a member since July 2014',
            avatar: '/images/avatar/small/matt.jpg',
        },
    ]

    return(
        <>
        {teamsLoaded && allTeamsAreLoadedInDivs ?
            <>
                <div id={"company-schedule-parent"} className={"every-page-on-scroll overflow-y-hidden hover:cursor-default"}
                     style={{minWidth: 800}}>
                    <div className={"p-4 flex flex-row text-workday justify-between gap-4"}>
                        <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                            <div>
                                <ReusableButton value={legendToday} onClick={() => loadWholeMonthDataForCompany(new Date())}/>
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
                                <Popup
                                    content={<Legend/>}
                                    position={"bottom left"}
                                    trigger={<ReusableButton value={legendLabel}
                                                             onClick={() => console.log("tu bedzie legenda:)")}/>}
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div id={"schedule-company-list"}
                         style={{
                             height: wantedHeightsForList,
                             // maxWidth: wantedWidthForList,
                             // width: wantedWidthForList,
                             minWidth: 800}}
                         className={"rounded-md overflow-y-auto bg-green-menu overflow-x-auto grid grid-row-"+(employees.length + teams.length + 1)+" p-2 gap-2 content-start"}>
                        {allTeams}
                    </div>
                </div>
            </>
            :
            <></>
        }
        </>
    )
}

export default CompanySchedule;