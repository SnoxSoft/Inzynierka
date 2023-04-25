import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsModifcation/TeamName";
import TeamMembers from "../../components/teamsModifcation/TeamMembers";
import TeamLeader from "../../components/teamsModifcation/TeamLeader";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamMembersSkills from "../../components/teamsModifcation/TeamMembersSkills";
import EmployeesFinder from "../EmployeesFinder";
import {
    labelAllPeopleChangedBetweenTeams,
    labelClose,
    labelCreate, labelPersonChangedWith,
    labelSave,
    labelStrongSkills,
    labelSwapInformation, labelTeamManager, labelTeamMembers,
    labelTeamName,
    serverIp
} from "../../GlobalAppConfig";
import {endpointGetTeamData} from "../../EndpointAppConfig";

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
        fetch(serverIp + "/" + endpointGetTeamData + "/" + id)
            .then((response) => {
                response.json()
                    .then((response) => {
                        setTeamData(response[0].department_name)
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
                    if(element.name === s.skill_name){
                        found = true
                    }
                });
                if(!found){
                    skillList.push({name:s.skill_name, value:1})
                }
                else {
                    skillList.forEach(element => {
                        if(element.name === s.skill_name){
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
        setSwapEmployeesBetweenTeamsInformation(<></>)
        let loadSwapInformation = []

        if (swapTeamsBetweenTheseEmployee.length > 0) {
            loadSwapInformation.push(<div>{labelAllPeopleChangedBetweenTeams}</div>)
        }

        let ifAnyChangeOnCurrentSwappedEmployeeList = []
        swapTeamsBetweenTheseEmployee.forEach((s) => {
            if (idToDeleteFromList === null) {
                loadSwapInformation.push(<div> {s[0].first_name + " " + s[0].last_name}, {labelPersonChangedWith}: {s.first_name + " " + s.last_name}</div>)
                ifAnyChangeOnCurrentSwappedEmployeeList.push(s)
            }

            if (idToDeleteFromList !== null) {
                if (s[0].employee_id !== idToDeleteFromList) {
                    //delete from swap list, no more swap if any change occur and get back previous employee to the list :)
                    loadSwapInformation.push(<div> {s[0].first_name + " " + s[0].last_name}, {labelPersonChangedWith}: {s.first_name + " " + s.last_name}</div>)
                    ifAnyChangeOnCurrentSwappedEmployeeList.push(s)
                } else {
                    let employeeDataWithReturnedChanges = []
                    employeeData.forEach((e) => {
                        if(s[0].employee_id === e.employee_id){
                            employeeDataWithReturnedChanges.push({employee_id: s.employee_id, first_name: s.first_name, last_name:s.last_name, skills: s.skills})
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
            loadSwapInformation.push(<div>{labelSwapInformation}</div>)
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
                     className={"every-page-on-scroll text-workday bg-blue-menu hover:cursor-default"}
                     style={{minWidth: 800}}
                >
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 p-4"}>
                        <div>{labelTeamName}</div>
                        <TeamName disableChange={(mode === 'view')} value={teamData} onChange={setTeamData} />
                        <div>{labelStrongSkills}</div>
                        <TeamMembersSkills skills={employeeSkillData}/>
                        <div>{labelTeamManager}</div>
                        <TeamLeader mode={mode} disableChange={(mode === 'view')}
                            value={leaderData} setLeaderData={setLeaderData}
                            setEmployeesFinderShowing={setEmployeesFinderShowing}
                            />
                        <div>{labelTeamMembers}</div>
                        <TeamMembers
                            mode={mode}
                            disableChange={(mode === 'view')}
                            employeeData={employeeData} setEmployeeData={setEmployeeData}
                            employeeSkillData={employeeSkillData} setEmployeeSkillData={setEmployeeSkillData}
                            setEmployeesFinderShowing={setEmployeesFinderShowing}
                            swapTeamsBetweenTheseEmployee={swapTeamsBetweenTheseEmployee}
                            setSwapTeamsBetweenTheseEmployee={setSwapTeamsBetweenTheseEmployee}/>
                        <div className={"text-center"}>{swapEmployeesBetweenTeamsInformation}</div>
                        <div className={"flex flex-row gap-2"}>
                            <ReusableButton id={"team-close"} value={labelClose} onClick={() => navigate(-1)}/>
                            {mode === 'create' ?
                                <ReusableButton id={"team-create"} value={labelCreate} onClick={() => saveOrCreate()}/> :
                                <></>
                            }
                            {mode === 'edit' ?
                                <ReusableButton id={"team-save"} value={labelSave} onClick={() => saveOrCreate()}/> :
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