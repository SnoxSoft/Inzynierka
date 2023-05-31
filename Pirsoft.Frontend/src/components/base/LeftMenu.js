import MenuButton from "./MenuButton";
import {
    absencesMenu, accountHR, accountPresident, accountTeamLeader,
    companyScheduleMenu,
    employeeRegisterMenu,
    employeesMenu, gradesMenu,
    requestsMenu,
    scheduleMenu,
    teamsMenu
} from "../../GlobalAppConfig";
import {getLocalStorageKeyWithExpiry} from "../jwt/LocalStorage";
function LeftMenu({hideLeftPanel}){

    return(
        <>
            <div id={"left-menu"}
                 className={!hideLeftPanel ? "left-menu-style" : ""}>
                {!hideLeftPanel ?
                    <>
                    <MenuButton id={"menu-employees"} link={"/employees"} value={employeesMenu}/>
                        {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                            getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR ?
                    <MenuButton id={"menu-employee-register"} link={'/employee/-1'} value={employeeRegisterMenu}/> :
                                <></>
                        }
                    <MenuButton id={"menu-schedule"} link={"/schedule"} value={scheduleMenu}/>
                    <MenuButton id={"menu-company-schedule"} link={"/company-schedule"} value={companyScheduleMenu}/>
                    <MenuButton id={"menu-teams"} link={"/teams"} value={teamsMenu}/>
                    <MenuButton id={"menu-absences"} link={"/absences"} value={absencesMenu}/>
                        {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                        (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR ||
                            getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountPresident ||
                            getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountTeamLeader) ?
                    <MenuButton id={"menu-requests"} link={"/requests"} value={requestsMenu}/> :
                            <></>
                        }
                    {/*<MenuButton id={"menu-grades"} link={"/grades"} value={gradesMenu}/>*/}
                    </> :
                    <></>
                }
            </div>
        </>
    );
}
export default LeftMenu;