import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsModifcation/TeamName";
import TeamMembers from "../../components/teamsModifcation/TeamMembers";
import TeamLeader from "../../components/teamsModifcation/TeamLeader";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import TeamMembersSkills from "../../components/teamsModifcation/TeamMembersSkills";
import {
    accountHR, accountPresident, accountTeamLeader, alertEmployeesStillInTeam, alertNoTeamName, alertProblemOccured,
    labelClose,
    labelCreate, labelDelete, labelDisapprove,
    labelSave,
    labelStrongSkills,
    labelTeamManager, labelTeamMembers,
    labelTeamName
} from "../../GlobalAppConfig";
import {
    fetchDeleteTeam,
    fetchGetAllEmployees,
    fetchGetTeamDataById,
    fetchPostCreateTeam, fetchPutEditTeam
} from "../../DataFetcher";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";
import {Popup} from "semantic-ui-react";

const TeamWindow = ({id, mode, title}) => {
    const[dynamicTitle, setDynamicTitle] = useState(title)
    document.title = dynamicTitle

    const navigate = useNavigate();

    // Ładowanie danych
    const [teamData, setTeamData] = useState(null);
    const [fullTeamData, setFullTeamData] = useState(null)
    const [leaderData, setLeaderData] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [employeeSkillData, setEmployeeSkillData] = useState([]);
    const [employeeSkillDataLoad, setEmployeeSkillDataLoad] = useState(false)

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }

        if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null && ((mode === "edit" || mode === "create") &&
                (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR && getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountPresident))){
                navigate("/teams");
        }

        if(mode === 'view' || mode === 'edit') {
            // Ładowanie raz zespołów po załadowaniu okna a nie na bieżąco

            if (teamData === null) {
                setTeamData([]);
                fetchGetTeamDataById(navigate, id)
                    .then(team => {
                        setFullTeamData(team);
                        setTeamData(team.department_name)
                    });
            }

            // Pobranie listy wszystkich pracowników
            if (employeeData === null) {
                setEmployeeData([])
                fetchGetAllEmployees(navigate, true)
                    .then(employeesList => {
                        let employeesListData = []
                        let leaderListData = []
                        employeesList.map((employee) => {
                            if (employee.employee_department_id.toString() === id) {
                                if (employee.employee_company_role.role_name !== accountTeamLeader) {
                                    employeesListData.push(employee)
                                } else if (employee.employee_company_role.role_name === accountTeamLeader) {
                                    leaderListData.push(employee)
                                }
                            }
                        })
                        setEmployeeData(employeesListData)
                        setLeaderData(leaderListData)
                        let allEmployeeSkillData = [...leaderListData,...employeesListData];
                        reloadSkills(allEmployeeSkillData)
                    });
            }
        }
    })

    function reloadSkills(allEmployeeSkillData){
        let skillList = []
        allEmployeeSkillData.map((e) => {
            if(e.employee_skills !== undefined) {
                e.employee_skills.map((s) => {
                    let found = false
                    skillList.forEach(element => {
                        if (element.skill_name === s.skill_name) {
                            found = true
                        }
                    });
                    if (!found) {
                        skillList.push({skill_name: s.skill_name, value: 1})
                    } else {
                        skillList.forEach(element => {
                            if (element.skill_name === s.skill_name) {
                                element.value = element.value + 1;
                            }
                        });
                    }
                })
            }
        })
        if(!employeeSkillDataLoad || mode !== 'create') {
            setEmployeeSkillData(skillList)
            setEmployeeSkillDataLoad(true)
        }
    }

    const [showPopupWithProblems, setShowPopupWithProblems] = useState(false);
    const [alerts, setAlerts] = useState(<></>)

    const buildPopup = () => {
        return showPopupWithProblems ?
            <div className={"flex flex-col items-center text-workday gap-2 p-2"}>
                {alerts}
            </div>:
            <></>
    }

    function saveTeam(){
        setAlerts(<></>)
        let bodyEditTeam = {
                apiInternalId: fullTeamData.apiInternalId,
                department_id: fullTeamData.department_id,
                department_name: teamData
        }
        fetchPutEditTeam(id, bodyEditTeam)
            .then(r => {
                navigate(-1);
        }).catch(e => {
            setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                {alertProblemOccured}
            </p>)
            setShowPopupWithProblems(true)
        })
    }

    function createTeam(){
        setAlerts(<></>)
        const query = new URLSearchParams();
        query.set("departmentName", teamData);

        if(teamData !== null && teamData.toString().length > 0) {
            fetchPostCreateTeam(query)
                .then(r => {
                    navigate(-1);
                }).catch(e => {
                setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertProblemOccured}
                </p>)
                setShowPopupWithProblems(true)
            })
        } else {
            setAlerts(<p className={"bg-red-700 rounded-md font-bold"}>
                {alertNoTeamName}
            </p>)
            setShowPopupWithProblems(true)
        }
    }

    function deleteTeam(){
        setAlerts(<></>)
        if(leaderData.length === 0 && employeeData === 0) {
            fetchDeleteTeam(id)
                .then(r => {
                    navigate(-1);
                }).catch(e => {
                setAlerts(<p className={"bg-red-700 rounded-md font-bold"}>
                    {alertProblemOccured}
                </p>)
                setShowPopupWithProblems(true)
            })
        }
        else {
            setAlerts(<>
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertProblemOccured}
                        </p>
                        <p className={"bg-red-700 rounded-md font-bold"}>
                        {alertEmployeesStillInTeam}
                        </p>
                    </>)
            setShowPopupWithProblems(true)
        }
    }

    return (
        <>
            {teamData !== null && employeeData !== null && leaderData !== null || mode === 'create' ?
                <div id={"teams-add"}
                     className={"every-page-on-scroll text-workday bg-blue-menu hover:cursor-default"}
                     style={{minWidth: 800}}
                >
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 p-4"}>
                        <div>{labelTeamName}</div>
                        <TeamName disableChange={(mode === 'view')} value={teamData} onChange={setTeamData} />

                        {mode !== 'create' ?
                            <>
                                <div>{labelStrongSkills}</div>
                                <TeamMembersSkills skills={employeeSkillData}/>
                                <div>{labelTeamManager}</div>
                                <TeamLeader leaderData={leaderData} setLeaderData={setLeaderData}/>
                                <div>{labelTeamMembers}</div>
                                <TeamMembers
                                    employeeData={employeeData} setEmployeeData={setEmployeeData}/>
                            </> :
                            <></>
                        }
                        <div className={"flex flex-row gap-2"}>
                            <ReusableButton id={"team-close"} value={labelClose} onClick={() => navigate(-1)}/>
                            {mode === 'create' ?
                                <Popup
                                    content={buildPopup}
                                    position={"top center"}
                                    trigger={<ReusableButton id={"team-create"} value={labelCreate} onClick={() => createTeam()}/>}
                                />
                                :
                                <></>
                            }
                            {mode === 'edit' ?
                                <>
                                    {id.toString().trim() !== "1" ?
                                        <Popup
                                            content={buildPopup}
                                            position={"top center"}
                                            trigger={<ReusableButton id={"team-delete"} value={labelDelete} onClick={() => deleteTeam()}/>}
                                        />
                                        :
                                        <></>
                                    }
                                    <Popup
                                        content={buildPopup}
                                        position={"top center"}
                                        trigger={<ReusableButton id={"team-save"} value={labelSave} onClick={() => saveTeam()}/>}
                                    />
                                </> :
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