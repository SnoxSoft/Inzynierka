import {useEffect, useState} from "react";
import Select from "react-select";
import {labelFind, pageNameGivenGrades, serverIp, yearAdditionalRow} from "../../GlobalAppConfig";
import GradeListItem from "../../components/grades/GradeListItem";
import TeamsList from "../../components/employees/search/fields/TeamsList";
import FirstNameAndLastName from "../../components/grades/FirstNameAndLastName";
import ReusableButton from "../../components/base/ReusableButton";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";

function GivenGrades({heightFromParent, setGradeMode, setPickedGradeData, setGradesVisible}){
    document.title = pageNameGivenGrades;

    // Dane do fitrowania listy ocen
    const[firstNameAndLastName, setFirstNameAndLastName] = useState()
    const[pickedTeam, setPickedTeam] = useState()
    const[pickedYear, setPickedYear] = useState();

    const[years, setYears] = useState(undefined);
    const[currentGradesList, setCurrentGradesList] = useState();
    const[loadedGrades, setLoadedGrades] = useState(undefined)

    if(years === undefined) {
        fetch(serverIp + "/getYears/" + getLocalStorageKeyWithExpiry("loggedEmployee").UserId)
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

    function FunctionForResizeGrades(){
        const tabsComponent = document.getElementById("tabs-component");
        const currentComponent = document.getElementById("given-grades-list");
        if(tabsComponent != null && currentComponent != null){
            const tabsComponentPosition = tabsComponent.getBoundingClientRect()
            const currentComponentPosition = currentComponent.getBoundingClientRect();
            setWantedWidthForList(tabsComponentPosition.height - (currentComponentPosition.y - tabsComponentPosition.y))
        }
    }

    // Metoda pobierająca listę ocen z bieżącego roku
    const getGrades = () => {
        console.log(firstNameAndLastName)
        console.log(pickedTeam)
        // Pobranie listy ocen na podstawie wybranego roku
        fetch(serverIp + "/getGivenGrades/" + getLocalStorageKeyWithExpiry("loggedEmployee").UserId + "/" + pickedYear)
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
            let gradeId = 0;
            for (const i of currentGradesList) {
                temporaryGradesList.push(
                    <GradeListItem id={"given-grade-list-item-" + gradeId} grade={i}
                       setGradeMode={setGradeMode}
                       setPickedGradeData={setPickedGradeData}
                       setGradesVisible={setGradesVisible} mode={"given"}/>);
                gradeId++;
            }
        }
        setLoadedGrades(temporaryGradesList)
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
                    <TeamsList id={"given-grades-teams-list"} onChange={setPickedTeam}/>
                    <Select
                        id={"given-grades-years"}
                        className={"w-96 text-black"}
                        defaultValue={{ value: 0, label: yearAdditionalRow }}
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
            style={{height:wantedWidthForList}}>
                {loadedGrades}
            </div>
        </div>
    );
}

export default GivenGrades;