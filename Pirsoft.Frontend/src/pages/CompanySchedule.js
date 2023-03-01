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

function CompanySchedule(){
    document.title = "PIRSOFT: Harmonogram firmowy";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    //wszystkie zespoly ktore potrzebuje
    const [teams, setTeams] = useState(Object);
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    const [allTeams, setAllTeams] = useState([])

    function GetSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    // ładowanie raz zespołów po załądowaniu okna a nie na bieżąco
    if (teams[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllTeams")
            .then((response) => response.json())
            .then((response) => {
                response.sort(GetSortOrder("value"))
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
                response.sort(GetSortOrder("lastname"))
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

        //console.clear()
        //console.log(pickedMonth.date)

        const options2 = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        }

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

        //console.clear()
        setAllTeamsAreLoadedInDivs(false)
        setMonthDaysOffLoaded(false)

        const days = loadWholeMonthData({
            text: monthNames[today.getMonth()].toUpperCase()+" "
                +today.getFullYear(),
            date: today.toLocaleDateString("sv", options)})

        let allTeamsLoad = []

        //naglowek miesiaca dwa puste pola
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
                    {getTextWeekday(day.date).toUpperCase()}
                </div>)
            colDayOfWeek = colDayOfWeek + 1
        });

        let colDayOfMonth = 2
        days.forEach((day) => {
            allTeamsLoad.push(
                <div key={"top-days-"+day.dayOfMonth}
                     className={"row-start-2 col-start-"+colDayOfMonth+" text-workday text-center"}>
                    {day.dayOfMonth}
                </div>)
            colDayOfMonth = colDayOfMonth + 1
        });


        let row = 2
        teams.forEach((team) => {
            // dodanie zespołów
            row = row + 1
            allTeamsLoad.push(
                <TeamRow team={team} row={row}/>)

            // dodawanie pustych komponentów po prawej stronie zespołu
            let colTeam = 2
            days.forEach((day) => {
                allTeamsLoad.push(
                    <EmptyTeamRow team={team} day={day} row={row} colTeam={colTeam}/>)
                colTeam = colTeam + 1
            });

            employees.forEach((employee) => {
                if(employee.team.toString().toUpperCase() === (team.value+'').toString().toUpperCase()){
                    row = row + 1
                    allTeamsLoad.push(
                        <EmployeeRow employee={employee} row={row}/>)

                    // szukanie dni wolnych danego pracownika
                    let daysOffOfThisEmployee = []
                    currentMonthDaysOff.forEach((e) => {
                        if(e.employee === employee.id){
                            daysOffOfThisEmployee = e.daysoff
                        }
                    })

                    // dodawanie komponentów dni pracownika
                    let col = 2
                    days.forEach((day) => {
                        //console.log(day)
                        allTeamsLoad.push(
                            appendDay(day, row, col, daysOffOfThisEmployee)
                        )
                        col = col + 1
                    });
                }
            });
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

    function appendDay(day, row, col, daysOff) {
        let color = 'workday'

        daysOff.forEach((d) => {
            if(day.date === d){
                color = 'absent'
            }
        })

        if(day.weekend !== undefined && day.weekend){
            color = 'weekend'
        }

        return <div
            className={
            "row-start-"+row+" col-start-"+col+" text-workday text-center border-workday border-2 w-8 h-8 hover:cursor-pointer bg-"+color+" rounded-md"}>
            {/*{day.dayOfMonth}*/}
        </div>
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

    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
    }, [allTeams]);

    return(
        <>
        {teamsLoaded && allTeamsAreLoadedInDivs ?
            <div
             className={"bg-green-menu rounded-md border-2 border-b-workday"}>

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
                <div id={"schedule-company-list"}
                     style={{ height: wantedHeightsForList } }
                     className={"rounded-md overflow-y-auto overflow-x-auto grid grid-row-"+(employees.length + teams.length + 1)+" p-2 gap-2"}>
                    {allTeams}
                </div>
            </div>
            :
            <></>
        }
        </>
    )
}

export default CompanySchedule;