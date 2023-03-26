import MenuButton from "./MenuButton";
function LeftMenu(){
    return(
        <div id={"left-menu"}
             className={"left-menu-style"}>

            {sessionStorage.getItem('USER') ?
                <>
            <MenuButton link={"/employees"} value={"Pracownicy"}/>
            <MenuButton link={'/employee/-1'} value={"Rejestracja"}/>
            <MenuButton link={"/schedule"} value={"Harmonogram osobisty"}/>
            <MenuButton link={"/company-schedule"} value={"Harmonogram firmy"}/>
            <MenuButton link={"/teams"} value={"Zespoły w firmie"}/>
            <MenuButton link={"/absences"} value={"Moje nieobecności"}/>
            <MenuButton link={"/requests"} value={"Wnioski pracowników"}/>
            <MenuButton link={"/grades"} value={"Oceny kwartalne"}/>
                    </>
                :
                <></>}


        </div>
    );
}
export default LeftMenu;