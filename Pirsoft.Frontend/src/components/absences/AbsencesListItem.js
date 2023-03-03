import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";


const AbsencesListItem = ({employeeAbsence, old = false}) => {

    const[showHideButtons, setShowHideButtons] = useState(false);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    // Background color changing depending on the state of the request
    function colorBackground(state){
        if (state === "refused"){
            return 'bg-red-900'
        }
        if (state === "accepted"){
            return 'bg-green-500'
        }
        if (state === "waiting"){
            return 'bg-blue-500'
        }
    }

    // for renaming status of absence
    function renameType(type) {
        if(type === 'sick'){
            return 'urlop chorobowy'
        }
        if(type === 'dayoff'){
            return 'urlop wypoczynkowy'
        }
        if(type === 'demand'){
            return 'urlop na żądanie'
        }
        if(type === 'absent'){
            return 'nieobecność'
        }
        return type
    }

    //for renaming status of absence
    function renameStatus(status) {
        if(status === 'refused'){
            return 'odrzucony'
        }
        if(status === 'accepted'){
            return 'zaakceptowany'
        }
        if(status === 'waiting'){
            return 'oczekujący'
        }
        return status
    }

    // Will need to replace with endpoint access and future pages
    function deleteAbsence(){
        //endpoint for removing dayoff
        //reloading days off and demand days endpoint
    }

    return <>
        <div className={'text-start m-4 items-center h-16 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            <div className={"p-2 flex rounded-md basis-8/12"}>
                 W terminie {employeeAbsence.from} - {employeeAbsence.to}, {renameType(employeeAbsence.type)}
            </div>
            <div className={"flex basis-1/12 place-content-center rounded-md " + (!old && colorBackground(employeeAbsence.state) )}>
                {renameStatus(employeeAbsence.state)}
            </div>
            <div className={"flex justify-evenly basis-3/12"}>
                {showHideButtons && (
                    <>
                        {!old ?
                            <>
                                {employeeAbsence.state === "accepted" &&
                                    <ReusableButton value={"USUN"} onClick={() => deleteAbsence()}/>
                                }
                                {employeeAbsence.state === "waiting" &&
                                    <ReusableButton value={"USUN"} onClick={() => deleteAbsence()}/>
                                }
                            </> :
                            <></>
                        }
                    </>
                )
                }
            </div>
        </div>
    </>
}

export default AbsencesListItem;