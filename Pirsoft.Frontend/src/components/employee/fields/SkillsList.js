import {skillsLabel} from "../../../GlobalAppConfig";

const SkillsList = ({skillList}) => {

    let details = [];

    for (const skill in skillList) {
        details.push(
            <li key={skill}>
                {skillList[skill]}
            </li>
        );
    }

    return <div className={"text-center"}>
        <p>{skillsLabel}</p>
        <ul>
            {details}
        </ul>
    </div>
}

export default SkillsList;