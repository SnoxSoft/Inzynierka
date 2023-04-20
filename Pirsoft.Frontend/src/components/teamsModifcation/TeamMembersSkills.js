import FunctionForSortingJson from "../base/FunctionForSortingJson";

const TeamMembersSkills = ({skills}) => {

    let randomNumber = 0;
    let colors = ["bg-red-500", "bg-blue-400", "bg-green-700", "bg-orange-400"]

    let skillComponents = []

    if(skills[0] !== undefined && skills !== []) {
        skills.sort(FunctionForSortingJson("value", "ascending"))

        let currentValue = skills[0].value

        skills.forEach((skill , skillId) => {

            if (parseInt(skill.value) !== parseInt(currentValue)) {
                if (randomNumber < 3) {
                    randomNumber = randomNumber + 1
                } else randomNumber = 0
                currentValue = skill.value
            }
            skillComponents.push(
                <>
                    <div id={"skill-name-" + skillId} key={skill.name + "" + skill.value} className={"col-start-1 text-center"}>{skill.name}</div>
                    <div id={"skill-grade-" + skillId} key={skill.value + "" + skill.name}
                         className={"col-start-2 text-center " + colors[randomNumber] + " rounded-md"}>{skill.value}</div>
                </>)

        })
    }

    return (
        <div className={"bg-gray-500 border-2 border-gray-400 w-96 h-fit rounded-md flex flex-col items-center place-content-center text-black"}>

            <div id={"team-members-skills-list"} className={"grid grid-cols-2 min-w-full gap-2 p-2"}>
                {skillComponents}
            </div>
        </div>
    )
}

export default TeamMembersSkills;