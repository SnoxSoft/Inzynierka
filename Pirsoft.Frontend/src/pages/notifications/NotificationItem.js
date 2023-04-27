import React, {useState} from "react";
import ReusableButton from "../../components/base/ReusableButton";
import {AiTwotoneDelete} from "react-icons/ai";
import {serverIp} from "../../GlobalAppConfig";
import {endpointDeleteNotification, endpointGetNotifications} from "../../EndpointAppConfig";
import {useNavigate} from "react-router-dom";

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
        // Wysyłanie informacji na backend o odznaczeniu endpointa
        fetch(serverIp + "/" + endpointDeleteNotification + "/" + id)
            .catch((err) => {
                console.log(err.message);
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

        // Bez przeładowania całej listy, po prostu zniknie opcja z listy załadowanej a w tle wyśle się usunięcie
    }

    return (
        <div id={id} className={"text-start items-center rounded-md flex hover:cursor-default hover:bg-dayoffmonth"}
             // bg-brown-menu border-2 hover:border-workday hover:cursor-pointer"}
             // onMouseOver={showOptions} onMouseLeave={hideOptions}
        >
            <div className={"p-2 flex rounded-md basis-11/12 text-workday"}>
                {employeeNotification.notification_name}
            </div>
            <div className={"flex justify-center basis-1/12"}>
                {showHideButtons && (
                    <ReusableButton
                        id={id + "-delete"}
                        value={<AiTwotoneDelete />}
                        onClick={() => deleteNotification(employeeNotification.id)}
                        formatting={"border-2 border-b-workday min-w-min w-8 h-8"}/>
                )
                }
            </div>
        </div>
    )
}

export default NotificationItem;