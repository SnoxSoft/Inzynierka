
const SkillsList = ({skillList, id}) => {

    let details = [];
    let row = 0;

    skillList.map((skill) => {
        details.push(
            <div id={id + "-item-"+row} key={skill.skill_id}>
                {skill.skill_name}
            </div>
        );
        row++;
    })

    return <div id={id} className={"flex flex-row gap-2"}>
        {details}
    </div>
}

export default SkillsList;