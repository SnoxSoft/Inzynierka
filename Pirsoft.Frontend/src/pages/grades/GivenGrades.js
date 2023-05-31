import React, {useEffect, useState} from "react";
import Select from "react-select";
import {labelFind, pageNameGivenGrades} from "../../GlobalAppConfig";
import GradeListItem from "../../components/grades/GradeListItem";
import TeamsList from "../../components/employees/search/fields/TeamsList";
import FirstNameAndLastName from "../../components/grades/FirstNameAndLastName";
import ReusableButton from "../../components/base/ReusableButton";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";
import {useNavigate} from "react-router-dom";
import {fetchGetAllTeamsAndAddZeroRecordAndSort, fetchGetGivenGrades, fetchGetYears} from "../../DataFetcher";

function GivenGrades({heightFromParent, setGradeMode, setPickedGradeData, setGradesVisible}){
    document.title = pageNameGivenGrades;

    const navigate = useNavigate();

    // Dane do fitrowania listy ocen
    const[firstNameAndLastName, setFirstNameAndLastName] = useState()
    const[pickedTeam, setPickedTeam] = useState()
    const[pickedYear, setPickedYear] = useState();
    const[teamsList, setTeamsList] = useState(null);

    const[years, setYears] = useState(undefined);
    const[defaultYear, setDeafaultYear] = useState({ value: new Date().getFullYear(), label: new Date().getFullYear() })
    const[currentGradesList, setCurrentGradesList] = useState();
    const[loadedGrades, setLoadedGrades] = useState(undefined)

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }

        if(years === undefined && getLocalStorageKeyWithExpiry("loggedEmployee") !== null) {
            fetchGetYears(getLocalStorageKeyWithExpiry("loggedEmployee").UserId)
                .then((years) => setYears(years));

            // Załadowanie wszystkich zespołów do filtra
            if(teamsList === null) {
                setTeamsList(null);
                fetchGetAllTeamsAndAddZeroRecordAndSort(navigate)
                    .then(teamsList => setTeamsList(teamsList));
            }
        }

    },[])


    // Funkcja do rozszerzania widoczności okna z ocenami
    const[wantedHeightForList, setWantedHeightForList] = useState(400);

    function FunctionForResizeGrades(){
        const leftMenuComponent = document.getElementById("left-menu");
        const currentComponent = document.getElementById("given-grades-list");
        if(currentComponent != null && leftMenuComponent !== null){
            const currentComponentPosition = currentComponent.getBoundingClientRect();
            const leftMenuComponentPosition = leftMenuComponent.getBoundingClientRect();
            let bottomY = leftMenuComponentPosition.height;
            setWantedHeightForList(bottomY - (currentComponentPosition.y))
        }
    }

    // Metoda pobierająca listę ocen z bieżącego roku
    const getGrades = () => {
        console.log(firstNameAndLastName)
        console.log(pickedTeam)
        // Pobranie listy ocen na podstawie wybranego roku
        fetchGetGivenGrades(getLocalStorageKeyWithExpiry("loggedEmployee").UserId, pickedYear)
            .then((givenGrades) => {

                let temporaryGradesList = []
                if(givenGrades !== undefined) {
                    givenGrades.map((currentGrade, currentGradeId) => {
                        temporaryGradesList.push(
                            <GradeListItem id={"given-grade-list-item-" + currentGradeId} grade={currentGrade}
                                           setGradeMode={setGradeMode}
                                           setPickedGradeData={setPickedGradeData}
                                           setGradesVisible={setGradesVisible} mode={"given"}/>);
                    })
                }
                setLoadedGrades(temporaryGradesList)
                setCurrentGradesList(givenGrades)
            })
    }

    useEffect(() => {
        FunctionForResizeGrades()
    }, [pickedYear, heightFromParent]);

    return(
        <div
            className={"every-page-on-scroll border-b-2 border-0 bg-brown-menu text-workday overflow-y-hidden"}
            style={{minWidth: 800, height:heightFromParent}}>
            <div className={"flex flex-row p-2 gap-4 place-content-evenly"}>
                <div className={"flex flex-col items-center gap-2"}>
                    <TeamsList id={"given-grades-teams-list"} className={""}
                               value={pickedTeam}
                               onChange={setPickedTeam} teams={teamsList}/>
                    <Select
                        id={"given-grades-years"}
                        className={"w-96 text-black"}
                        defaultValue={defaultYear}
                        options={years}
                        onChange={(e) => setPickedYear(e.value)}/>

                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <FirstNameAndLastName id={"given-grades-firstname-lastname"} className={""} onChange={setFirstNameAndLastName} />
                    <div className={"flex flex-row gap-2 w-full place-content-end"}>
                        <ReusableButton id={"given-grades-find"} value={labelFind} onClick={getGrades} />
                    </div>
                </div>

            </div>
            <hr/>
            <div id={"given-grades-list"} className={"rounded-md overflow-y-auto flex flex-col place-content-between"}
            style={{height:wantedHeightForList}}>
                {loadedGrades}
            </div>
        </div>
    );
}

export default GivenGrades;