import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsAdd/TeamName";
import TeamMembers from "../../components/teamsAdd/TeamMembers";
import TeamLeader from "../../components/teamsAdd/TeamLeader";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamMembersSkills from "../../components/teamsAdd/TeamMembersSkills";
import FunctionForResize from "../../components/base/FunctionForResize";
import EmployeesFinder from "../EmployeesFinder";

const TeamWindow = ({id,mode, title}) => {
    const[dynamicTitle, setDynamicTitle] = useState(title)
    document.title = dynamicTitle

    const navigate = useNavigate()

    const [employeesFinderShow, setEmployeesFinderShow] = useState(false)
    const [methodToUse, setMethodToUse] = useState()
    const [isSwapPossible, setIsSwapPossible] = useState(false)
    const [idOfCurrentPickedEmployee, setIdOfCurrentPickedEmployee] = useState()
    const [multipleChoice, setMultipleChoice] = useState(false)
    const [swapDataFillingIn, setSwapDataFillingIn] = useState("")

    // Ładowanie danych
    const [teamData, setTeamData] = useState([]);
    const [leaderData, setLeaderData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeSkillData, setEmployeeSkillData] = useState([]);
    const [employeeSkillDataLoad, setEmployeeSkillDataLoad] = useState(false)
    const [teamDataLoaded, setTeamDataLoaded] = useState(false);
    const [swapTeamsBetweenTheseEmployee, setSwapTeamsBetweenTheseEmployee] = useState([])

    const [swapEmployeesBetweenTeamsInformation, setSwapEmployeesBetweenTeamsInformation] = useState()

    if(mode === 'view' || mode === 'edit'){
    if (!teamDataLoaded) {
        fetch("http://127.0.0.1:3001/getTeamData/" + id)
            .then((response) => {
                response.json()
                    .then((response) => {
                        setTeamData(response[0].name)
                        setLeaderData(response[0].leader)
                        setEmployeeData(response[0].employees)
                        setTeamDataLoaded(true)
                    });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }}

    if (teamDataLoaded) {
        reloadSkills()
    }

    function reloadSkills(){
        let skillList = []
        employeeData.forEach((e) => {
            e.skills.forEach((s) => {
                let found = false
                skillList.forEach(element => {
                    if(element.name === s){
                        found = true
                    }
                });
                if(!found){
                    skillList.push({name:s, value:1})
                }
                else {
                    skillList.forEach(element => {
                        if(element.name === s){
                            element.value = element.value + 1;
                        }
                    });
                }
            })
        })
        if(!employeeSkillDataLoad || mode === 'create') {
            setEmployeeSkillData(skillList)
            setEmployeeSkillDataLoad(true)
        }
    }

    function setEmployeesFinderShowing(showOrNo, options){
        if(options !== undefined) {
            setMethodToUse(options.who)
            setIsSwapPossible(options.idPickedEmployee !== null && options.who === "employee")
            setIdOfCurrentPickedEmployee(options.idPickedEmployee)
            setMultipleChoice(options.id === null && options.who === "employee")
            setSwapDataFillingIn(options.howMuch)

            // Jeśli ZMIEN lub USUŃ na kimś kto został zamieniony to usuwany zostaje on
            // z on usunięty z exchange list
            setExchangeInformation(options.idPickedEmployee)
        }
        setEmployeesFinderShow(showOrNo)
    }

    function saveOrCreate(){
        console.log("saved data of whole team, i will add endpoint here")
        console.log(teamData)
        console.log(leaderData)
        console.log(employeeData)
        console.log(swapTeamsBetweenTheseEmployee)
    }

    function setExchangeInformation(idToDeleteFromList = null) {
        setSwapEmployeesBetweenTeamsInformation(<div></div>)
        let loadSwapInformation = []

        if (swapTeamsBetweenTheseEmployee.length > 0) {
            loadSwapInformation.push(<div> Zamienione osoby pomędzy zespołami</div>)
        }

        let ifAnyChangeOnCurrentSwappedEmployeeList = []
        swapTeamsBetweenTheseEmployee.forEach((s) => {
            if (idToDeleteFromList === null) {
                loadSwapInformation.push(<div> {s[0].firstandlastname}, zamieniona z osobą: {s.firstandlastname}</div>)
                ifAnyChangeOnCurrentSwappedEmployeeList.push(s)
            }

            if (idToDeleteFromList !== null) {
                if (s[0].id !== idToDeleteFromList) {
                    //delete from swap list, no more swap if any change occur and get back previous employee to the list :)
                    loadSwapInformation.push(<div> {s[0].firstandlastname}, zamieniona z
                        osobą: {s.firstandlastname}</div>)
                    ifAnyChangeOnCurrentSwappedEmployeeList.push(s)
                } else {
                    let employeeDataWithReturnedChanges = []
                    employeeData.forEach((e) => {
                        if(s[0].id === e.id){
                            employeeDataWithReturnedChanges.push({id: s.id, firstandlastname: s.firstandlastname, skills: s.skills})
                        }
                        else {
                            employeeDataWithReturnedChanges.push(e)
                        }
                    })
                    setEmployeeData(employeeDataWithReturnedChanges)
                }
            }
        })
        if (swapTeamsBetweenTheseEmployee.length > 0) {
            loadSwapInformation.push(<div> !!! </div>)
            loadSwapInformation.push(<div> OSOBY ZOSTANĄ WYMIENIONE POMIĘDZY ZESPOŁAMI PO ZAPISANIU ZMIAN W AKTUALNIE
                EDYTOWANYM ZESPOLE </div>)
            loadSwapInformation.push(<div> !!! </div>)
        }

        setSwapTeamsBetweenTheseEmployee(ifAnyChangeOnCurrentSwappedEmployeeList)
        if (loadSwapInformation.length > 0) {
            setSwapEmployeesBetweenTeamsInformation(loadSwapInformation)
        }
    }

    useEffect(() => {
        setEmployeeSkillDataLoad(false)
        setExchangeInformation()
        reloadSkills()
    },[employeeData])

    return (
        <>
            {employeesFinderShow ?
                <EmployeesFinder title={title} setTitle={setDynamicTitle}
                     setEmployeesFinderShowing={setEmployeesFinderShowing}
                     methodToUse={methodToUse}
                     leaderData={leaderData}
                     setLeaderData={setLeaderData}
                     employeeData={employeeData}
                     setEmployeeData={setEmployeeData}
                     isSwapPossible={isSwapPossible}
                     swapDataFillingIn={swapDataFillingIn}
                     idOfCurrentPickedEmployee={idOfCurrentPickedEmployee}
                     multipleChoice={multipleChoice}
                     swapTeamsBetweenTheseEmployee={swapTeamsBetweenTheseEmployee}
                     setSwapTeamsBetweenTheseEmployee={setSwapTeamsBetweenTheseEmployee}
                    /> :
            teamDataLoaded || mode === 'create' ?
                <div id={"teams-add"}
                     className={"every-page-on-scroll text-workday bg-blue-menu"}
                     style={{minWidth: 800}}
                >
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 p-4"}>
                        <div>NAZWA ZESPOŁU</div>
                        <TeamName disableChange={(mode === 'view')} value={teamData} onChange={setTeamData} />
                        <div>SILNE CECHY ZESPOŁU</div>
                        <TeamMembersSkills value={employeeSkillData}/>
                        <div>KIEROWNIK ZESPOŁU</div>
                        <TeamLeader disableChange={(mode === 'view')}
                            value={leaderData} setLeaderData={setLeaderData}
                            setEmployeesFinderShowing={setEmployeesFinderShowing}
                            />
                        <div>CZŁONKOWIE ZESPOŁU</div>
                        <TeamMembers
                            disableChange={(mode === 'view')}
                            employeeData={employeeData} setEmployeeData={setEmployeeData}
                            employeeSkillData={employeeSkillData} setEmployeeSkillData={setEmployeeSkillData}
                            setEmployeesFinderShowing={setEmployeesFinderShowing}
                            swapTeamsBetweenTheseEmployee={swapTeamsBetweenTheseEmployee}
                            setSwapTeamsBetweenTheseEmployee={setSwapTeamsBetweenTheseEmployee}/>
                        <div className={"text-center"}>{swapEmployeesBetweenTeamsInformation}</div>
                        <div className={"flex flex-row gap-2"}>
                            <ReusableButton value={"ZAMKNIJ"} onClick={() => navigate(-1)}/>
                            {mode === 'create' ?
                                <ReusableButton value={"UTWÓRZ"} onClick={() => console.log("UTWÓRZ ZESPOŁ")}/> :
                                <></>
                            }
                            {mode === 'edit' ?
                                <ReusableButton value={"ZAPISZ"} onClick={() => saveOrCreate()}/> :
                                <></>
                            }
                        </div>
                    </div>
                </div> :
                <></>
            }
        </>
    )
}
export default TeamWindow;