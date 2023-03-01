const TeamName = ({onChange, value, disableChange}) => {
    return <input id={"dhbjhbs"} className={"grow border text-black rounded-md text-center h-6 w-96"} type={"text"}
                  onChange={(e) => onChange(e.target.value)} value={value} disabled={disableChange}>

    </input>
}

export default TeamName;