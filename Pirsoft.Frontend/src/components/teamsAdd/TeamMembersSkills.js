import {useState} from "react";
import FunctionForSortingJson from "../base/FunctionForSortingJson";


const TeamMembersSkills = ({value}) => {

    let randomNumber = 0;
    let colors = ["bg-red-500", "bg-blue-400", "bg-green-700", "bg-orange-400"]

    let skillComponents = []

    if(value[0] !== undefined && value !== []) {
        value.sort(FunctionForSortingJson("value", "ascending"))

        let currentValue = value[0].value

        value.forEach((s) => {

            if (parseInt(s.value) !== parseInt(currentValue)) {
                if (randomNumber < 3) {
                    randomNumber = randomNumber + 1
                } else randomNumber = 0
                currentValue = s.value
            }
            skillComponents.push(
                <>
                    <div key={s.name + "" + s.value} className={"col-start-1 text-center"}>{s.name}</div>
                    <div key={s.value + "" + s.name}
                         className={"col-start-2 text-center " + colors[randomNumber] + " rounded-md"}>{s.value}</div>
                </>)

        })
    }

    return (
        <div className={"bg-gray-500 border-2 border-gray-400 w-96 h-fit rounded-md flex flex-col items-center place-content-center text-black"}>

            <div className={"grid grid-cols-2 min-w-full gap-2 p-2"}>
                {skillComponents}
            </div>
        </div>
    )
}

export default TeamMembersSkills;