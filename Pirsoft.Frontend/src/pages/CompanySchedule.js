import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {HiArrowLeft} from "react-icons/hi";
import ScheduleListItem from "../components/schedule/ScheduleListItem";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import dayjs from "dayjs";
import {FiLogOut} from "react-icons/fi";
import {BiHide, BiShow} from "react-icons/bi";
import TeamRow from "../components/companySchedule/TeamRow";
import EmptyTeamRow from "../components/companySchedule/EmptyTeamRow";
import EmployeeRow from "../components/companySchedule/EmployeeRow";
import FunctionForSortingJson from "../components/base/FunctionForSortingJson";

function CompanySchedule(){
    document.title = "PIRSOFT: Harmonogram firmowy";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    const[wantedWidthForList, setWantedWidthForList] = useState(1000);

    //wszystkie zespoly ktore potrzebuje
    const [teams, setTeams] = useState(Object);
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    const [allTeams, setAllTeams] = useState([])

    // ładowanie raz zespołów po załądowaniu okna a nie na bieżąco
    if (teams[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllTeams")
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

        fetch("http://127.0.0.1:3001/allCompanyMonthDays/2022-02")
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
        fetch("http://127.0.0.1:3001/getAllEmployees")
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
    const options = {
        year: "numeric",
        month: "2-digit",
    }
    const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];

    const weekdays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
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
                    {weekday.toString().toUpperCase()}
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

        const days = loadWholeMonthData({
            text: monthNames[today.getMonth()].toUpperCase()+" "
                +today.getFullYear(),
            date: today.toLocaleDateString("sv", options)})

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
                     className={"row-start-1 col-start-"+colDayOfWeek+" text-workday text-center"}>
                    <div>
                        {getTextWeekday(day.date).toUpperCase()}
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
        const leftMenuComponent = document.getElementById("left-menu");

        const currentComponent = document.getElementById("schedule-company-list");
        if(leftMenuComponent != null && currentComponent != null){
            const currentComponentPosition = currentComponent.getBoundingClientRect();
            setWantedWidthForList(window.outerWidth - currentComponentPosition.x)
        }
    }

    useEffect(() => {
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
        FunctionForResizeScheduleWidth()
    }, );

    return(
        <>
        {teamsLoaded && allTeamsAreLoadedInDivs ?
            <>
                <div className={"every-page-on-scroll overflow-y-hidden"}
                     style={{minWidth: 1000}}>
                    <div className={"p-4 flex flex-row text-workday justify-between gap-4"}>
                        <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                            <div>
                                <ReusableButton value={"DZIŚ"} onClick={() => loadWholeMonthDataForCompany(new Date())}/>
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
                    <hr/>
                    <div id={"schedule-company-list"}
                         style={{
                             height: wantedHeightsForList,
                             maxWidth: wantedWidthForList-6,
                             width: wantedWidthForList-6,
                             minWidth: 1000}}
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