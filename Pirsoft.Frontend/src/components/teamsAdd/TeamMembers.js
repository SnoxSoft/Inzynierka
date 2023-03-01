import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";

const TeamMembers = ({value}) => {
    let showAllEmployees = []

    value.forEach((v) => {
        console.log(v.firstandlastname)
        showAllEmployees.push(
            <input id={"dhbjhbs"} className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer"} type={"text"}
                   value={v.firstandlastname} disabled={true}>

            </input>
        )
    })


    return (
        <div className={"flex flex-col place-items-center gap-4"}>
            {showAllEmployees}
            <ReusableButton value={<HiPlus/>}
                color={""}
                onClick={() => console.log("open widow to pick new employee")}
                formatting={"hover:bg-gray-500 hover:border-2 hover:border-gray-400 w-96 h-6 rounded-md flex flex-col items-center place-content-center"}
            />
        </div>
    )
}

export default TeamMembers;