import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import dayjs from "dayjs";
import {legendLabel, legendToday, months, pageNameCompanySchedule, serverIp, weekdays} from "../GlobalAppConfig";
import {Popup} from "semantic-ui-react";
import Legend from "../components/legend/Legend";
import {
    fetchGetAllEmployees,
    fetchGetAllTeamsAndAddZeroRecordAndSort, fetchGetCompanyMonthDaysOff
} from "../DataFetcher";
import {useNavigate} from "react-router-dom";
import TeamRow from "../components/teams/TeamRow";

function CompanySchedule(){
    document.title = pageNameCompanySchedule;

    const navigate = useNavigate();

    const optionsForFormatDate = {
        year: "numeric",
        month: "2-digit",
    }

    // Zmienna pozwalająca wyświetlić cały komponent kalendarza
    const [allTeamsAreLoadedInDivs, setAllTeamsAreLoadedInDivs] = useState(false)

    //wszystkie zespoly ktore potrzebuje
    const [teams, setTeams] = useState(null);
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        // Załadowanie wszystkich zespołów
        if(teams === null) {
            fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, false)
                .then(teams => {
                    setTeams(teams)
                });
        }

        // Pobranie listy wszystkich pracowników
        if (employees === null) {
            fetchGetAllEmployees(navigate, true)
                .then(employees => setEmployees(employees));
        }

        if(allTeamsAreLoadedInDivs === false && teams !== null && employees !== null){
            fetchGetCompanyMonthDaysOff(navigate, new Date().toLocaleDateString("sv", optionsForFormatDate))
                .then(companyMonthDaysOff => {
                    loadWholeMonthDataForCompany(new Date(), companyMonthDaysOff)
                })
        }

    });

    // Zmienna wyświetlająca o wybranym miesiacu i roku
    const [pickedMonthText, setPickedMonth] = useState('')

    const loadWholeMonthData = (pickedMonth) => {
        setPickedMonth(pickedMonth)

        const pickedMonthCurrently = parseInt(pickedMonth.date.substring(5,7))-1
        const pickedYearCurrently = parseInt(pickedMonth.date.substring(0,4))

        let currentMonthDays = [];
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

    // Zmianna, która zawiera komponenty z zespołami, pracownikami, dniami
    const [allTeams, setAllTeams] = useState([])

    const loadWholeMonthDataForCompany = (today, currentMonthDaysOff) => {
        setAllTeamsAreLoadedInDivs(false)

        const days = loadWholeMonthData({
            text: months[today.getMonth()]+" "
                +today.getFullYear(),
            date: today.toLocaleDateString("sv", optionsForFormatDate)})

        let allTeamsLoad = []

        // Naglowek miesiaca dwa puste pola
        allTeamsLoad.push(
            <div id={"empty-team-header"} key={"empty-team-header"}
                className={"row-start-1 col-start-1 w-48"}>
            </div>)
        allTeamsLoad.push(
            <div id={"empty-employee-header"} key={"empty-employee-header"}
                className={"row-start-2 col-start-1"}>
            </div>)

        let colDayOfWeek = 2
        days.forEach((day, id) => {
            allTeamsLoad.push(
                <div id={"header-month-days-"+id} key={"header-month-days-"+id}
                     className={"hover:cursor-default row-start-1 col-start-"+colDayOfWeek+" text-workday text-center w-8 h-12"}>
                    <div id={"header-month-week-"+id} key={"header-month-week-"+id}>
                        {getTextWeekday(day.date)}
                    </div>
                    <div id={"header-month-day-"+id} key={"header-month-day-"+id}>
                        {day.dayOfMonth}
                    </div>
                </div>)
            colDayOfWeek = colDayOfWeek + 1
        });

        //console.clear()

        let row = 1
        teams.forEach((team, id) => {
            // dodanie zespołów
            row = row + 1
            allTeamsLoad.push(
                <TeamRow id={"company-schedule-team-"+id} team={team} row={row} days={days}
                    employees={employees} currentMonthDaysOff={currentMonthDaysOff}
                isSchedule={true}/>)

        });

        // ustawianie calego kalendarza i pokazanie go
        setAllTeams(allTeamsLoad)
        setAllTeamsAreLoadedInDivs(true)
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

            fetchGetCompanyMonthDaysOff(navigate, pickedMonthTextDateMinusOne.toLocaleDateString("sv", optionsForFormatDate))
                .then(companyMonthDaysOff => {
                    loadWholeMonthDataForCompany(pickedMonthTextDateMinusOne, companyMonthDaysOff)
                })
        }

        if(mode === 'next'){
            const pickedMonthTextDatePlusOne = new Date(
                pickedMonthTextDate.getFullYear(),
                pickedMonthTextDate.getMonth()+1,
                1)

            fetchGetCompanyMonthDaysOff(navigate, pickedMonthTextDatePlusOne.toLocaleDateString("sv", optionsForFormatDate))
                .then(companyMonthDaysOff => {
                    loadWholeMonthDataForCompany(pickedMonthTextDatePlusOne, companyMonthDaysOff)
                })
        }
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        FunctionForResize("schedule-company-list", {setWantedHeightForList});
    }, );

    return(
        <>
        {allTeamsAreLoadedInDivs ?
            <>
                <div id={"company-schedule-parent"} className={"every-page-on-scroll overflow-y-hidden hover:cursor-default"}
                     style={{minWidth: 800}}>
                    <div className={"p-4 flex flex-row text-workday justify-between gap-4"}>
                        <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                            <div>
                                <ReusableButton id={"company-schedule-today"} value={legendToday} onClick={() =>
                                {fetchGetCompanyMonthDaysOff(navigate, new Date())
                                    .then(companyMonthDaysOff => {
                                        console.log(companyMonthDaysOff)
                                        loadWholeMonthDataForCompany(new Date(), companyMonthDaysOff)
                                    })}}/>
                            </div>
                        </div>
                        <div className={"col-start-1 row-start-1 place-self-center"}>
                            <div className={"text-workday flex flex-row gap-8"}>
                                <div id={"company-schedule-previous-month"}
                                     className={"flex place-self-center hover:cursor-pointer"}
                                     onClick={() => changeMonth("previous")}>
                                    <MdOutlineArrowBackIosNew size={30}/></div>
                                <div className={"flex font-bold 20 w-40 place-content-center"}>
                                    {pickedMonthText !== undefined ? pickedMonthText.text : ''}
                                </div>
                                <div id={"company-schedule-next-month"}
                                     className={"flex place-self-center hover:cursor-pointer"}
                                     onClick={() => changeMonth("next")}>
                                    <MdOutlineArrowForwardIos size={30}/>
                                </div>
                            </div>
                        </div>
                        <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                            <div>
                                <Popup
                                    content={<Legend id={"company-schedule-legend-window"}/>}
                                    position={"left center"}
                                    trigger={<ReusableButton
                                        id={"company-schedule-legend"}
                                        value={legendLabel}/>}
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div id={"schedule-company-list"}
                         style={{
                             height: wantedHeightsForList,
                             minWidth: 800}}
                         className={"rounded-md overflow-y-auto bg-green-menu overflow-x-auto grid grid-row-"+(employees.length + teams.length + 1)+" gap-y-4 content-start"}>
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