import React from "react";
import ReusableButton from "../components/base/ReusableButton";

import {
    labelApprove, labelClose, pageSkillPicker,
    skillsLabel
} from "../GlobalAppConfig";

function SkillPicker({parent, loadedAllSkills, skillsData, setSkillsData,
                         actionSetTrue = undefined, actionSetFalse}) {
    document.title = pageSkillPicker;

    const saveSkills = () => {
        const element = document.getElementById('skills-edit');
        const elements = element.getElementsByTagName("div");

        let skillsList = [];
        for (const ele in elements) {
            if(elements[ele].tagName  === 'DIV'){
                const p = elements[ele].getElementsByTagName("p")[0];
                const input = elements[ele].getElementsByTagName("input")[0];

                if (p !== undefined && input !== undefined && input.checked) {
                    skillsList.push({skill_id: p.id, skill_name: p.textContent});
                }
            }
        }

        setSkillsData(skillsList)
        if(actionSetTrue !== undefined){
            actionSetTrue(true)
        }
        if(actionSetFalse !== undefined){
            actionSetFalse(false)
        }
    }

    let skillsComponent = []
    let skillId = 0;
    loadedAllSkills.map((skill) => {
        let hasSkill = false;

        skillsData.map((employeeSkill) => {
            if (skill.skill_name.includes(employeeSkill.skill_name)) {
                hasSkill = true;
            }
        })

        skillsComponent.push(
            <>
                <div id={"employee-skill-list-item-" + skillId} key={"skill" + skill.skill_id}
                     className={"grid grid-cols-2 gap-4 p-4 h-9 content-center"}>
                    <p id={skill.skill_id}>{skill.skill_name}</p>
                    <input
                        id={"employee-skill-list-item-" + skillId + "-checkbox"}
                        className={"accent-workday"} type={"checkbox"} defaultChecked={hasSkill}/>
                </div>
                <hr/>
            </>
        );
        skillId++;
    });

    return <div id={"skills-" + parent}
                className={"every-page-on-scroll grid grid-cols-1 bg-blue-menu text-workday text-center hover:cursor-default"}
                style={{minWidth: 800}}>

        <div id={"skills-edit"} className={"flex flex-col justify-evenly"}>
            <div>{skillsLabel}</div>
            {skillsComponent}
            <div className={"p-4 flex flex-row justify-evenly"}>
                <ReusableButton id={"employee-skills-approve"}
                                value={labelApprove} onClick={() => saveSkills()}/>
                <ReusableButton id={"employee-skills-close"}
                                value={labelClose} onClick={() => {
                    actionSetTrue(true);
                    actionSetFalse(false)
                }}/>
            </div>
        </div>
    </div>
}

export default SkillPicker;