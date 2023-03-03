import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import FirstnameAndLastname from "../components/employeesFinder/FirstnameAndLastname";
import SortingButton from "../components/employeesFinder/SortingButton";
import SkillsList from "../components/employeesFinder/SkillsList";
import SkillsPicker from "../components/employeesFinder/SkillsPicker";
import EmployeePickerListItem from "../components/employeesFinder/EmployeePickerListItem";
import FunctionForResize from "../components/base/FunctionForResize";


const EmployeesFinder = ({mode, title, setTitle, setEmployeesFinderShowing}) => {
    setTitle("PIRSOFT: Wyszukiwarka pracowników")

    const [teamData, setTeamData] = useState("");
    const [skillsPicked, setSkillsPicked] = useState([])

    const [skillsNotShows, setSkillsNotShows] = useState(true)

    const [skillsComponent, setSkillsComponent] = useState(<></>)
    const [skills, setSkills] = useState(Object);
    const [skillsLoaded, setSkillsLoaded] = useState(false)

    if (skills[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllSkills")
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
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
                console.log(response)
                setEmployeePickedDataLoad(response)
                setEmployeePickerDataLoaded(true)
                reloadEmployeePicker()
            })
            .catch((err) => {
                console.log(err.message);
            })

    }

    function reloadEmployeePicker(){
        let employeeLoad = []

        employeePickerDataLoad.forEach((e) => {
            employeeLoad.push(<EmployeePickerListItem employee={e}/>)
        })

        setEmployeePickerData(employeeLoad)
        setEmployeePickerDataLoaded(false)
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
                                <FirstnameAndLastname />
                                <SkillsPicker setSkills={setSkillsPicked} setSkillsNotShows={setSkillsNotShows}/>
                                <SkillsList skillList={skillsPicked}/>
                            </div>

                            <ReusableButton value={"SZUKAJ"}
                                onClick={() => loadAllEmployeesByFilter()}/>
                            <SortingButton/>
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
                            <div>Zamień pracowników miejscami</div>
                            <input type={"checkbox"} className={"w-6 h-6"} />
                            <ReusableButton value={"ZATWIERDŹ"} onClick={() => console.log("ZATWIERDŹ WYBORY")}/>
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