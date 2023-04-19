import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import ReceivedGrades from "./grades/ReceivedGrades";
import GivenGrades from "./grades/GivenGrades";
import GiveGradesWindow from "./grades/GiveGradesWindow";
import {labelGivenGrades, labelReceivedGrades, pageNameGrades} from "../GlobalAppConfig";

const Grades = () =>{
    document.title = pageNameGrades;

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("tabs-component", {setWantedHeightForList});
    }, []);

    const [openTab, setOpenTab] = React.useState(1);
    const [gradesVisible, setGradesVisible] = useState(true)

    const[gradeMode, setGradeMode] = useState("view")
    const[pickedGradeData, setPickedGradeData] = useState(undefined)

    return(
        <>
            {gradesVisible ?
            <div id={"grades"}
                 className={"every-page-on-scroll flex text-center flex-wrap text-workday p-4 w-full"}
                 style={{minWidth: 800}}>
                <div className="w-full">
                    <ul className="flex list-none flex-wrap flex-row">
                        <li className="flex-auto text-center">
                            <a id={"grades-open-given-grades"} className={"font-bold py-4 rounded-t-md block border-t-2 border-l-2 border-workday hover:bg-brown-menu "+
                                    (openTab === 1
                                        ? "bg-brown-menu border-r-2"
                                        : "bg-dayoffmonth")}
                                onClick={e => {e.preventDefault();setOpenTab(1);}}
                                href="#link1">
                                {labelGivenGrades}
                            </a>
                        </li>
                        <li className="mr-2 flex-auto text-center">
                            <a id={"grades-open-received-grades"} className={"font-bold py-4 rounded-t-md block border-t-2 border-r-2  border-workday hover:bg-brown-menu " +
                                    (openTab === 2
                                        ? "bg-brown-menu border-l-2"
                                        : "bg-dayoffmonth")}
                                onClick={e => {e.preventDefault();setOpenTab(2);}}
                                href="#link2">
                                {labelReceivedGrades}
                            </a>
                        </li>
                        <ReusableButton id={"grades-give-grade"}
                            value={"Wystaw ocenę"} onClick={() => {
                            setGradeMode("create");
                            setPickedGradeData(undefined);
                            setGradesVisible(false)}}/>
                    </ul>
                    <div id={"tabs-component"} className={"flex flex-col bg-brown-menu rounded-b-md rounded-tr-md border-2 border-workday"}
                    style={{height:wantedHeightsForList-18}}>
                        <div className="flex-auto">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <GivenGrades heightFromParent={wantedHeightsForList-18}
                                    setGradeMode={setGradeMode}
                                    setPickedGradeData={setPickedGradeData}
                                    setGradesVisible={setGradesVisible}/>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <ReceivedGrades heightFromParent={wantedHeightsForList-18}
                                    setGradeMode={setGradeMode}
                                    setPickedGradeData={setPickedGradeData}
                                    setGradesVisible={setGradesVisible}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                :
                <GiveGradesWindow setGradesVisible={setGradesVisible} mode={gradeMode} pickedGradeData={pickedGradeData}/>
            }
        </>
    )
}
export default Grades;