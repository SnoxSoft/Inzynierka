import {labelApprove, labelClose, labelDisapprove, serverIp} from "../../GlobalAppConfig";
import ReusableButton from "../../components/base/ReusableButton";
import {CgClose} from "react-icons/cg";
import PersonData from "../../components/giveGrade/PersonData";
import YearQuartets from "../../components/giveGrade/YearQuartets";
import GradeTitle from "../../components/giveGrade/GradeTitle";
import GradeMessage from "../../components/giveGrade/GradeMessage";
import GradeRating from "../../components/grades/GradeRating";
import {useEffect, useState} from "react";
import EmployeesFinder from "../EmployeesFinder";

function GiveGradesWindow({setGradesVisible, mode = "view", pickedGradeData}){

    const [title, setTitle] = useState("")
    if(title === ""){
        if(mode === "view"){
            setTitle("PIRSOFT: Ocena pracownika")
        }
        else {
            setTitle("PIRSOFT: Ocenianie pracownika")
        }
    }

    document.title = title

    const[pickedPersonId, setPickedPersonId] = useState("")
    const[pickedPersonName, setPickedPersonName] = useState("")
    const[pickedQuartet, setPickedQuartet] = useState("")
    const[gradeTitle, setGradeTitle] = useState("")
    const[gradeMessage, setGradeMessage] = useState("")
    const[gradeRating, setGradeRating] = useState("")

    const[availableQuartets, setAvailableQuartets] = useState(["Q1","Q2","Q3","Q4"])

    async function loadAvailableQuartets(){
        let availableQuartetsLoad = []
        if(pickedPersonId !== ""){
            const response = await fetch(serverIp + "/getAvailableQuartets/" + pickedPersonId)
            const quarters = await response.json();

             quarters.forEach((q) => {
                 availableQuartetsLoad.push(q.value)
             })
        }

        setAvailableQuartets(availableQuartetsLoad)
    }

    useEffect(() => {
        loadAvailableQuartets()
    }, [pickedPersonId])

    function closeGradeWindow(){
        setGradesVisible(true);
    }

    function giveGrade(){
        // console.log(pickedPersonName)
        // console.log(pickedQuartet)
        // console.log(gradeTitle)
        // console.log(gradeMessage)
        // console.log(gradeRating)

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
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    Ocena kwartalna
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={<CgClose  size={30}/>}
                                    onClick={() => setGradesVisible(true)}
                                    formatting={""} color={""}/>
                </div>
            </div>

            <PersonData find={mode === "create"}
                        value={pickedGradeData ? pickedGradeData.personName : pickedPersonName}
                        onChange={setPickedPersonName}
                        setHideFinder={setHideFinder}
                        setPersonId={setPickedPersonId}/>
            <YearQuartets createMode={mode === "create"}
                          value={pickedGradeData ? pickedGradeData.quartet : pickedQuartet}
                          onChange={setPickedQuartet}
                          availableQuartets={availableQuartets}/>
            <GradeTitle enable={mode === "create"}
                        value={pickedGradeData ? pickedGradeData.title : gradeTitle}
                        onChange={setGradeTitle}
            />
            <GradeMessage enable={mode === "create"}
                          value={pickedGradeData ? pickedGradeData.message : gradeMessage}
                          onChange={setGradeMessage}
            />
            <GradeRating placing={"place-self-center"}
                         value={pickedGradeData ? pickedGradeData.grade : gradeRating}
                         onChange={setGradeRating}
                         createMode={mode === "create"}
            />
            <br/>
            <div className={"flex justify-evenly"}>
                {
                    mode == "create" ?
                        <>
                            <ReusableButton value={labelDisapprove} onClick={() => closeGradeWindow()}/>
                            <ReusableButton value={labelApprove} onClick={() => giveGrade()}/>
                        </> :
                            <ReusableButton value={labelClose} onClick={() => setGradesVisible(true)}/>
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