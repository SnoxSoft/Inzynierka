import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";
import {useState} from "react";
import TeamEmployeeEditButton from "./TeamEmployeeEditButtons";

const TeamLeader = ({disableChange, value, setLeaderData, setEmployeesFinderShowing}) => {
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
                <ReusableButton value={<HiPlus/>}
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
                    {/* zostawiam ten kawałek kodu w razie gdyby coś nie działało jak należy*/}
                    {/*{showOptions ?*/}
                    {/*    <div className={"flex flex-row gap-4 place-content-center"}>*/}
                    {/*        <ReusableButton value={"ZMIEŃ"} formatting={"h-6 w-16 border-2 border-gray-400"}*/}
                    {/*        onClick={() => setValuesForPickerAndOpenIt()}/>*/}
                    {/*        <ReusableButton value={"USUŃ"} formatting={"h-6 w-16 border-2 border-gray-400"}*/}
                    {/*        onClick={() => {setLeaderData(undefined)}}/>*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    <></>*/}
                    {/*}*/}
                    <TeamEmployeeEditButton showOptions={showOptions}
                                            changeMethod={setValuesForPickerAndOpenIt}

                                            deleteMethod={setLeaderData}
                                            deleteValue={undefined}/>
                </div>
        }
        </>
    )
}

export default TeamLeader;