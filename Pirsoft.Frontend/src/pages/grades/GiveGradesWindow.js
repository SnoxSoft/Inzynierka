import {useEffect, useState} from "react";
import {serverIp} from "../../GlobalAppConfig";
import GradeListItem from "../../components/grades/GradeListItem";
import ReusableButton from "../../components/base/ReusableButton";
import FunctionForResize from "../../components/base/FunctionForResize";
import {CgClose} from "react-icons/cg";

function GivenGrades({setGradesVisible}){
    document.title = 'PIRSOFT: Oceny pracowników'

    const[pickedYear, setPickedYear] = useState();
    const[years, setYears] = useState(undefined);
    const[currentGradesList, setCurrentGradesList] = useState();
    const[loadedGrades, setLoadedGrades] = useState(undefined)

    if(years === undefined) {
        fetch(serverIp + "/getYears/" + sessionStorage.getItem('USER'))
            .then((response) => {
                response.json()
                    .then((response) => {
                        setYears(response)
                    });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Funkcja do rozszerzania widoczności okna z ocenami
    const[wantedWidthForList, setWantedWidthForList] = useState(400);

    // Metoda pobierająca listę ocen z bieżącego roku
    const getGrades = () => {
        // Pobranie listy ocen na podstawie wybranego roku
        fetch(serverIp+"/getGrades/"+sessionStorage.getItem('USER')+"/"+pickedYear)
            .then((response) => {response.json()
                .then((response) => {
                    setCurrentGradesList(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })

        let temporaryGradesList = []
        if(currentGradesList !== undefined) {
            for (const i of currentGradesList) {
                temporaryGradesList.push(
                    <GradeListItem grade={i}/>)
            }
        }
        setLoadedGrades(temporaryGradesList)
    }

    document.title = "PIRSOFT: Zatwierdzanie wniosku urlopowego";

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("schedule-list", {setWantedHeightForList});
        FunctionForResize("schedule-month", {setWantedHeightForList});
    }, []);

    function rejectRequest(){

    }

    function approveRequest(){

    }

    function renameType(type) {
        if(type === 'dayoff'){
            return 'URLOP WYPOCZYNKOWY'
        }
        if(type === 'demand'){
            return 'URLOP NA ŻĄDANIE'
        }
        return type
    }

    return(
        <div id={"ApprovalOrRejectionRequest"}
             className={"every-page-on-scroll flex p-4 gap-2 text-center flex-col bg-blue-menu text-workday"}
             style={{minWidth: 800}}>
            <div className={"grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    WNIOSEK URLOPOWY
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={<CgClose  size={30}/>}
                                    onClick={() => setGradesVisible(true)}
                                    formatting={""} color={""}/>
                </div>
            </div>
            {/*<div>{requestPickedData.name}</div>*/}
            <br/>
            <div className={"flex p-4 gap-8 text-center flex-col "}>
                <div className={"flex justify-center"}>
                    {/*<Calendar from={requestPickedData.from} to={requestPickedData.to} disabled={true}/>*/}
                </div>
                <div className={"flex "}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        RODZAJ
                    </p>
                    <div className={"bg-workday text-black basis-1/3 rounded-md"}>
                        {/*{renameType(requestPickedData.type)}*/}
                    </div>
                </div>
                <div className={"flex place-content-center"}>
                    <p className={"text-end pr-4"}>
                        URLOP BEZPŁATNY
                    </p>
                    <input type={"checkbox"} className={"h-5 w-5 checked:decoration-workday"} checked={false} disabled={true}/>
                </div>
            </div>
            <br/><br/>
            <div id={"schedule-list"} className={"flex justify-evenly"}>
                <ReusableButton value={"ODRZUC"} onClick={() => rejectRequest()}/>
                <ReusableButton value={"ZATWIERDZ"} onClick={() => approveRequest()}/>
            </div>
        </div>
    )
}

export default GivenGrades;