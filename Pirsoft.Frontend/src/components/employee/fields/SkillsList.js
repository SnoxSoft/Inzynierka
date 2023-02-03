
const SkillsList = ({noPerson}) => {

    let details = [];

    for (const property in noPerson.skills) {
        details.push(
            <li key={property}>
                {noPerson.skills[property]}
            </li>
        );
    }

    return <div className={"text-center"}>
        <p>UMIEJĘTNOŚCI</p>
        <ul>
            {details}
        </ul>
    </div>
}

export default SkillsList;