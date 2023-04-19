import {skillsLabel} from "../../../GlobalAppConfig";

const SkillsList = ({id, skillList}) => {

    let details = [];
    let skillId = 0;
    for (const skill in skillList) {
        details.push(
            <li id={id + "-item-" + skillId} key={skill}>
                {skillList[skill]}
            </li>
        );
        skillId++;
    }

    return <div id={id} className={"text-center"}>
        <p>{skillsLabel}</p>
        <ul>
            {details}
        </ul>
    </div>
}

export default SkillsList;