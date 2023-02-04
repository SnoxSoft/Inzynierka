import MenuButton from "./MenuButton";
function LeftMenu(){
    return(
        <div id={"left-menu"}
             className={"grow-0 w-64 bg-brown-menu rounded-md grid grid-cols-1 place-items-center mt-4 ml-4 mb-4 border-2 border-b-workday"}>
            <MenuButton link={"/employees"} value={"PRACOWNICY"}/>
            <MenuButton link={""} value={"AKCJA 1"}/>
            <MenuButton link={""} value={"AKCJA 2"}/>
            <MenuButton link={""} value={"AKCJA 3"}/>
        </div>
    );
}
export default LeftMenu;