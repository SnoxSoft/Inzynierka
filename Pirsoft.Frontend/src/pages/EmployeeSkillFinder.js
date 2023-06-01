import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import SortingButton from "../components/employeesFinder/SortingButton";
import SkillsList from "../components/employeesFinder/SkillsList";
import SkillsPicker from "../components/employeesFinder/SkillsPicker";
import EmployeePickerListItem from "../components/employeesFinder/EmployeePickerListItem";
import FunctionForResize from "../components/base/FunctionForResize";
import {
    headerEmployeesFinder, headerEmployeesFinderEmployeeList,
    headerEmployeesFinderList, headerEmployeesFinderSkillsList, labelApprove,
    labelClose,
    labelFind, labelFirstNameAndLastName, labelSkillPicked, pageNameSkillsFinder
} from "../GlobalAppConfig";
import SkillPicker from "./SkillPicker";
import {useNavigate} from "react-router-dom";
import {fetchGetAllEmployees, fetchGetAllSkillsAndSort} from "../DataFetcher";
import {getLocalStorageKeyWithExpiry} from "../components/jwt/LocalStorage";
import FirstnameAndLastname from "../components/employees/search/fields/FirstnameAndLastname";

const EmployeeSkillFinder = ({mode = "", setHideFinder, setPickedPerson}) => {

    document.title = pageNameSkillsFinder;

    const navigate = useNavigate();

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }
    },[])

    // Opcje do filtrowania
    const [skillsPicked, setSkillsPicked] = useState([])
    const [order, setOrder] = useState(true);
    const [firstnameAndLastname, setFirstnameAndLastname] = useState();

    const [skillsNotShows, setSkillsNotShows] = useState(true)

    const [employeePickerData, setEmployeePickerData] = useState(null)
    function loadAllEmployeesByFilter(){
        fetchGetAllEmployees(navigate,true, order ? "ascending" : "descending").then((response) => {
            let filteredEmployeeList = []
            console.clear()
            response.forEach((employee, employeeId) => {
                const employeeName = employee.first_name + " " + employee.last_name
                // Jeśli tylko wpisana nazwa pracownika
                if (firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0) {
                    if (employeeName.toLowerCase().includes(firstnameAndLastname.toString().toLowerCase())) {
                        if(skillsPicked.length !== 0){
                            let hasAllPickedSkills = true;

                            skillsPicked.forEach(skillPicked => {
                                const hasSkill = employee.employee_skills.some(employeeSkill => {
                                    return employeeSkill.skill_id.toString().trim() === skillPicked.skill_id.toString().trim();
                                });

                                if (!hasSkill) {
                                    hasAllPickedSkills = false;
                                }
                            });

                            if (hasAllPickedSkills) {
                                filteredEmployeeList.push(
                                    <EmployeePickerListItem key={"finder-list-item-" + employeeId} employee={employee} setPickedPerson={setPickedPerson} />
                                );
                            }
                        }
                        else {
                            filteredEmployeeList.push(
                                <EmployeePickerListItem id={"finder-list-item-" + employeeId} employee={employee} setPickedPerson={setPickedPerson}/>
                            )
                        }
                    }
                }
                else {
                    if(skillsPicked.length !== 0) {
                        let hasAllPickedSkills = true;

                        skillsPicked.forEach(skillPicked => {
                            const hasSkill = employee.employee_skills.some(employeeSkill => {
                                return employeeSkill.skill_id.toString().trim() === skillPicked.skill_id.toString().trim();
                            });

                            if (!hasSkill) {
                                hasAllPickedSkills = false;
                            }
                        });

                        if (hasAllPickedSkills) {
                            filteredEmployeeList.push(
                                <EmployeePickerListItem key={"finder-list-item-" + employeeId}
                                    employee={employee} mode={mode} setPickedPerson={setPickedPerson}/>
                            );
                        }
                    }
                    else {
                        filteredEmployeeList.push(
                            <EmployeePickerListItem id={"finder-list-item-" + employeeId}
                                    employee={employee} mode={mode} setPickedPerson={setPickedPerson}/>
                        )
                    }
                }
            })
            setEmployeePickerData(filteredEmployeeList)
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

    if(employeePickerData === null){
        loadAllEmployeesByFilter();
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
                                <div className={"flex flex-row gap-2"}>
                                    <p className={""}>{labelFirstNameAndLastName}</p>
                                    <FirstnameAndLastname id={"finder-firstname-lastname"} className={""}
                                                          onChange={setFirstnameAndLastname}
                                    value={firstnameAndLastname}/>
                                </div>
                                {mode !== "grade" ?
                                    <>
                                    <SkillsPicker id={"finder-skill-picker"}
                                                  loadAllSkills={loadAllSkills}
                                                  setSkills={setSkillsPicked}
                                                  setSkillsNotShows={setSkillsNotShows}/>
                                    <div className={"flex flex-row gap-2"}>
                                        <div>{labelSkillPicked}</div>
                                        <SkillsList id={"finder-skill-list"}
                                                    skillList={skillsPicked}/>
                                    </div>
                                    </>
                                    :
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
                        <div className={"p-4 pl-4 flex flex-row justify-self-start w-full place-content-between"}>
                            <div>{headerEmployeesFinderEmployeeList}</div>
                            <div>{headerEmployeesFinderSkillsList}</div>
                        </div>
                        <hr/>
                        {employeePickerData}
                    </div>

                    <div id={"bottom-picker"} className={"flex flex-row gap-2 justify-center p-4"} >
                        <ReusableButton
                            id={"finder-close"}
                            value={labelClose} onClick={() => {
                                if(mode === "grade"){
                                    setHideFinder(false)
                                }
                                else {
                                    navigate(-1)
                                }
                        }}/>
                        {mode === "grade" ?
                            <ReusableButton
                                id={"finder-approve"}
                                value={labelApprove} onClick={() => {
                                if(mode === "grade"){
                                    setHideFinder(false)
                                }
                            }}/>
                            :
                            <></>
                        }
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