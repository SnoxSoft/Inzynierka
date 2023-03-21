import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";


const AbsencesListItem = ({employeeAbsence, old = false, absencesTypes, absencesStatus, absencesColors}) => {

    const [showHideButtons, setShowHideButtons] = useState(false);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {

        setShowHideButtons(false);
    }

    // Akcja usunięcia nieobecności
    function deleteAbsence() {
        // przeładowanie dni wolnych
    }

    const [absenceColor, setAbsenceColor] = useState("")

    const [absenceType, setAbsenceType] = useState("")
    if (absenceType === "" && absencesTypes !== undefined) {
        absencesTypes.map((item) => {
            if (employeeAbsence.type === item.key) {
                setAbsenceType(item.value)
            }
        })
    }

    const [absenceStatus, setAbsenceStatus] = useState("")
    if (absenceStatus === "" && absencesStatus !== undefined) {
        absencesStatus.map((item) => {
            if (employeeAbsence.state === item.key) {
                setAbsenceStatus(item.value)
                if(absenceColor === "" && absencesColors !== undefined) {
                    absencesColors.map((itemColor) => {
                        if (item.key === itemColor.type) {
                            setAbsenceColor(itemColor.color)
                        }
                    })
                }
            }
        })
    }

    return <>
        <div className={'text-start m-4 items-center h-16 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            <div className={"p-2 flex rounded-md basis-8/12"}>
                 W terminie {employeeAbsence.from} - {employeeAbsence.to}, {absenceType}
            </div>
            <div className={"flex basis-1/12 place-content-center rounded-md " + (!old && absenceColor )}>
                {absenceStatus}
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