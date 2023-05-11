import {
    gradeMenu,
    labelApprove,
    labelClose,
    labelDisapprove, pageNameGiveGradesWindowGive,
    pageNameGiveGradesWindowView, quarters,
    serverIp
} from "../../GlobalAppConfig";
import ReusableButton from "../../components/base/ReusableButton";
import {CgClose} from "react-icons/cg";
import PersonData from "../../components/giveGrade/PersonData";
import YearQuarters from "../../components/giveGrade/YearQuarters";
import GradeTitle from "../../components/giveGrade/GradeTitle";
import GradeMessage from "../../components/giveGrade/GradeMessage";
import GradeRating from "../../components/grades/GradeRating";
import {useEffect, useState} from "react";
import EmployeesFinder from "../EmployeesFinder";

function GiveGradesWindow({setGradesVisible, mode = "view", pickedGradeData}){

    const [title, setTitle] = useState("")
    if(title === ""){
        if(mode === "view"){
            setTitle(pageNameGiveGradesWindowView)
        }
        else {
            setTitle(pageNameGiveGradesWindowGive)
        }
    }

    document.title = title

    const[pickedPersonId, setPickedPersonId] = useState("")
    const[pickedPersonName, setPickedPersonName] = useState("")
    const[pickedQuartet, setPickedQuartet] = useState("")
    const[gradeTitle, setGradeTitle] = useState("")
    const[gradeMessage, setGradeMessage] = useState("")
    const[gradeRating, setGradeRating] = useState("")

    const[availableQuartets, setAvailableQuartets] = useState(quarters)

    async function loadAvailableQuartets(){
        let availableQuartetsLoad = []
        if(pickedPersonId !== ""){
            const response = await fetch(serverIp + "/getAvailableQuartets/" + pickedPersonId)
            const quarters = await response.json();
             quarters.forEach((q) => {
                 availableQuartetsLoad.push(q.quarter_name)
             })
        }

        if(pickedPersonId !== ""){
            setAvailableQuartets(availableQuartetsLoad)
        }
        else {
            setAvailableQuartets(quarters)
        }

    }

    useEffect(() => {
        loadAvailableQuartets()
    }, [pickedPersonId])

    function closeGradeWindow(){
        setGradesVisible(true);
    }

    function giveGrade(){
        if(pickedPersonId !== ""){
            setGradesVisible(true);

            // Podpiąć wysłanie danych na endpoint
        }
    }

    const [hideFinder, setHideFinder] = useState(false)

    return(
        <>
            {!hideFinder ?
            <div id={"give-grade"}
             className={"every-page-on-scroll flex p-4 gap-2 text-center flex-col bg-blue-menu text-workday"}
             style={{minWidth: 800}}>
            <div className={"grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center hover:cursor-default"}>
                    {gradeMenu}
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton
                        id={"give-grade-close-corner"}
                        value={<CgClose  size={30}/>}
                        onClick={() => setGradesVisible(true)}
                        formatting={""} color={""}/>
                </div>
            </div>

            <PersonData id={"give-grade-person"} find={mode === "create"}
                        value={pickedGradeData ? pickedGradeData.grade_creator_name : pickedPersonName}
                        onChange={setPickedPersonName}
                        setHideFinder={setHideFinder}
                        setPersonId={setPickedPersonId}/>
            <YearQuarters id={"give-grade-quarters"} createMode={mode === "create"}
                          value={pickedGradeData ? pickedGradeData.quarter_name : pickedQuartet}
                          onChange={setPickedQuartet}
                          availableQuartets={availableQuartets}/>
            <GradeTitle id={"give-grade-title"} enable={mode === "create"}
                        value={pickedGradeData ? pickedGradeData.grade_title : gradeTitle}
                        onChange={setGradeTitle}
            />
            <GradeMessage id={"give-grade-message"} enable={mode === "create"}
                          value={pickedGradeData ? pickedGradeData.grade_message : gradeMessage}
                          onChange={setGradeMessage}
            />
            <GradeRating id={"give-grade-rating"} placing={"place-self-center"}
                         value={pickedGradeData ? pickedGradeData.quarter_grade : gradeRating}
                         onChange={setGradeRating}
                         createMode={mode === "create"}
            />
            <br/>
            <div className={"flex justify-evenly"}>
                {
                    mode === "create" ?
                        <>
                            <ReusableButton
                                id={"give-grade-disapprove"}
                                value={labelDisapprove} onClick={() => closeGradeWindow()}/>
                            <ReusableButton
                                id={"give-grade-approve"}
                                value={labelApprove} onClick={() => giveGrade()}/>
                        </> :
                            <ReusableButton
                                id={"give-grade-close"}
                                value={labelClose} onClick={() => setGradesVisible(true)}/>
                }
            </div>
        </div> :
                <EmployeesFinder title={title}
                                 setTitle={setTitle}
                                 setEmployeesFinderShowing={setHideFinder}
                                 setPickedPersonId={setPickedPersonId}
                                 setPickedPersonName={setPickedPersonName}
                                 methodToUse={"grade"}

                />
            }
        </>
    )
}

export default GiveGradesWindow;