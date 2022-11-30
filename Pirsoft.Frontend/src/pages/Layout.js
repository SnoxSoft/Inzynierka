import {Outlet} from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
    return (
        <>
            <div className={"flex flex-row"}>
                <div className={"basis-1/6 bg-indigo-500 h-auto text-center p-5"}>
                    AKCJE
                </div>
                <div className={"container mx-auto text-center basis-5/6"}>
                    <Header></Header>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;