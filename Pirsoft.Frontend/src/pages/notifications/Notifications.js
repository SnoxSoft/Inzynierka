import React, {useEffect, useState} from "react";
import {
    accountHR,
    accountPresident,
    accountTeamLeader,
    labelNotifications,
    pageNameNotifications,
    serverIp
} from "../../GlobalAppConfig";
import NotificationItem from "./NotificationItem";
import {fetchGetEmployeeNotifications} from "../../DataFetcher";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";
import {useNavigate} from "react-router-dom";

const Notifications = () => {
    document.title = pageNameNotifications;

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

    const [employeeNotifications, setEmployeeNotifications] = useState(null);
    const [notificationsList, setNotificationsList] = useState([]);

    function reloadNotifications(){
        setNotificationsList([]);
        if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null) {
            fetchGetEmployeeNotifications(getLocalStorageKeyWithExpiry("loggedEmployee").UserId)
                .then(employeeNotifications => {
                    let notificationsListLoad = [];
                    if (employeeNotifications !== undefined) {
                        employeeNotifications.map((employeeNotification, employeeNotificationId) => {
                            notificationsListLoad.push(
                                <>
                                    <NotificationItem id={"notifications-list-item-" + employeeNotificationId} employeeNotification={employeeNotification}
                                                      employeeNotifications={employeeNotifications}
                                                      setEmployeeNotifications={setEmployeeNotifications} />
                                    <hr />
                                </>
                            );
                        });
                    }
                    setNotificationsList(notificationsListLoad);
                });
        }
    }

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }

        if (employeeNotifications === null) {
            reloadNotifications()
        }
    },[])


    useEffect(() => {
        if(employeeNotifications !== null && employeeNotifications !== undefined)
            reloadNotifications()
    }, [employeeNotifications])

    return <>
        <div className={"every-page-on-scroll bg-blue-menu rounded-xl flex flex-col"}
             style={{minWidth: 800}}>
                <div className={"row-start-1 place-self-center text-workday font-bold p-4"}>
                    {labelNotifications}
                </div>
            <div id={"notifications-list"} className={"flex flex-col col-start-1 col-span-2 gap-2 p-2"}>
                {notificationsList}
            </div>
        </div>
    </>
}

export default Notifications;