
const SkillsList = ({skillList}) => {

    let details = [];

    for (const skill in skillList) {
        details.push(
            <div key={skill}>
                {skillList[skill]}
            </div>
        );
    }

    return <div className={"flex flex-row gap-2"}>
        {details}
    </div>
}

export default SkillsList;