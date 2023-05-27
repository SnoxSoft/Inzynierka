import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {
    labelCreate,
    labelDaysTaken,
    labelDelete, labelEndRequest,
    labelFromTimeOfAbsence,
    labelFromTimeOfRequest,
    labelRequest,
    labelShowProfile, optionsForDateYYYY_MM_DD, questionDoDeleteRequest, questionDoEndRequest
} from "../../GlobalAppConfig";
import {fetchDeleteAbsence, fetchPutEditAbsence} from "../../DataFetcher";
import {Popup} from "semantic-ui-react";
import {options} from "axios";
import {getLocalStorageKeyWithExpiry} from "../jwt/LocalStorage";

const RequestListItem = ({employeeAbsence, old = false,
              absencesTypes, requestsStatus, id, window,
                             setRequestsVisible, setRequestPickedData, employeeName, employeeTeam,
                             filtrRequests, employeeRole = ""}) => {

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

    function endAbsence() {
        const query = new URLSearchParams();
        query.set("employeeApproverId", getLocalStorageKeyWithExpiry("loggedEmployee").UserId);
        query.set("absenceStatusId", 3);
        query.set("endDateTime", new Date().toLocaleDateString("sv", optionsForDateYYYY_MM_DD));

        fetchPutEditAbsence(employeeAbsence.absence_id, query)
            .then(r => {
                filtrRequests()
            })
    }

    function deleteAbsence() {
        fetchDeleteAbsence(employeeAbsence.absence_id)
            .then(r => {
                filtrRequests()
            })
    }

    const [showQuestion, setShowQuestion] = useState(false)

    const buildPopup = () => {
        return <div className={"bg-brown-menu flex flex-col items-center text-workday gap-2 p-1 mr-2 hover:bg-brown-menu hover:border-2 hover:border-workday hover:rounded-md "}>
            <div className={"text-center cursor-default"}>Czy chcesz dzisiaj przerwać urlop?</div>
            <div className={"text-center cursor-default"}>Od jutra nastąpi zwolnienie pozostałych dni</div>
            <ReusableButton value={"Tak"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}/>
            </div>
    }

    // Obliczennie daty to zakończenia urlopu
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return <>
        <div id={id} className={'text-start m-4 items-center h-28 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            {window === "absences" ?

                <div className={"p-2 flex rounded-md basis-8/12 flex-col cursor-default"}>
                    <div>
                        {absenceType}{(employeeAbsence.duration.toString() !== "0") ? ", " + labelDaysTaken + " " + employeeAbsence.duration : ""}
                    </div>
                    <div>
                        {labelFromTimeOfAbsence}: {employeeAbsence.absence_start_date.substring(0, 10)} - {employeeAbsence.absence_end_date.substring(0, 10)}
                    </div>

                </div> :
                <div className={"p-2 flex rounded-md basis-8/12 flex-col cursor-default"}>
                    <div>
                        {employeeName}, {employeeTeam}, {employeeRole}
                    </div>
                    <div>
                        {absenceType}{(employeeAbsence.duration.toString() !== "0") ? ", " + labelDaysTaken + " " + employeeAbsence.duration : ""}
                    </div>
                    <div>
                        {labelFromTimeOfAbsence}: {employeeAbsence.absence_start_date.substring(0, 10)} - {employeeAbsence.absence_end_date.substring(0, 10)}
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
                                    employeeAbsence.absence_status_id.toString().trim() !== "3" ?
                                        <>
                                        {showQuestion ?
                                                <div className={"flex flex-col items-center justify-center text-workday gap-1 p-1 mr-2  h-28 "}>
                                                    <div className={"text-center cursor-default"}>{questionDoDeleteRequest}</div>
                                                    <div className={"flex flex-row gap-1"}>
                                                        <ReusableButton value={"Tak"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                                                        onClick={() => {deleteAbsence()}}/>
                                                        <ReusableButton value={"Nie"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                                                        onClick={() => {setShowQuestion(!showQuestion)}}/>
                                                    </div>
                                                </div>:
                                            <ReusableButton id={id + "-delete"} value={labelDelete}
                                                            onClick={() => {setShowQuestion(!showQuestion)}}/>
                                        }
                                            </>
                                     :
                                    <></> :
                                    <>

                                        {employeeAbsence.absence_status_id.toString().trim() !== "1" ?
                                            <>
                                                {showQuestion ?
                                                    <div className={"flex flex-col items-center justify-center text-workday gap-1 p-1 mr-2  h-28 "}>
                                                        <div className={"text-center cursor-default"}>{questionDoDeleteRequest}</div>
                                                        <div className={"flex flex-row gap-1"}>
                                                            <ReusableButton value={"Tak"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                                                            onClick={() => {deleteAbsence()}}/>
                                                            <ReusableButton value={"Nie"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                                                            onClick={() => {setShowQuestion(!showQuestion)}}/>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        <ReusableButton id={id + "-delete"} value={labelDelete}
                                                                        onClick={() => setShowQuestion(!showQuestion)}/>
                                                        <ReusableButton id={"-profile"} value={labelShowProfile}
                                                                        link={`/employee/${employeeAbsence.employee_owner_id}`}/>
                                                    </>
                                                }
                                            </>

                                            :
                                            <></>
                                        }

                                        {employeeAbsence.absence_status_id === 1 &&
                                            <>
                                            <ReusableButton id={id + "-request"} value={labelRequest}
                                            onClick={() => {
                                                setRequestPickedData(employeeAbsence)
                                                setRequestsVisible(false);}}/>
                                            <ReusableButton id={"-profile"} value={labelShowProfile}
                                                link={`/employee/${employeeAbsence.employee_owner_id}`}/>
                                            </>
                                        }
                                    </>
                                }
                            </> :
                            <>
                                {employeeAbsence.absence_end_date >= tomorrow.toLocaleDateString("sv", optionsForDateYYYY_MM_DD) && window !== "absences" ?
                                    <>
                                        {showQuestion ?
                                            <div className={"flex flex-col items-center justify-center text-workday gap-1 p-1 mr-2  h-28 "}>
                                                <div className={"text-center cursor-default"}>{questionDoEndRequest}</div>
                                                    <ReusableButton value={"Tak"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                                    onClick={() => {endAbsence()}}/>
                                            </div>
                                                :
                                            <ReusableButton id={"-end"} value={labelEndRequest} onClick={() => {setShowQuestion(!showQuestion)}}/>
                                        }
                                    </>
                                        :
                                    <></>
                                }
                                {employeeAbsence.absence_end_date <= tomorrow.toLocaleDateString("sv", optionsForDateYYYY_MM_DD) && window !== "absences" &&
                                    employeeAbsence.absence_status_id === 3?
                                    <>
                                        {showQuestion ?
                                            <div className={"flex flex-col items-center justify-center text-workday gap-1 p-1 mr-2  h-28 "}>
                                                <div className={"text-center cursor-default"}>{questionDoDeleteRequest}</div>
                                                <ReusableButton value={"Tak"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                                                onClick={() => {deleteAbsence()}}/>
                                            </div>
                                            :
                                            <ReusableButton id={"-delete"} value={labelDelete} onClick={() => {setShowQuestion(!showQuestion)}}/>
                                        }
                                    </>
                                    :
                                    <></>
                                }
                            </>
                        }
                    </>
                )
                }
            </div>
        </div>
    </>
}

export default RequestListItem;