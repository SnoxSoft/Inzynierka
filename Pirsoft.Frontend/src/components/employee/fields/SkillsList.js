import {skillsLabel} from "../../../GlobalAppConfig";

const SkillsList = ({id, skillList}) => {

    let details = [];
    let skillId = 0;

    skillList.map((skill) =>{
        details.push(
                <li id={id + "-item-" + skillId} key={id + "-item-" + skillId}>
                    {skill.skill_name}
                </li>)
        skillId++;
    })

    return <div id={id} className={"text-center"}>
        <p>{skillsLabel}</p>
        <ul>
            {details}
        </ul>
    </div>
}

export default SkillsList;