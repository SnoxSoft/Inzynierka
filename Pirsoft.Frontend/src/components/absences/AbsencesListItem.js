import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {labelDelete, labelFromTimeOfAbsence} from "../../GlobalAppConfig";

const AbsencesListItem = ({employeeAbsence, old = false, absencesTypes, absencesStatus, id}) => {

    const [showHideButtons, setShowHideButtons] = useState(false);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {

        setShowHideButtons(false);
    }

    // Akcja usunięcia nieobecności
    function deleteAbsence() {
        // Przeładowanie dni wolnych
    }

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
            }
        })
    }

    return <>
        <div id={id} className={'text-start m-4 items-center h-16 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            <div className={"p-2 flex rounded-md basis-8/12"}>
                {labelFromTimeOfAbsence} {employeeAbsence.from} - {employeeAbsence.to}, {absenceType}
            </div>
            <div className={"flex basis-1/12 place-content-center rounded-md "}>
                {absenceStatus}
            </div>
            <div className={"flex justify-evenly basis-3/12"}>
                {showHideButtons && (
                    <>
                        {!old ?
                            <>
                                {employeeAbsence.state === "accepted" ||
                                    employeeAbsence.state === "waiting" ?
                                    <ReusableButton id={id + "-delete"} value={labelDelete} onClick={() => deleteAbsence()}/> :
                                    <></>
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