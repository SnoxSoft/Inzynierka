import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";
import TeamMember from "./TeamMember";
const TeamMembers = ({disableChange, employeeData, setEmployeeData, setEmployeesFinderShowing,
                         swapTeamsBetweenTheseEmployee, setSwapTeamsBetweenTheseEmployee, mode}) => {
    let showAllEmployees = []

    employeeData.forEach((employee, employeeId) => {
        showAllEmployees.push(<TeamMember id={"team-employee-" + employeeId} mode={mode} value={employee} disableChange={disableChange}
          employeeData={employeeData} setEmployeeData={setEmployeeData}
          setEmployeesFinderShowing={setEmployeesFinderShowing}
          swapTeamsBetweenTheseEmployee={swapTeamsBetweenTheseEmployee}
          setSwapTeamsBetweenTheseEmployee={setSwapTeamsBetweenTheseEmployee}/>)
    })

    function setValuesForPickerAndOpenIt(){
        setEmployeesFinderShowing(true, {howMuch: "more", who: "employee", idPickedEmployee: null});
    }

    return (
        <div className={"flex flex-col place-items-center gap-4"}>
            {showAllEmployees}

            {!disableChange ?
                <ReusableButton id={"team-member-add"} value={<HiPlus/>}
                    color={""}
                    onClick={() => setValuesForPickerAndOpenIt()}
                    formatting={"hover:bg-gray-500 hover:border-2 hover:border-gray-400 w-96 h-6 rounded-md flex flex-col items-center place-content-center"}
                /> :
                <></>
            }
        </div>
    )
}

export default TeamMembers;