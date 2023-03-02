import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsAdd/TeamName";
import TeamMembers from "../../components/teamsAdd/TeamMembers";
import TeamLeader from "../../components/teamsAdd/TeamLeader";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamMembersSkills from "../../components/teamsAdd/TeamMembersSkills";
import FunctionForResize from "../../components/base/FunctionForResize";

const TeamWindow = ({id,mode, title}) => {
    document.title = title

    const navigate = useNavigate()

    //loading data with one endpoint
    const [teamData, setTeamData] = useState([]);
    const [leaderData, setLeaderData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeSkillData, setEmployeeSkillData] = useState([]);
    const [employeeSkillDataLoad, setEmployeeSkillDataLoad] = useState(false)
    const [teamDataLoaded, setTeamDataLoaded] = useState(false);

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
        // console.log("NOWE PRZEŁADOWANIE")
        // console.log(teamData)
        // console.log(leaderData)
        // console.log(employeeData)
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
        if(!employeeSkillDataLoad) {
            setEmployeeSkillData(skillList)
            setEmployeeSkillDataLoad(true)
        }
    }

    function saveOrCreate(){
        console.log("saved data of whole team")
    }

    useEffect(() => {
        setEmployeeSkillDataLoad(false)
        reloadSkills()
    },[employeeData])

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("body-team-edit", {setWantedHeightForList});
    }, );

    return (
        <>
            {teamDataLoaded || mode === 'create' ?
                <div id={"teams-add"}
                     className={"p-4 bg-blue-menu rounded-md border-2 border-b-workday text-workday"}
                     style={{height: wantedHeightsForList}}
                >
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 overflow-y-auto"}>
                        <div>NAZWA ZESPOŁU</div>
                        <TeamName disableChange={(mode === 'view')} value={teamData} onChange={setTeamData}/>
                        <div>SILNE CECHY ZESPOŁU</div>
                        <TeamMembersSkills value={employeeSkillData}/>
                        <div>KIEROWNIK ZESPOŁU</div>
                        <TeamLeader disableChange={(mode === 'view')}
                            value={leaderData} setLeaderData={setLeaderData}/>
                        <div>CZŁONKOWIE ZESPOŁU</div>
                        <TeamMembers
                            disableChange={(mode === 'view')}
                            employeeData={employeeData} setEmployeeData={setEmployeeData}
                            employeeSkillData={employeeSkillData} setEmployeeSkillData={setEmployeeSkillData}/>

                        <div className={"flex flex-row gap-2"}>
                            <ReusableButton value={"ZAMKNIJ"} onClick={() => navigate(-1)}/>
                            {mode === 'create' ?
                                <ReusableButton value={"UTWÓRZ"} onClick={() => console.log("UTWÓRZ ZESPOŁ")}/> :
                                <></>
                            }
                            {mode === 'edit' ?
                                <ReusableButton value={"ZAPISZ"} onClick={() => console.log("ZAPISZ ZESPOŁ")}/> :
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