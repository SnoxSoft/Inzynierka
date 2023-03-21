import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import FirstnameAndLastname from "../components/employeesFinder/FirstnameAndLastname";
import SortingButton from "../components/employeesFinder/SortingButton";
import SkillsList from "../components/employeesFinder/SkillsList";
import SkillsPicker from "../components/employeesFinder/SkillsPicker";
import EmployeePickerListItem from "../components/employeesFinder/EmployeePickerListItem";
import FunctionForResize from "../components/base/FunctionForResize";


const EmployeesFinder = ({mode, title, setTitle, setEmployeesFinderShowing,
                             methodToUse, isSwapPossible, idOfCurrentPickedEmployee, multipleChoice,
                         leaderData, setLeaderData, employeeData, setEmployeeData,
                             swapTeamsBetweenTheseEmployee, setSwapTeamsBetweenTheseEmployee}) => {
    setTitle("PIRSOFT: Wyszukiwarka pracowników")

    const [pickedEmployeeData, setPickedEmployeeData] = useState([]);

    // Opcje do filtrowania
    const [skillsPicked, setSkillsPicked] = useState([])
    const[order, setOrder] = useState(true);
    const[firstnameAndLastname, setFirstnameAndLastname] = useState();

    const [skillsNotShows, setSkillsNotShows] = useState(true)

    const [skillsComponent, setSkillsComponent] = useState(<></>)
    const [skills, setSkills] = useState(Object);
    const [skillsLoaded, setSkillsLoaded] = useState(false)

    const [swapOption, setSwapOption] = useState(false)

    if (skills[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllSkills")
            .then((response) => response.json())
            .then((response) => {
                setSkills(response)
                setSkillsLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [employeePickerData, setEmployeePickerData] = useState()
    const [employeePickerDataLoad, setEmployeePickedDataLoad] = useState([])
    const [employeePickerDataLoaded, setEmployeePickerDataLoaded] = useState(false)
    function loadAllEmployeesByFilter(){
        setEmployeePickerDataLoaded(false)

        fetch("http://127.0.0.1:3001/getAllEmployeesForPicked")
            .then((response) => response.json())
            .then((response) => {
                let employeeLoad = []

                response.forEach((e) => {
                    employeeLoad.push(
                        <EmployeePickerListItem employee={e}
                          pickOneOrMore={(methodToUse === 'employee' && isSwapPossible) || methodToUse === 'leader'}
                          pickedEmployeeData={pickedEmployeeData} setPickedEmployeeData={setPickedEmployeeData}
                          methodToUse={methodToUse}
                        />
                    )
                })

                setEmployeePickerData(employeeLoad)
                setEmployeePickerDataLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    function finderAcceptChanges(){
        if(pickedEmployeeData.length !== 0) {
            if (methodToUse === 'leader') {
                setLeaderData(pickedEmployeeData)
                setEmployeesFinderShowing(false)
            }
            if (methodToUse === 'employee' && !isSwapPossible) {
                const newSummedEmployeeData = [...employeeData, ...pickedEmployeeData]
                setEmployeeData(newSummedEmployeeData)
                setEmployeesFinderShowing(false)
            }
            if (methodToUse === 'employee' && isSwapPossible) {
                if (!swapOption) {
                    let employeeDataWithoutCurrentEmployee = []
                    employeeData.forEach((e) => {
                        if (e.id !== idOfCurrentPickedEmployee) {
                            employeeDataWithoutCurrentEmployee.push(e)
                        }
                    })
                    setEmployeeData([...employeeDataWithoutCurrentEmployee, pickedEmployeeData])
                    setEmployeesFinderShowing(false)
                } else {
                    // Cała funkcja do wymienienia ze sobą pracowników

                    let employeeDataWithoutCurrentEmployee = []

                    let changedEmployeeDataArray = []
                    employeeData.forEach((e) => {
                        if (e.id !== idOfCurrentPickedEmployee) {
                            employeeDataWithoutCurrentEmployee.push(e)
                        } else {
                            changedEmployeeDataArray.push(e)
                        }
                    })

                    setEmployeeData([...employeeDataWithoutCurrentEmployee, pickedEmployeeData])

                    let pickedEmployeeDataArray = []
                    pickedEmployeeDataArray.push(pickedEmployeeData)

                    let createRecordForChangedEmployeeData = {...changedEmployeeDataArray[0], ...pickedEmployeeDataArray}

                    let swapTeamsBetweenTheseEmployeeTemp = swapTeamsBetweenTheseEmployee
                    swapTeamsBetweenTheseEmployeeTemp.push(createRecordForChangedEmployeeData)
                    swapTeamsBetweenTheseEmployee.forEach((e) => {
                        if (e.id !== idOfCurrentPickedEmployee) {
                            employeeDataWithoutCurrentEmployee.push(e)
                        } else {
                        }
                    })

                    setSwapTeamsBetweenTheseEmployee(swapTeamsBetweenTheseEmployeeTemp)
                    setEmployeesFinderShowing(false)
                }
            }
        }
        else {
            //alert("wybierz pracownika lub zamknij okno")
        }
    }

    if(skillsLoaded){
        pickSkills()
        setSkillsLoaded(false)
    }
    function pickSkills(){
            setSkillsComponent(<></>)

            let detailsOne = []

            for(const availableSkill in skills){
                let hasSkill = false;

                for (const property in skillsPicked) {
                    if (skills[availableSkill].includes(skillsPicked[property])) {
                        hasSkill = true;
                    }
                }

                detailsOne.push(
                    <div key={"skill"+availableSkill} className={"grid grid-cols-2 gap-4 p-4 h-9"}>
                        <p>{skills[availableSkill]}</p>
                        <input className={"bg-weekend checked:bg-weekend"} type={"checkbox"} defaultChecked={hasSkill}/>
                    </div>
                );
            }
            setSkillsComponent(detailsOne)
            setSkillsNotShows(true)
    }

    function choseSkills(){
        const element = document.getElementById('skills-picker');
        const elements = element.getElementsByTagName("div");

        let skillsList = [];
        try {
            for(const ele in elements){
                const p = elements[ele].getElementsByTagName("p")[0];
                const input = elements[ele].getElementsByTagName("input")[0];

                if(p !== undefined && input !== undefined && input.checked){
                    skillsList.push(p.textContent+"");
                }
            }
        }catch (e) {
        }
        const myObjStr = JSON.stringify(skillsList);

        setSkillsPicked(skillsList)
        setSkillsNotShows(true)
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("employee-picker", {setWantedHeightForList});
    }, []);

    useEffect(() => {
        pickSkills()
    }, [skillsPicked]);

    return (
        <>
            {skillsNotShows ?
                <div className={"every-page-on-scroll text-workday bg-blue-menu"}
                style={{minWidth: 800}}>
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 p-4"}>
                        <div>WYSZUKIWARKA PRACOWNIKÓW</div>
                        <div className={"flex flex-row place-items-center gap-2"}>
                            <div className={"flex flex-col place-self-start m-2 gap-2"}>
                                <FirstnameAndLastname  className={""} onChange={setFirstnameAndLastname}/>
                                <SkillsPicker setSkills={setSkillsPicked} setSkillsNotShows={setSkillsNotShows}/>
                                <SkillsList skillList={skillsPicked}/>
                            </div>

                            <ReusableButton value={"SZUKAJ"}
                                onClick={() => loadAllEmployeesByFilter()}/>
                            <SortingButton setOrder={setOrder}/>
                        </div>
                    </div>

                    <div  id={"employee-picker"} className={"grow bg-brown-menu border-2 bg-opacity-30 border-workday menu rounded-md m-4 overflow-y-auto"}
                         style={{height: wantedHeightsForList - 100, minHeight:100}}>
                        <div className={"p-4 pl-2"}>IMIE I NAZWISKO, ZESPÓŁ, STANOWISKO, UMIEJĘTNOŚCI</div>
                        <hr/>
                        {employeePickerData}
                    </div>

                    <div id={"bottom-picker"} className={"flex flex-row gap-2 justify-between p-4"} >
                        <ReusableButton value={"ZAMKNIJ"} onClick={() => {
                            setTitle(title)
                            setEmployeesFinderShowing(false)
                        }}/>
                        <div className={"flex flex-row gap-2 place-items-center "}>
                            <div className={"flex text-end"}>Wymień aktualnego i wybranego pracownika pomiędzy zespołami</div>
                            <input type={"checkbox"} className={"w-6 h-6"} disabled={!isSwapPossible} onChange={(e) => setSwapOption(e.target.checked)}/>
                            <ReusableButton value={"ZATWIERDŹ"} onClick={() => finderAcceptChanges()}/>
                        </div>
                    </div>
                </div> :
                <div id={"skills-finder"}
                     className={"every-page-on-scroll grid grid-cols-1"}
                     style={{minWidth: 800}}
                >
                    <div id={"skills-picker"} className={"flex flex-col justify-evenly text-workday text-center p-4"}>
                        <div>UMIEJĘTNOŚCI</div>
                        {skillsComponent}
                        <br/>
                        <div className={"p-4 flex flex-row justify-evenly"}>
                            <ReusableButton value={"ZATWIERDŹ"} onClick={() => choseSkills()}/>
                            <ReusableButton value={"ZAMKNIJ"} onClick={() => {setSkillsNotShows(true)}}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default EmployeesFinder;