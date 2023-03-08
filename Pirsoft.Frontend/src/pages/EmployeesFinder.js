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

    // filtering options
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
                //console.log(response)
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
        // console.log("GETTING FILTER DATA HERE")
        // console.log(skillsPicked)
        // console.log(order)
        // console.log(firstnameAndLastname)

        fetch("http://127.0.0.1:3001/getAllEmployeesForPicked")
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
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
                    // whole function to swap employees
                    // two endpoints on a team window side to swap employees when saving changes.

                    let employeeDataWithoutCurrentEmployee = []
                    // getting changed employee
                    let changedEmployeeDataArray = []
                    employeeData.forEach((e) => {
                        if (e.id !== idOfCurrentPickedEmployee) {
                            employeeDataWithoutCurrentEmployee.push(e)
                        } else {
                            changedEmployeeDataArray.push(e)
                        }
                    })

                    console.log("pickeddddddddddddd swapp")
                    console.log("swap option...")
                    console.log(changedEmployeeDataArray)
                    console.log(employeeDataWithoutCurrentEmployee)
                    console.log(pickedEmployeeData)
                    setEmployeeData([...employeeDataWithoutCurrentEmployee, pickedEmployeeData])

                    //getting picked employee data
                    let pickedEmployeeDataArray = []
                    pickedEmployeeDataArray.push(pickedEmployeeData)
                    console.log(pickedEmployeeDataArray)
                    let createRecordForChangedEmployeeData = {...changedEmployeeDataArray[0], ...pickedEmployeeDataArray}
                    console.log("data for changed")
                    console.log(createRecordForChangedEmployeeData)

                    let swapTeamsBetweenTheseEmployeeTemp = swapTeamsBetweenTheseEmployee
                    swapTeamsBetweenTheseEmployeeTemp.push(createRecordForChangedEmployeeData)
                    swapTeamsBetweenTheseEmployee.forEach((e) => {
                        if (e.id !== idOfCurrentPickedEmployee) {
                            employeeDataWithoutCurrentEmployee.push(e)
                        } else {
                        }
                    })
                    //
                    // setSwapTeamsBetweenTheseEmployee(changedEmployeeData)
                    // swapTeamsBetweenTheseEmployee
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
        console.log(myObjStr);

        setSkillsPicked(skillsList)

        setSkillsNotShows(true)
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("employee-picker", {setWantedHeightForList});
    }, []);

    useEffect(() => {
        pickSkills()
    }, [skillsPicked]);

    return (
        <>
            {skillsNotShows ?
                <div
                     className={"p-4 bg-blue-menu rounded-md border-2 border-b-workday text-workday"}
                >
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 overflow-y-auto"}>
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

                    <div  id={"employee-picker"} className={"bg-brown-menu border-2 border-workday menu rounded-md m-4 p-4 overflow-y-auto"}
                         style={{height: wantedHeightsForList}}>
                        <div>IMIE I NAZWISKO, ZESPÓŁ, STANOWISKO, UMIEJĘTNOŚCI</div>
                        {employeePickerData}
                    </div>

                    <div className={"flex flex-row gap-2 justify-between"} >
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
                     className={"p-4 grid grid-cols-1 bg-blue-menu rounded-md border-2 border-b-workday text-workday overflow-y-auto text-center"}
                     // style={{height: wantedHeightsForList}}
                >
                    <div id={"skills-picker"} className={"flex flex-col justify-evenly"}>
                        <div>UMIEJĘTNOŚCI</div>
                        {skillsComponent}
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