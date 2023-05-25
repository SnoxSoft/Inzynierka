import {useEffect, useState} from "react";
import Select from "react-select";
import {labelFind, pageNameReceivedGrades} from "../../GlobalAppConfig";
import GradeListItem from "../../components/grades/GradeListItem";
import ReusableButton from "../../components/base/ReusableButton";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";
import {useNavigate} from "react-router-dom";
import {fetchGetReceivedGrades, fetchGetYears} from "../../DataFetcher";
import FunctionForResize from "../../components/base/FunctionForResize";

function ReceivedGrades({heightFromParent, setGradeMode, setPickedGradeData, setGradesVisible}){
    document.title = pageNameReceivedGrades;

    const navigate = useNavigate();

    const[pickedYear, setPickedYear] = useState();
    const[years, setYears] = useState(null);
    const[defaultYear, setDeafaultYear] = useState({ value: new Date().getFullYear(), label: new Date().getFullYear() })
    const[currentGradesList, setCurrentGradesList] = useState(null);
    const[loadedGrades, setLoadedGrades] = useState(undefined)

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }

        if(years === null && getLocalStorageKeyWithExpiry("loggedEmployee") !== null) {
            fetchGetYears(getLocalStorageKeyWithExpiry("loggedEmployee").UserId)
                .then((years) => {
                    setYears(years)
                })
        }
        FunctionForResizeGrades();
    },[])

    const[wantedHeightsForList, setWantedHeightForList] = useState(400);
    // Funkcja do rozszerzania widoczności okna z ocenami

    function FunctionForResizeGrades(){
        const leftMenuComponent = document.getElementById("left-menu");
        const currentComponent = document.getElementById("grades-list");
        if(currentComponent != null && leftMenuComponent !== null){
            const currentComponentPosition = currentComponent.getBoundingClientRect();
            const leftMenuComponentPosition = leftMenuComponent.getBoundingClientRect();
            let bottomY = leftMenuComponentPosition.height;
            setWantedHeightForList(bottomY - (currentComponentPosition.y))
        }
    }

    // Funkcja pobierająca listę ocen z bieżącego roku
    function getGrades () {
        // Pobranie listy ocen na podstawie wybranego roku
        fetchGetReceivedGrades(getLocalStorageKeyWithExpiry("loggedEmployee").UserId, pickedYear)
            .then((receivedGrades) => {

                let temporaryGradesList = []
                if(receivedGrades !== undefined) {
                    receivedGrades.map((currentGrade, currentGradeId) => {
                        temporaryGradesList.push(
                            <GradeListItem id={"received-grades-list-item-" + currentGradeId} grade={currentGrade}
                                           setGradeMode={setGradeMode}
                                           setPickedGradeData={setPickedGradeData}
                                           setGradesVisible={setGradesVisible} mode={"received"}/>);
                    })
                }
                setLoadedGrades(temporaryGradesList)
                setCurrentGradesList(receivedGrades)
                FunctionForResizeGrades()
            })
    }

    useEffect(() => {
        FunctionForResizeGrades()
    }, [pickedYear, heightFromParent]);

    return(
        <div
            className={"every-page-on-scroll border-b-2 border-0 bg-brown-menu text-workday overflow-y-hidden"}
            style={{minWidth: 800, height:heightFromParent}}>
            <div className={"flex flex-row p-2 gap-4 place-content-center"}>
                <Select id={"received-grades-year"} className={"w-96 text-black"}
                        defaultValue={defaultYear}
                        options={years}
                        onChange={(e) => setPickedYear(e.value)}/>
                <ReusableButton id={"received-grades-find"} value={labelFind}
                                onClick={() => {
                                    getGrades();
                                    }} />
            </div>
            <hr/>
            <div id={"grades-list"} className={"rounded-md overflow-y-auto flex flex-col place-content-between"}
            style={{height: wantedHeightsForList}}>
                {loadedGrades}
            </div>
        </div>
    );
}

export default ReceivedGrades;