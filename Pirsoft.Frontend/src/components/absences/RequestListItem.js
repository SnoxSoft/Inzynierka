import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {
    labelDelete,
    labelFromTimeOfAbsence,
    labelFromTimeOfRequest,
    labelRequest,
    labelShowProfile
} from "../../GlobalAppConfig";

const RequestListItem = ({employeeAbsence, employeeAbsenceTeam, old = false,
              absencesTypes, requestsStatus, id, window,
                             setRequestsVisible, setRequestPickedData, employeeName, employeeTeam}) => {

    const [showHideButtons, setShowHideButtons] = useState(false);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    const [absenceType, setAbsenceType] = useState("")
    if (absenceType === "" && absencesTypes !== undefined && absencesTypes !== null) {
        absencesTypes.map((item) => {
            if (employeeAbsence.absence_type_id === item.absence_type_id) {
                setAbsenceType(item.absence_type_name)
            }
        })
    }

    const [requestStatus, setRequestStatus] = useState("")
    if (requestStatus === "" && requestsStatus !== undefined && requestStatus !== null) {
        requestsStatus.map((item) => {
            if (employeeAbsence.absence_status_id.toString().trim() === item.absence_status_id.toString().trim()) {
                setRequestStatus(item.absence_status_name)
            }
        })
    }

    function deleteAbsence() {

    }

    return <>
        <div id={id} className={'text-start m-4 items-center h-16 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            {window === "absences" ?
                <div className={"p-2 flex rounded-md basis-8/12"}>
                    {labelFromTimeOfAbsence} {employeeAbsence.absence_start_date.substring(0, 10)} - {employeeAbsence.absence_end_date.substring(0, 10)}, {absenceType}
                </div> :
                <div className={"p-2 flex rounded-md basis-8/12 flex-col cursor-default"}>
                    <div>
                        {employeeName}, {employeeTeam},
                    </div>
                    <div>
                        {absenceType}, {labelFromTimeOfRequest} {employeeAbsence.absence_start_date.substring(0, 10)} - {employeeAbsence.absence_end_date.substring(0, 10)}
                    </div>

                </div>
            }
            <div className={"flex basis-1/12 place-content-center rounded-md cursor-default "}>
                {requestStatus}
            </div>
            <div className={"flex justify-evenly basis-3/12"}>
                {showHideButtons && (
                    <>
                        {!old ?
                            <>
                                {window === "absences" ?
                                    <ReusableButton id={id + "-delete"} value={labelDelete}
                                                    onClick={() => deleteAbsence()}/> :
                                    <>

                                        {employeeAbsence.absence_status_id !== 1 &&
                                            <ReusableButton id={id + "-delete"} value={labelDelete}
                                                    onClick={() => deleteAbsence()}/>
                                        }

                                        {employeeAbsence.absence_status_id === 1 &&
                                        <ReusableButton id={id + "-request"} value={labelRequest}
                                        onClick={() => {
                                            setRequestPickedData(employeeAbsence)
                                            setRequestsVisible(false);
                                            }
                                                }/>
                                        }
                                        <ReusableButton id={"-profile"} value={labelShowProfile}
                                                        link={`/employee/${employeeAbsence.employee_owner_id}`}/>
                                    </>
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

export default RequestListItem;