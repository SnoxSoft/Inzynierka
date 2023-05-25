import {
    alertMessage, alertPickAPerson, alertQuarter, alertRating, alertTitle,
    gradeMenu,
    labelApprove,
    labelClose,
    labelDisapprove,
    pageNameGiveGradesWindowGive,
    pageNameGiveGradesWindowView,
    quarters
} from "../../GlobalAppConfig";
import ReusableButton from "../../components/base/ReusableButton";
import {CgClose} from "react-icons/cg";
import PersonData from "../../components/giveGrade/PersonData";
import YearQuarters from "../../components/giveGrade/YearQuarters";
import GradeTitle from "../../components/giveGrade/GradeTitle";
import GradeMessage from "../../components/giveGrade/GradeMessage";
import GradeRating from "../../components/grades/GradeRating";
import React, {useEffect, useState} from "react";
import EmployeeSkillFinder from "../EmployeeSkillFinder";
import {fetchGetAvailableQuarters} from "../../DataFetcher";
import {useNavigate} from "react-router-dom";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";
import {Popup} from "semantic-ui-react";

function GiveGradesWindow({setGradesVisible, mode = "view", pickedGradeData}){

    const navigate = useNavigate();

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

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }

    }, []);

    const[pickedPerson, setPickedPerson] = useState(null)
    const[pickedQuarter, setPickedQuarter] = useState("")
    const[gradeTitle, setGradeTitle] = useState("")
    const[gradeMessage, setGradeMessage] = useState("")
    const[gradeRating, setGradeRating] = useState("")

    const[availableQuartets, setAvailableQuartets] = useState(quarters)

    async function loadAvailableQuartets(){
        let availableQuartetsLoad = []
        if(pickedPerson !== null){
            fetchGetAvailableQuarters(pickedPerson.employee_id)
                .then((quarters) => {
                    if(quarters !== undefined){
                        quarters.map((quarter) => {
                            availableQuartetsLoad.push(quarter.quarter_name)
                        })
                    }
                })
        }

        if(pickedPerson !== null){
            setAvailableQuartets(availableQuartetsLoad)
        }
        else {
            setAvailableQuartets(quarters)
        }
    }

    useEffect(() => {
        loadAvailableQuartets()
    }, [pickedPerson])

    function closeGradeWindow(){
        setGradesVisible(true);
    }

    const [showPopupWithProblems, setShowPopupWithProblems] = useState(false);
    const [alerts, setAlerts] = useState(<></>)

    const buildPopup = () => {
        return showPopupWithProblems ?
            <div className={"flex flex-col items-center text-workday gap-2 p-2"}>
                {alerts}
            </div>:
            <></>
    }

    function giveGrade(){
        setShowPopupWithProblems(false)
        if (pickedPerson === null) {
            setAlerts(<p className={"bg-red-700 rounded-md font-bold"}>
                {alertPickAPerson}
            </p>)
            setShowPopupWithProblems(true)
        }
        if(pickedPerson !== null) {
            const params = new URLSearchParams();
            params.set("quarter", pickedQuarter);
            params.set("title", gradeTitle);
            params.set("message", gradeMessage);
            params.set("rating", gradeRating);
            params.set("gradeOwner", pickedPerson.employee_id);
            params.set("gradeCreator", getLocalStorageKeyWithExpiry("loggedEmployee").UserId);

            setShowPopupWithProblems(false)
            // Sprawdzenie błędów
            setAlerts(<></>)
            let alerts = []

            if (pickedPerson === null) {
                alerts.push(<p className={"bg-red-700 rounded-md font-bold"}>
                    {alertPickAPerson}
                </p>)
            }
            if (pickedQuarter === "") {
                alerts.push(<p className={"bg-red-700 rounded-md font-bold"}>
                    {alertQuarter}
                </p>)
            }
            if (gradeTitle === "") {
                alerts.push(<p className={"bg-red-700 rounded-md font-bold"}>
                    {alertTitle}
                </p>)
            }
            if (gradeMessage === "") {
                alerts.push(<p className={"bg-red-700 rounded-md font-bold"}>
                    {alertMessage}
                </p>)
            }
            if (gradeRating === "") {
                alerts.push(<p className={"bg-red-700 rounded-md font-bold"}>
                    {alertRating}
                </p>)
            }

            setAlerts(alerts)
            if (alerts.length > 0) {
                setShowPopupWithProblems(true)
            } else {
                // Podpiąć wysłanie danych na endpoint
                // fetchPostCreateGrade(params).then(r => {
                //     setGradesVisible(true);
                // }).catch(e => {
                //     })
            }
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
                        value={pickedGradeData ? pickedGradeData.grade_creator_name : pickedPerson !== null ? pickedPerson.first_name + " " + pickedPerson.last_name : ""}
                        setHideFinder={setHideFinder}/>
            <YearQuarters id={"give-grade-quarters"} createMode={mode === "create"}
                          value={pickedGradeData ? pickedGradeData.quarter_name : pickedQuarter}
                          onChange={setPickedQuarter}
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
                            <Popup
                                content={buildPopup}
                                position={"top center"}
                                trigger={<ReusableButton id={"give-grade-approve"}
                                                         value={labelApprove} onClick={() => giveGrade()}/>}
                            />
                        </> :
                            <ReusableButton
                                id={"give-grade-close"}
                                value={labelClose} onClick={() => setGradesVisible(true)}/>
                }
            </div>
        </div> :
                <EmployeeSkillFinder
                                     setHideFinder={setHideFinder}
                                     setPickedPerson={setPickedPerson}
                                     mode={"grade"}
                />
            }
        </>
    )
}

export default GiveGradesWindow;