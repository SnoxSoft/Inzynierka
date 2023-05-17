
const TeamMember = ({value, id}) => {

    let showAllEmployees = []

        showAllEmployees.push(
            <div id={id + "-member"} key={id + "-member"} className={"flex flex-col gap-1"}>
                <input id={id + "-firstname-lastname"} className={"grow border text-black rounded-md text-center h-6 w-96 hover:bg-weekend"} type={"text"}
                       value={value.first_name + " " + value.last_name} disabled={true}>
                </input>
            </div>
        )

    return (<>{showAllEmployees}</>)
}

export default TeamMember;