import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";
import {useState} from "react";
import TeamEmployeeEditButton from "./TeamEmployeeEditButtons";

const TeamMember = ({value, disableChange, employeeData, setEmployeeData, setEmployeesFinderShowing,
                        swapTeamsBetweenTheseEmployee, setSwapTeamsBetweenTheseEmployee, id, mode}) => {
    const [showOptions, setShowOptions] = useState(false)
    const setButtonsVisible = () => {
        if(!disableChange) {
            if (showOptions) {
                setShowOptions(false);
            } else {
                setShowOptions(true);
            }
        }
    }

    const removeEmployeeFromList = () => {
        let copyEmployeeData = []
        let deleteRecord
        employeeData.forEach((e) => {
            if(value.employee_id === e.employee_id){
                deleteRecord = e
            }
            else {
                copyEmployeeData.push(e)
            }
        })
        setEmployeeData(copyEmployeeData)

        let swapTeamsDataWithoutCurrentEmployee = []
        swapTeamsBetweenTheseEmployee.forEach((e) => {
            if (e[0].employee_id !== value.employee_id) {
                swapTeamsDataWithoutCurrentEmployee.push(e)
            } else {
            }
        })
        setSwapTeamsBetweenTheseEmployee(swapTeamsDataWithoutCurrentEmployee)
    }

    function setValuesForPickerAndOpenIt(id, exchange = ""){
        setEmployeesFinderShowing(true, {howMuch: "one"+exchange, who: "employee", idPickedEmployee: id});
    }

    let showAllEmployees = []

        showAllEmployees.push(
            <div id={id + "-member"} key={id + "-member"} className={"flex flex-col gap-1"}
                 onClick={() => {setButtonsVisible()}}>
                <input id={id + "-firstname-lastname"} className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer hover:bg-weekend"} type={"text"}
                       value={value.first_name + " " + value.last_name} disabled={true}>
                </input>
                <TeamEmployeeEditButton id={id} mode={mode} showOptions={showOptions}
                                        changeMethod={setValuesForPickerAndOpenIt}
                                        changeValue={value.employee_id}
                                        deleteMethod={removeEmployeeFromList}
                                        />
            </div>
        )

    return (<>{showAllEmployees}</>)
}

export default TeamMember;