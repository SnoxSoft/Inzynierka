import {useEffect, useState} from "react";
import Select from "react-select";
import {serverIp} from "../../Configure";
import GradeListItem from "../../components/grades/GradeListItem";

function ReceivedGrades({heightFromParent}){
    document.title = 'PIRSOFT: Lista wszystkich pracowników'

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

    function FunctionForResizeGrades(){
        const tabsComponent = document.getElementById("tabs-component");
        const currentComponent = document.getElementById("grades-list");
        if(tabsComponent != null && currentComponent != null){
            const tabsComponentPosition = tabsComponent.getBoundingClientRect()
            const currentComponentPosition = currentComponent.getBoundingClientRect();
            setWantedWidthForList(tabsComponentPosition.height - (currentComponentPosition.y - tabsComponentPosition.y))
        }
    }

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

    useEffect(() => {
        getGrades()
        FunctionForResizeGrades()
    }, [pickedYear]);

    useEffect(() => {
        FunctionForResizeGrades()
    }, [heightFromParent]);

    return(
        <div
            className={"every-page-on-scroll border-b-2 border-0 bg-brown-menu text-workday overflow-y-hidden"}
            style={{minWidth: 800, height:heightFromParent}}>
            <div className={"flex flex-col p-2 gap-4 items-center"}>
                <Select className={"w-96 text-black"}
                        defaultValue={{ value: 0, label: 'Wybierz rok' }}
                        options={years}
                        onChange={(e) => setPickedYear(e.value)}/>
            </div>
            <hr/>
            <div id={"grades-list"} className={"rounded-md overflow-y-auto flex flex-col place-content-between"}
            style={{height:wantedWidthForList}}>
                {loadedGrades}
            </div>
        </div>
    );
}

export default ReceivedGrades;