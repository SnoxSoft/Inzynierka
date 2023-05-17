import TeamMember from "./TeamMember";

const TeamLeader = ({disableChange, mode, leaderData, setLeaderData, setEmployeesFinderShowing}) => {

    let showAllLeaders = []

    leaderData.forEach((leader, leaderId) => {
        showAllLeaders.push(<TeamMember id={"team-leader-" + leaderId} mode={mode} value={leader} disableChange={disableChange}
                                          employeeData={leaderData} setEmployeeData={setLeaderData}
                                          setEmployeesFinderShowing={setEmployeesFinderShowing}/>)
    })

    return (<div className={"flex flex-col gap-2"}>
                {showAllLeaders}
            </div>
    )
}

export default TeamLeader;