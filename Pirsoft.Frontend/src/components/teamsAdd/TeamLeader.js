const TeamLeader = ({onChange, value}) => {
    return <input id={"dhbjhbs"}
                  className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer"} type={"text"}
                  onChange={(e) => onChange(e.target.value)} value={value} disabled={true}>

    </input>
}

export default TeamLeader;