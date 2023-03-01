import {HiPlus} from "react-icons/hi";

const TeamMembers = ({onChange, value}) => {
    return (
        <div className={"flex flex-col place-items-center gap-4"}>
        <input id={"dhbjhbs"} className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer"} type={"text"}
                      onChange={(e) => onChange(e.target.value)} value={value} disabled={true}>

        </input>
        <button className={"hover:bg-gray-500 hover:border-2 hover:border-gray-400 w-96 h-6 rounded-md flex flex-col items-center place-content-center"}>
            <HiPlus /></button>
        </div>
    )
}

export default TeamMembers;