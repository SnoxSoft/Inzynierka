import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsModifcation/TeamName";
import TeamMembers from "../../components/teamsModifcation/TeamMembers";
import TeamLeader from "../../components/teamsModifcation/TeamLeader";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamMembersSkills from "../../components/teamsModifcation/TeamMembersSkills";
import {
    accountHR, accountPresident,
    labelClose,
    labelCreate, labelDelete,
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

const TeamWindow = ({id, mode, title}) => {
    const[dynamicTitle, setDynamicTitle] = useState(title)
    document.title = dynamicTitle

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

    // Ładowanie danych
    const [teamData, setTeamData] = useState(null);
    const [fullTeamData, setFullTeamData] = useState(null)
    const [leaderData, setLeaderData] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [employeeSkillData, setEmployeeSkillData] = useState([]);
    const [employeeSkillDataLoad, setEmployeeSkillDataLoad] = useState(false)

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null && ((mode === "edit" || mode === "create") &&
                (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR || getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountPresident))){
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
                                if (employee.employee_company_role_id.toString() !== "3") {
                                    employeesListData.push(employee)
                                } else if (employee.employee_company_role_id.toString() === "3") {
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

    function saveTeam(){
        let bodyEditTeam = {
                apiInternalId: fullTeamData.apiInternalId,
                department_id: fullTeamData.department_id,
                department_name: teamData
        }
        fetchPutEditTeam(id, bodyEditTeam)
            .then(r => {
                navigate(-1);
        })
    }

    function createTeam(){
        const query = new URLSearchParams();
        query.set("departmentName", teamData);

        if(teamData !== null) {
            fetchPostCreateTeam(query)
                .then(r => {
                    navigate(-1);
                })
        }
    }

    function deleteTeam(){
        // Tutaj jeszcze muszę dodać edycje wszystkich pracowników w zespole i zmiane zespołu na 1 - brak
        fetchDeleteTeam(id)
            .then(r => {
                navigate(-1);
            })
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
                                <ReusableButton id={"team-create"} value={labelCreate} onClick={() => createTeam()}/> :
                                <></>
                            }
                            {mode === 'edit' ?
                                <>
                                    {id.toString().trim() !== "1" ?
                                        <ReusableButton id={"team-delete"} value={labelDelete} onClick={() => deleteTeam()}/> :
                                        <></>
                                    }
                                    <ReusableButton id={"team-save"} value={labelSave} onClick={() => saveTeam()}/>
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