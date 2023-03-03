import MenuButton from "./MenuButton";
function LeftMenu(){
    return(
        <div id={"left-menu"}
             className={"grow-0 w-64 bg-brown-menu rounded-md grid grid-cols-1 place-items-center mt-4 ml-4 mb-4 border-2 border-b-workday"}>

            {sessionStorage.getItem('USER') ?
                <>
            <MenuButton link={"/employees"} value={"PRACOWNICY"}/>
            <MenuButton link={'/employee/-1'} value={"REJESTRACJA"}/>
            <MenuButton link={"schedule"} value={"HARMONOGRAM OSOBISTY"}/>
            <MenuButton link={"company-schedule"} value={"HARMONOGRAM FIRMY"}/>
            <MenuButton link={"teams"} value={"ZESPOŁY W FIRMIE"}/>
            <MenuButton link={"/absences"} value={"MOJE NIEOBECNOSCI"}/>
            <MenuButton link={"/requests"} value={"WNIOSKI PRACOWNIKOW"}/>
                    </>
                :
                <></>}


        </div>
    );
}
export default LeftMenu;