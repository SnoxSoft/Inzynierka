import {Link, useNavigate, useParams} from "react-router-dom";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import React, {useEffect, useState} from "react";
import FunctionForResize from "../base/FunctionForResize";
import {useSelector} from "react-redux";
import {selectId} from "../../store/EmployeeSlice";
import ReusableButton from "../base/ReusableButton";

function SkillChangeFrame() {

    const {id} = useParams();
    const navigate = useNavigate();

    const employee = useSelector(selectId(id))

    // bedzie pobierana cala lista umiejętności z bazy danych
    const allSkills = ["GROOVY", "C++", "SQL", "WORD", "EXCEL","PHP", "JAVA", "C#"]
    let details = [];

    for(const availableSkill in allSkills){
        let hasSkill = false;
        for (const property in employee.skills) {
            if(allSkills[availableSkill].includes(employee.skills[property])){
                hasSkill = true;
            }
        }
        details.push(
        <div className={"grid grid-cols-2 gap-4 p-4 h-9"} key={availableSkill}>
            <p>{allSkills[availableSkill]}</p><input className={"bg-weekend checked:bg-weekend"} type={"checkbox"} defaultChecked={hasSkill}/>
        </div>
            );
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("skills", {setWantedHeightForList});
    }, []);

    return <div id={"skills"}
            className={"p-4 grid grid-cols-1 bg-blue-menu rounded-md border-2 border-b-workday text-workday overflow-y-auto text-center" +
                ""}
            style={{ height: wantedHeightsForList } }>
                <div>UMIEJĘTNOŚCI</div>
                {details}
                <div className={"p-4 flex flex-row justify-evenly"}>
                    <ReusableButton value={"ZATWIERDŹ"}/>
                    <ReusableButton value={"ZAMKNIJ"} onClick={() => navigate(-1)}/>
                </div>
    </div>
}

export default SkillChangeFrame;