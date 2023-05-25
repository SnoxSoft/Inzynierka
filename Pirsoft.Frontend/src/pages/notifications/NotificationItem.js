import React, {useState} from "react";
import ReusableButton from "../../components/base/ReusableButton";
import {AiTwotoneDelete} from "react-icons/ai";
import {serverIp} from "../../GlobalAppConfig";
import {endpointDeleteNotification, endpointGetNotifications} from "../../EndpointAppConfig";
import {useNavigate} from "react-router-dom";
import {fetchDeleteNotification} from "../../DataFetcher";

const NotificationItem = ({id, employeeNotification, employeeNotifications, setEmployeeNotifications}) => {
    const navigate = useNavigate()

    const[showHideButtons, setShowHideButtons] = useState(true);
    const showOptions = () => {
        setShowHideButtons(true);
    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    // Endpoint do usuwania wposu powiadomienia
    function deleteNotification(id){
        fetchDeleteNotification(id).then(r => {
        })

        let employeeNotificationsCopy = [];
        employeeNotifications.forEach((n) => {
           if(id !== n.notification_id){
               employeeNotificationsCopy.push(n)
           }
        });
        setEmployeeNotifications(employeeNotificationsCopy)

        if(employeeNotificationsCopy.length === 0){
            navigate("/");
        }
    }

    return (
        <div id={id} className={"text-start items-center rounded-md flex hover:cursor-default hover:border-2 hover:border-workday"}>
            <div className={"p-2 flex rounded-md basis-11/12 text-workday"}>
                {employeeNotification.notification_name}
            </div>
            <div className={"flex justify-center basis-1/12"}>
                {showHideButtons && (
                    <ReusableButton
                        id={id + "-delete"}
                        value={<AiTwotoneDelete />}
                        onClick={() => deleteNotification(employeeNotification.notification_id)}
                        formatting={"border-2 border-b-workday min-w-min w-8 h-8"}/>
                )
                }
            </div>
        </div>
    )
}

export default NotificationItem;