import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import FirstnameAndLastname from "../components/employeesFinder/FirstnameAndLastname";
import SortingButton from "../components/employeesFinder/SortingButton";
import SkillsList from "../components/employeesFinder/SkillsList";
import SkillsPicker from "../components/employeesFinder/SkillsPicker";
import EmployeePickerListItem from "../components/employeesFinder/EmployeePickerListItem";
import FunctionForResize from "../components/base/FunctionForResize";
import {
    headerEmployeesFinder,
    headerEmployeesFinderList,
    labelApprove,
    labelClose, labelEmployeeFinderExchanceEmployeesBetween,
    labelFind, pageNameEmployeesFinder,
    serverIp,
    skillsLabel
} from "../GlobalAppConfig";
import {endpointGetAllEmployeesForFinder, endpointGetAllSkills, endpointGetEmployeeData} from "../EndpointAppConfig";


const EmployeesFinder = async ({
                                   mode, title, setTitle, setEmployeesFinderShowing,
                                   methodToUse, isSwapPossible, idOfCurrentPickedEmployee, multipleChoice,
                                   leaderData, setLeaderData, employeeData, setEmployeeData,
                                   swapTeamsBetweenTheseEmployee, setSwapTeamsBetweenTheseEmployee,
                                   setPickedPersonId,
                                   setPickedPersonName
                               }) => {

    document.title = pageNameEmployeesFinder;

    const [pickedEmployeeData, setPickedEmployeeData] = useState([]);

    // Opcje do filtrowania
    const [skillsPicked, setSkillsPicked] = useState([])
    const [order, setOrder] = useState(true);
    const [firstnameAndLastname, setFirstnameAndLastname] = useState();

    const [skillsNotShows, setSkillsNotShows] = useState(true)

    const [skillsComponent, setSkillsComponent] = useState(<></>)
    //const [skills, setSkills] = useState();
    const [skillsLoaded, setSkillsLoaded] = useState(false)

    const [swapOption, setSwapOption] = useState(false)


    // if (skills === undefined) {
    //     fetch(serverIp + "/" + endpointGetAllSkills)
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setSkills(response)
    //             console.log(skills)
    //             setSkillsLoaded(true)
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         })
    // }

    const response = await fetch(serverIp + "/" + endpointGetAllSkills);
    const skills = await response.json();
    console.log("hmm")
    console.log(skills)
    //setSkills(newData);


    const [employeePickerData, setEmployeePickerData] = useState()
    const [employeePickerDataLoad, setEmployeePickedDataLoad] = useState([])
    const [employeePickerDataLoaded, setEmployeePickerDataLoaded] = useState(false)
    function loadAllEmployeesByFilter(){
        setEmployeePickerDataLoaded(false)

        fetch(serverIp + "/" + endpointGetAllEmployeesForFinder)
            .then((response) => response.json())
            .then((response) => {
                let employeeLoad = []

                response.forEach((employee, employeeId) => {
                    employeeLoad.push(
                        <EmployeePickerListItem id={"finder-list-item-" + employeeId} employee={employee}
                          pickOneOrMore={(methodToUse === 'employee' && isSwapPossible)
                              || methodToUse === 'leader'
                              || methodToUse === 'grade'}
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
            if(methodToUse === 'grade'){
                setPickedPersonId(pickedEmployeeData.employee_id)
                setPickedPersonName(pickedEmployeeData.first_name + " " + pickedEmployeeData.last_name)
                setEmployeesFinderShowing(false)
            }
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
                        if (e.employee_id !== idOfCurrentPickedEmployee) {
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
                        if (e.employee_id !== idOfCurrentPickedEmployee) {
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
                        if (e.employee_id !== idOfCurrentPickedEmployee) {
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

        console.log("umiejetnosci")
        console.log(skills)
            skills.map((s) => {
                console.log(s)
            });

            for(const availableSkill in skills){
                let hasSkill = false;

                for (const property in skillsPicked) {
                    if (skills[availableSkill].includes(skillsPicked[property])) {
                        hasSkill = true;
                    }
                }

                detailsOne.push(
                    <div id={"skill"+availableSkill} key={"skill"+availableSkill} className={"grid grid-cols-2 gap-4 p-4 h-9"}>
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

        for(const ele in elements){
            if(elements[ele].id !== undefined && elements[ele].id.includes("skill")) {
                const p = elements[ele].getElementsByTagName("p")[0];
                const input = elements[ele].getElementsByTagName("input")[0];

                if (p !== undefined && input !== undefined && input.checked) {
                    skillsList.push(p.textContent + "");
                }
            }
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
                <div className={"every-page-on-scroll text-workday bg-blue-menu hover:cursor-default"}
                style={{minWidth: 800}}>
                    <div id={"body-team-edit"} className={"flex flex-col place-items-center gap-4 p-4"}>
                        <div>{headerEmployeesFinder}</div>
                        <div className={"flex flex-row place-items-center gap-2"}>
                            <div className={"flex flex-col place-self-start m-2 gap-2"}>
                                <FirstnameAndLastname id={"finder-firstname-lastname"} className={""} onChange={setFirstnameAndLastname}/>
                                {methodToUse !== 'grade' ?
                                    <>
                                        <SkillsPicker id={"finder-skill-picker"} setSkills={setSkillsPicked} setSkillsNotShows={setSkillsNotShows}/>
                                        <SkillsList id={"finder-skill-list"} skillList={skillsPicked}/>
                                    </>:
                                    <></>
                                }
                            </div>

                            <ReusableButton id={"finder-find"} value={labelFind}
                                onClick={() => loadAllEmployeesByFilter()}/>
                            <SortingButton id={"finder-sort"} setOrder={setOrder}/>
                        </div>
                    </div>

                    <div  id={"employee-picker"} className={"grow bg-brown-menu border-2 bg-opacity-30 border-workday menu rounded-md m-4 overflow-y-auto"}
                         style={{height: wantedHeightsForList - 100, minHeight:100}}>
                        <div className={"p-4 pl-4"}>{headerEmployeesFinderList}</div>
                        <hr/>
                        {employeePickerData}
                    </div>

                    <div id={"bottom-picker"} className={"flex flex-row gap-2 justify-between p-4"} >
                        <ReusableButton
                            id={"finder-close"}
                            value={labelClose} onClick={() => {
                            setTitle(title)
                            setEmployeesFinderShowing(false)
                        }}/>
                        <div className={"flex flex-row gap-2 place-items-center "}>
                            {methodToUse !== 'grade' ?
                                <>
                                    <div className={"flex text-end"}>{labelEmployeeFinderExchanceEmployeesBetween}</div>
                                    <input id={"finder-swap-members"} type={"checkbox"} className={"w-6 h-6"} disabled={!isSwapPossible} onChange={(e) => setSwapOption(e.target.checked)}/>
                                </> :
                                <></>
                            }
                            <ReusableButton
                                id={"finder-approve"}
                                value={labelApprove} onClick={() => finderAcceptChanges()}/>
                        </div>
                    </div>
                </div> :
                <div id={"skills-finder"}
                     className={"every-page-on-scroll grid grid-cols-1"}
                     style={{minWidth: 800}}
                >
                    <div id={"skills-picker"} className={"flex flex-col justify-evenly text-workday text-center p-4"}>
                        <div>{skillsLabel}</div>
                        {skillsComponent}
                        <br/>
                        <div className={"p-4 flex flex-row justify-evenly"}>
                            <ReusableButton
                                id={"finder-skills-approve"}
                                value={labelApprove} onClick={() => choseSkills()}/>
                            <ReusableButton
                                id={"finder-skills-close"}
                                value={labelClose} onClick={() => {setSkillsNotShows(true)}}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default EmployeesFinder;