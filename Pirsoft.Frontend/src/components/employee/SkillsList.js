
const SkillsList = ({noPerson}) => {

    let details = [];
    console.log("ghghghg")
    console.log(noPerson['skills'])
    console.log("cvvvvvvvvv")
    for (const property in noPerson.skills) {
        console.log(property)
        details.push(
            <li>
                {property}
            </li>
        );
    }

    {noPerson.map(employee => {
        console.log(employee.skills)
        {employee.skills.map(skill => {
            console.log(skill)
            details.push(
                <li>
                    {skill}
                </li>)
        })
        }})
    }

    console.log(details)

    return <div>
        <p>UMIEJĘTNOŚCI</p>
        <ul>
        {details}
    </ul>
    </div>
}

export default SkillsList;