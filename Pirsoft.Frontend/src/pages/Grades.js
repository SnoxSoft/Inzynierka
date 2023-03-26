import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import ReceivedGrades from "./grades/ReceivedGrades";

const Request = () =>{
    document.title = "PIRSOFT: Oceny kwartalne";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("tabs-component", {setWantedHeightForList});
    }, []);

    const [openTab, setOpenTab] = React.useState(1);

    return(
        <div id={"grades"}
             className={"every-page-on-scroll flex text-center flex-wrap text-workday p-4 w-full"}
             style={{minWidth: 800}}>
                <div className="w-full">
                    <ul className="flex list-none flex-wrap flex-row">
                        <li className="flex-auto text-center">
                            <a className={"font-bold py-4 rounded-t-md block border-t-2 border-l-2 border-workday "+
                                    (openTab === 1
                                        ? "bg-brown-menu border-r-2"
                                        : "bg-dayoffmonth")}
                                onClick={e => {e.preventDefault();setOpenTab(1);}}
                                href="#link1">
                                Wystawione oceny
                            </a>
                        </li>
                        <li className="mr-2 flex-auto text-center">
                            <a className={"font-bold py-4 rounded-t-md block border-t-2 border-r-2  border-workday " +
                                    (openTab === 2
                                        ? "bg-brown-menu border-l-2"
                                        : "bg-dayoffmonth")}
                                onClick={e => {e.preventDefault();setOpenTab(2);}}
                                href="#link2">
                                Otrzymane oceny
                            </a>
                        </li>
                        <ReusableButton value={"Wystaw ocenę"}/>
                    </ul>
                    <div id={"tabs-component"} className={"flex flex-col bg-brown-menu rounded-b-md rounded-tr-md border-2 border-workday"}
                    style={{height:wantedHeightsForList-18}}>
                        <div className="flex-auto">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    Brak
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <ReceivedGrades heightFromParent={wantedHeightsForList-18} />
                                </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}
export default Request;