import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";
import {useState} from "react";
import TeamEmployeeEditButton from "./TeamEmployeeEditButtons";

const TeamLeader = ({disableChange, mode, value, setLeaderData, setEmployeesFinderShowing}) => {
    const [showOptions, setShowOptions] = useState(false)

    const setButtonsVisible = () => {
        if (!disableChange) {
            if (showOptions) {
                setShowOptions(false);
            } else {
                setShowOptions(true);
            }
        }
    }
    function setValuesForPickerAndOpenIt(){
        setEmployeesFinderShowing(true, {howMuch: "one", who: "leader", idPickedEmployee: null});
    }

    return (
        <>
        {value === undefined || (value.length !== undefined && value.length === 0) ?
            !disableChange ?
                <ReusableButton id={"team-leader-add"} value={<HiPlus/>}
                                color={""}
                                formatting={"hover:bg-gray-500 hover:border-2 hover:border-gray-400 w-96 h-6 rounded-md flex flex-col items-center place-content-center"}
                                onClick={() => setValuesForPickerAndOpenIt()}
                />
                :
                <></>

                :

                <div className={"flex flex-col gap-1"}
                     onClick={() => setButtonsVisible()}
                >
                <input id={"team-leader"}
                          className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer hover:bg-weekend"} type={"text"}
                          value={value.firstandlastname} disabled={true}
                       >
                </input>
                    <TeamEmployeeEditButton id={"team-leader-"} mode={mode} showOptions={showOptions}
                                            changeMethod={setValuesForPickerAndOpenIt}

                                            deleteMethod={setLeaderData}
                                            deleteValue={undefined}/>
                </div>
        }
        </>
    )
}

export default TeamLeader;