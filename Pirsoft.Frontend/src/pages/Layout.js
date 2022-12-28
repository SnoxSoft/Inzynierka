import {Outlet} from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
    return (
        <>
            <div className={"flex flex-row h-screen"}>
                <div className={"basis-1/6 bg-indigo-500 h-auto text-center p-5"}>
                    AKCJE
                </div>
                <div className={"flex flex-col basis-5/6 "}>
                    <Header></Header>
                    <div className={"flex h-screen w-full bg-fuchsia-600"}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;