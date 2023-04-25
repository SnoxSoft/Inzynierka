import {Link, Outlet} from "react-router-dom";
import Header from "../components/base/Header";
import LeftMenu from "../components/base/LeftMenu";

const Layout = () => {

    let hideLeftPanel = sessionStorage.getItem('USER') === null
    let smallLeftMargin = "ml-2"
    if(hideLeftPanel){
        smallLeftMargin = ""
    }
    return (
        <div className={"flex flex-row h-screen"}
             style={{ minWidth:800} }>
            <LeftMenu hideLeftPanel={hideLeftPanel}/>
            <div className={"flex flex-col m-4 " + smallLeftMargin + " w-full"}>
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default Layout;