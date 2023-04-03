import MenuButton from "./MenuButton";
import {
    absencesMenu,
    companyScheduleMenu,
    employeeRegisterMenu,
    employeesMenu, gradesMenu, requestsMenu,
    scheduleMenu,
    teamsMenu
} from "../../GlobalAppConfig";
function LeftMenu(){
    return(
        <div id={"left-menu"}
             className={"left-menu-style"}>

            {sessionStorage.getItem('USER') ?
                <>
            <MenuButton link={"/employees"} value={employeesMenu}/>
            <MenuButton link={'/employee/-1'} value={employeeRegisterMenu}/>
            <MenuButton link={"/schedule"} value={scheduleMenu}/>
            <MenuButton link={"/company-schedule"} value={companyScheduleMenu}/>
            <MenuButton link={"/teams"} value={teamsMenu}/>
            <MenuButton link={"/absences"} value={absencesMenu}/>
            <MenuButton link={"/requests"} value={requestsMenu}/>
            <MenuButton link={"/grades"} value={gradesMenu}/>
                    </>
                :
                <></>}


        </div>
    );
}
export default LeftMenu;