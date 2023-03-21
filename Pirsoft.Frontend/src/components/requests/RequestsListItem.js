import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";


const RequestsListItem = ({employeeRequest, old = false, setRequestsVisible, setRequestPickedData,
                              requestsTypes, requestsStatus, requestsColors}) => {

    const[showHideButtons, setShowHideButtons] = useState(false);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    // Kolor tła inny w przypadku rodzaju
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

    const [requestColor, setRequestColor] = useState("")

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
                if(requestColor === "" && requestsColors !== undefined) {
                    requestsColors.map((itemColor) => {
                        if (item.key === itemColor.type) {
                            setRequestColor(itemColor.color)
                        }
                    })
                }
            }
        })
    }

    function deleteAbsence() {

    }

    return <>
        <div className={'text-start m-4 items-center h-16 rounded-md flex hover:bg-brown-menu hover:border-2 hover:border-workday ' + (old &&  "text-weekend")}
             onMouseOver={showOptions} onMouseLeave={hideOptions}>
            <div className={"p-2 flex rounded-md basis-8/12"}>
                {employeeRequest.name}, {employeeRequest.team}, w terminie {employeeRequest.from} - {employeeRequest.to}, {employeeRequest.applicant}, {requestType}
            </div>
            <div className={"flex basis-1/12 place-content-center rounded-md " + (!old && requestColor )}>
                {requestStatus}
            </div>
            <div className={"flex justify-evenly basis-3/12"}>
                {showHideButtons && (
                    <>
                        {!old ?
                            <>
                        {employeeRequest.state === "accepted" &&
                            <ReusableButton value={"USUN"} onClick={() => deleteAbsence()}/>
                        }
                        {employeeRequest.state === "waiting" &&
                            <ReusableButton value={"WNIOSEK"} onClick={() => {
                                setRequestPickedData(employeeRequest)
                                setRequestsVisible(false);
                            }}/>
                        }
                            </> :
                        <></>
                    }
                    <ReusableButton value={"POKAŻ PROFIL"} link={`/employee/${employeeRequest.id}`}/>
                    </>
                )
                }
            </div>
        </div>
    </>
}

export default RequestsListItem;