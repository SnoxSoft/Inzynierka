import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";
import TeamMember from "./TeamMember";

const TeamMembers = ({disableChange, employeeData, setEmployeeData}) => {
    let showAllEmployees = []

    employeeData.forEach((v) => {
        showAllEmployees.push(<TeamMember value={v} disableChange={disableChange}
          employeeData={employeeData} setEmployeeData={setEmployeeData}/>)
    })


    return (
        <div className={"flex flex-col place-items-center gap-4"}>
            {showAllEmployees}

            {!disableChange ?
                <ReusableButton value={<HiPlus/>}
                    color={""}
                    onClick={() => console.log("open widow to pick new employee")}
                    formatting={"hover:bg-gray-500 hover:border-2 hover:border-gray-400 w-96 h-6 rounded-md flex flex-col items-center place-content-center"}
                /> :
                <></>
            }
        </div>
    )
}

export default TeamMembers;