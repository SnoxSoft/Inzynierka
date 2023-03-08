import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";
import {useState} from "react";

const TeamMember = ({value, disableChange, employeeData, setEmployeeData, setEmployeesFinderShowing,
                        swapTeamsBetweenTheseEmployee, setSwapTeamsBetweenTheseEmployee}) => {
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
            if(value.id === e.id){
                deleteRecord = e
            }
            else {
                copyEmployeeData.push(e)
            }
        })
        setEmployeeData(copyEmployeeData)

        let swapTeamsDataWithoutCurrentEmployee = []
        swapTeamsBetweenTheseEmployee.forEach((e) => {
            console.log(e)
            if (e[0].id !== value.id) {
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
            <div key={"team-member"+value.id} className={"flex flex-col gap-1"}
                 onClick={() => {setButtonsVisible()}}>
                <input id={"dhbjhbs"} className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer hover:bg-weekend"} type={"text"}
                       value={value.firstandlastname} disabled={true}>
                </input>
                {showOptions ?
                    <div className={"flex flex-row gap-4 place-content-center"}>
                        <ReusableButton value={"ZMIEŃ"} formatting={"h-6 w-16 border-2 border-gray-400"}
                        onClick={() => setValuesForPickerAndOpenIt(value.id)}/>
                        {/*<ReusableButton value={"WYMIEŃ"} formatting={"h-6 w-20 border-2 border-gray-400"}*/}
                        {/*                onClick={() => setValuesForPickerAndOpenIt(value.id,"Exchange")}/>*/}
                        <ReusableButton value={"USUŃ"} formatting={"h-6 w-16 border-2 border-gray-400"}
                            onClick={() => removeEmployeeFromList()}/>
                    </div>
                    :
                    <></>
                }
            </div>
        )



    return (<>{showAllEmployees}</>)
}

export default TeamMember;