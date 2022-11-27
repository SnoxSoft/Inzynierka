import {Outlet} from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
    return (
        <>
            <Header></Header>
            <div className={"flex flex-row"}>
                <div className={"basis-1/6 bg-indigo-500 h-screen"}>
                    AKCJE
                </div>
                <div className={"container mx-auto text-center basis-5/6"}>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default Layout;