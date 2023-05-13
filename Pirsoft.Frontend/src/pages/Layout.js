import {Outlet, useSubmit} from "react-router-dom";
import Header from "../components/base/Header";
import LeftMenu from "../components/base/LeftMenu";
import {getLocalStorageKeyWithExpiry} from "../components/jwt/LocalStorage";
import {useEffect, useState} from "react";

const Layout = () => {

    const [hideLeftPanel, setHideLeftPanel] = useState(getLocalStorageKeyWithExpiry("loggedEmployee") === null)

    return (
        <div className={"flex flex-row h-screen"}
             style={{ minWidth:800} }>
            <LeftMenu hideLeftPanel={hideLeftPanel}/>
            <div className={"flex flex-col m-4 " + (!hideLeftPanel ? "ml-2" : "") + " w-full"}>
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
    );
}


export default Layout;