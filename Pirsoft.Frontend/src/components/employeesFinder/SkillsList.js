
const SkillsList = ({skillList, id}) => {

    let details = [];
    let row = 0;
    for (const skill in skillList) {
        details.push(
            <div id={id + "-item-"+row} key={skill}>
                {skillList[skill]}
            </div>
        );
        row++;
    }

    return <div id={id} className={"flex flex-row gap-2"}>
        {details}
    </div>
}

export default SkillsList;