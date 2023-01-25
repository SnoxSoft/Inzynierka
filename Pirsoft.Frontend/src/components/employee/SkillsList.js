
const SkillsList = ({noPerson}) => {

    let details = [];

    for (const property in noPerson.skills) {
        details.push(
            <li>
                {property}
            </li>
        );
    }

    {noPerson.map(employee => {
        {employee.skills.map(skill => {
            console.log(skill)
            details.push(
                <li>
                    {skill}
                </li>)
        })
        }})
    }

    return <div className={"text-center"}>
        <p>UMIEJĘTNOŚCI</p>
        <ul>
            {details}
        </ul>
    </div>
}

export default SkillsList;