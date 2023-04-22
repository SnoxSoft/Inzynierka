import MenuButton from "./MenuButton";
import {
    absencesMenu,
    companyScheduleMenu,
    employeeRegisterMenu,
    employeesMenu, gradesMenu, requestsMenu,
    scheduleMenu,
    teamsMenu
} from "../../GlobalAppConfig";
function LeftMenu({hideLeftPanel = false}){

    let styleForLeftMenu = "left-menu-style";
    if(hideLeftPanel){
        styleForLeftMenu = ""
    }

    return(
        <div id={"left-menu"}
             className={styleForLeftMenu}>
            {sessionStorage.getItem('USER') ?
                <>
            <MenuButton id={"menu-employees"} link={"/employees"} value={employeesMenu}/>
            <MenuButton id={"menu-employee-register"} link={'/employee/-1'} value={employeeRegisterMenu}/>
            <MenuButton id={"menu-schedule"} link={"/schedule"} value={scheduleMenu}/>
            <MenuButton id={"menu-company-schedule"} link={"/company-schedule"} value={companyScheduleMenu}/>
            <MenuButton id={"menu-teams"} link={"/teams"} value={teamsMenu}/>
            <MenuButton id={"menu-absences"} link={"/absences"} value={absencesMenu}/>
            <MenuButton id={"menu-requests"} link={"/requests"} value={requestsMenu}/>
            <MenuButton id={"menu-grades"} link={"/grades"} value={gradesMenu}/>
                    </>
                :
                <></>}


        </div>
    );
}
export default LeftMenu;