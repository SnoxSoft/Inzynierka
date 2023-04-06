import React, {useEffect, useState} from "react";
import {labelNotifications, pageNameNotifications, serverIp} from "../../GlobalAppConfig";
import NotificationItem from "./NotificationItem";
import {endpointGetNotifications} from "../../EndpointAppConfig";

const Notifications = (props) => {
    document.title = pageNameNotifications;

    const [employeeNotifications, setEmployeeNotifications] = useState(Array);
    const fetchingEmployeeNotifications = () => {
        fetch(serverIp + "/" + endpointGetNotifications + "/" + sessionStorage.getItem("USER"))
            .then((response) => {response.json()
                .then((response) => {
                    setEmployeeNotifications(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
        //reloading notifications endpoint
    }
    const [notificationsList, setNotificationsList] = useState([]);

    if (employeeNotifications[0] === undefined) {
        fetchingEmployeeNotifications()
    }

    function reloadNotifications(){
        let notificationsListLoad = [];
        for (const i of employeeNotifications) {
            notificationsListLoad.push(
                <>
                    <NotificationItem employeeNotification={i}
                                      employeeNotifications={employeeNotifications}
                                      setEmployeeNotifications={setEmployeeNotifications} />
                    <hr />
                </>
            )
        }
        setNotificationsList(notificationsListLoad);
    }

    if (employeeNotifications[0] !== undefined && notificationsList.length === 0) {
        reloadNotifications();
    }

    useEffect(() => {
        reloadNotifications()
    }, [employeeNotifications])

    return <>
        <div className={"every-page-on-scroll bg-blue-menu rounded-xl flex flex-col hover:cursor-default"}
             // style={{minHeight:300, maxHeight: 800, height: 800}}
        >
                <div className={"row-start-1 place-self-center text-workday font-bold p-4"}>
                    {labelNotifications}
                </div>
                {/*<div className={"flex flex-row row-start-1 p-2"}>*/}
                {/*    <ReusableButton value={<CgClose  size={30}/>}*/}
                {/*                    onClick={props.onClose} formatting={""} color={""}/>*/}
                {/*</div>*/}

            <div className={"flex flex-col col-start-1 col-span-2 gap-2 p-2"}>

            {/*max-h-full overflow-y-auto"}>*/}
                {notificationsList}
            </div>
        </div>
    </>
}

export default Notifications;