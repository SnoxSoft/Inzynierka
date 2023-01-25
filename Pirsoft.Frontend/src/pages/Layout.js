import {Link, Outlet} from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
    return (
        <>
            <div className={"flex h-screen"}>
               <div className={"flex w-64 bg-workday pt-4 pl-4 pb-4"}>
                   <div class={"w-64 bg-brown-menu rounded-md grid grid-cols-1 place-items-center border-2 border-b-workday"}>
                       <Link to={"/employees"}><p className={"text-workday font-bold border-y-2 p-4"} >PRACOWNICY</p></Link>
                       <p className={"text-workday font-bold border-y-2 p-4"}>AKCJA 2</p>
                       <p className={"text-workday font-bold border-y-2 p-4"}>AKCJA 3</p>
                   </div>
                </div>
                <div className={"flex flex-col w-screen"}>
                    <div className={"h-24 bg-workday grid grid-rows-1 place-items-center"}>
                        <Header></Header>
                    </div>
                    <div className={"flex bg-workday h-screen"}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;