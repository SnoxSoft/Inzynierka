import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsAdd/TeamName";
import TeamMembers from "../../components/teamsAdd/TeamMembers";
import TeamLeader from "../../components/teamsAdd/TeamLeader";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import TeamMembersSkills from "../../components/teamsAdd/TeamMembersSkills";

const TeamView = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    console.log("ID TEAM")
    console.log(id)

    //loading data with one endpoint
    const [teamData, setTeamData] = useState([]);
    const [leaderData, setLeaderData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeSkillData, setEmployeeSkillData] = useState([]);
    const [employeeSkillDataLoad, setEmployeeSkillDataLoad] = useState(false)
    const [teamDataLoaded, setTeamDataLoaded] = useState(false);

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
    }

    if (teamDataLoaded) {
        console.clear()
        console.log(teamData)
        console.log(leaderData)
        console.log(employeeData)
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

    return (
        <>
            {teamDataLoaded ?
        <div id={"teams-add"}
             className={"p-4 flex flex-col place-items-center bg-blue-menu rounded-md border-2 border-b-workday text-workday gap-4"}
             // style={{height: wantedHeightsForList}}
        >
                <div>NAZWA ZESPOŁU</div>
                <TeamName disableChange={true} value={teamData}/>
                <div>SILNE CECHY ZESPOŁU</div>
                <TeamMembersSkills value={employeeSkillData}/>
                <div>KIEROWNIK ZESPOŁU</div>
                <TeamLeader value={leaderData}/>
                <div>CZŁONKOWIE ZESPOŁU</div>
                <TeamMembers value={employeeData}/>

            <div className={"flex flex-row gap-4"}>
                <ReusableButton value={"ZAMKNIJ"} onClick={() => navigate(-1)}/>
                {/*<ReusableButton value={"UTWÓRZ"} onClick={() => console.log("UTWÓRZ ZESPOŁ")}/>*/}
            </div>
        </div> :
                <></>
            }
        </>
    )
}
export default TeamView;