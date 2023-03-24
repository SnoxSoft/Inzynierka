const TeamName = ({onChange, value, disableChange}) => {
    return <input id={"team-name"} className={"grow border text-black rounded-md text-center h-6 w-96 bg-gray-500 hover:cursor-pointer hover:bg-weekend"} type={"text"}
                  onChange={(e) => onChange(e.target.value)} value={value} disabled={disableChange}>

    </input>
}

export default TeamName;