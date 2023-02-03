import {Link, Outlet} from "react-router-dom";
import Header from "../components/base/Header";
import LeftMenu from "../components/base/LeftMenu";

const Layout = () => {

    return (
        <>
            <div className={"flex flex-row min-h-screen max-h-screen"}>
                <LeftMenu />
                <div className={"grow flex flex-col m-4"}>
                    <div className={"h-24 bg-workday grid grid-rows-1 place-items-center"}>
                        <Header></Header>
                    </div>
                    <div className={"bg-workday"}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;