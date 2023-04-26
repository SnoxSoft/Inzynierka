import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {labelDelete, labelFromTimeOfRequest, labelRequest, labelShowProfile} from "../../GlobalAppConfig";


const RequestsListItem = ({employeeRequest, old = false, setRequestsVisible, setRequestPickedData,
                              requestsTypes, requestsStatus, id}) => {

    const[showHideButtons, setShowHideButtons] = useState(false);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    const [requestType, setRequestType] = useState("")
    if (requestType === "" && requestsTypes !== undefined) {
        requestsTypes.map((item) => {
            if (employeeRequest.type === item.key) {
                setRequestType(item.value)
            }
        })
    }

    const [requestStatus, setRequestStatus] = useState("")
    if (requestStatus === "" && requestsStatus !== undefined) {
        requestsStatus.map((item) => {
            if (employeeRequest.state === item.key) {
                setRequestStatus(item.value)
            }
        })
    }

    function deleteAbsence() {

    }

    return <>
        <div id={id} className={'text-start m-4 items-center h-16 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday hover:cursor-default ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            <div className={"p-2 flex rounded-md basis-8/12 "}>
                {employeeRequest.name}, {employeeRequest.team}, {labelFromTimeOfRequest} {employeeRequest.from} - {employeeRequest.to}, {employeeRequest.applicant}, {requestType}
            </div>
            <div className={"flex basis-1/12 place-content-center rounded-md "}>
                {requestStatus}
            </div>
            <div className={"flex justify-evenly basis-3/12"}>
                {showHideButtons && (
                    <>
                        {!old ?
                            <>
                        {employeeRequest.state === "accepted" &&
                            <ReusableButton id={id + "-delete"} value={labelDelete} onClick={() => deleteAbsence()}/>
                        }
                        {employeeRequest.state === "waiting" &&
                            <ReusableButton id={id + "-request"} value={labelRequest} onClick={() => {
                                setRequestPickedData(employeeRequest)
                                setRequestsVisible(false);
                            }}/>
                        }
                            </> :
                        <></>
                    }
                    <ReusableButton id={"-profile"} value={labelShowProfile} link={`/employee/${employeeRequest.id}`}/>
                    </>
                )
                }
            </div>
        </div>
    </>
}

export default RequestsListItem;