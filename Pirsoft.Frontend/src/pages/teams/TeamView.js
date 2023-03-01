import ReusableButton from "../../components/base/ReusableButton";
import TeamName from "../../components/teamsAdd/TeamName";
import TeamMembers from "../../components/teamsAdd/TeamMembers";
import TeamLeader from "../../components/teamsAdd/TeamLeader";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

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
    const [teamDataLoaded, setTeamDataLoaded] = useState(false);

    if(!teamDataLoaded) {
        fetch("http://127.0.0.1:3001/getTeamData/"+id)
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

    if(teamDataLoaded){
        console.clear()
        console.log(teamData)
        console.log(leaderData)
        console.log(employeeData)
        console.log(employeeSkillData)

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
                <div>KIEROWNIK ZESPOŁU</div>
                <TeamLeader />
                <div>CZŁONKOWIE ZESPOŁU</div>
                <TeamMembers />

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