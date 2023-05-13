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
    labelClose,
    labelFind, pageNameSkillsFinder
} from "../GlobalAppConfig";
import SkillPicker from "./SkillPicker";
import {useNavigate} from "react-router-dom";
import {fetchGetAllEmployees, fetchGetAllSkillsAndSort} from "../DataFetcher";
import {getLocalStorageKeyWithExpiry} from "../components/jwt/LocalStorage";

const EmployeeSkillFinder = ({}) => {

    document.title = pageNameSkillsFinder;

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

    // Opcje do filtrowania
    const [skillsPicked, setSkillsPicked] = useState([])
    const [order, setOrder] = useState(true);
    const [firstnameAndLastname, setFirstnameAndLastname] = useState();

    const [skillsNotShows, setSkillsNotShows] = useState(true)

    const [skillsComponent, setSkillsComponent] = useState(<></>)
    //const [skills, setSkills] = useState();
    const [skillsLoaded, setSkillsLoaded] = useState(false)

    const [employeePickerData, setEmployeePickerData] = useState()
    const [employeePickerDataLoaded, setEmployeePickerDataLoaded] = useState(false)
    function loadAllEmployeesByFilter(){
        setEmployeePickerDataLoaded(false)

        fetchGetAllEmployees(navigate).then((response) => {
            let employeeLoad = []

            response.forEach((employee, employeeId) => {
                employeeLoad.push(
                    <EmployeePickerListItem id={"finder-list-item-" + employeeId} employee={employee}/>
                )
            })

            setEmployeePickerData(employeeLoad)
            setEmployeePickerDataLoaded(true)
        }).catch((err) => {
                console.log(err.message);
            })
    }

    const [loadedAllSkills, setLoadedAllSkills] = useState([])
    async function loadAllSkills(){
        setLoadedAllSkills([])
        let allSkillsLoad = []

        fetchGetAllSkillsAndSort(navigate).then((skills) => {
            skills.forEach((s) => {
                allSkillsLoad.push(s)
            })
            setLoadedAllSkills(allSkillsLoad)
        })
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("employee-picker", {setWantedHeightForList});
    }, []);

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
                                    <SkillsPicker id={"finder-skill-picker"}
                                                  loadAllSkills={loadAllSkills}
                                                  setSkills={setSkillsPicked}
                                                  setSkillsNotShows={setSkillsNotShows}/>
                                    <SkillsList id={"finder-skill-list"}
                                                skillList={skillsPicked}/>
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

                    <div id={"bottom-picker"} className={"flex flex-row gap-2 justify-center p-4"} >
                        <ReusableButton
                            id={"finder-close"}
                            value={labelClose} onClick={() => {
                            navigate(-1)
                        }}/>
                    </div>
                </div> :
                <SkillPicker parent={"finder"}
                             loadedAllSkills={loadedAllSkills}
                             skillsData={skillsPicked}
                             setSkillsData={setSkillsPicked}
                             actionSetTrue={setSkillsNotShows} />
            }
        </>
    )
}
export default EmployeeSkillFinder;