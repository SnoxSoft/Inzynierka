import {useState} from "react";


const TeamMembersSkills = ({value}) => {
    function getSortOrder(prop) {
        return function(a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    let randomNumber = 0;
    let colors = ["bg-red-500", "bg-blue-400", "bg-green-700", "bg-orange-400"]

    let skillComponents = []

    value.sort(getSortOrder("value"))
    const columnCount = value[0].value + 1

    console.log("column count"+ columnCount)

    let currentValue = value[0].value

    value.forEach((s) => {
        console.log(s.value + " " + currentValue)
        console.log(s.value !== currentValue)
        if(parseInt(s.value) !== parseInt(currentValue)){
            if(randomNumber < 3){ randomNumber = randomNumber + 1}
            else randomNumber = 0
            currentValue = s.value
        }
        skillComponents.push(
            <>
                <div key={s.name+""+s.value}className={"col-start-1 text-center"}>{s.name}</div>
                <div key={s.value+""+s.name} className={"col-start-2 col-span-"+s.value+" text-center "+colors[randomNumber]+" rounded-md"}>{s.value}</div>
            </>)

    })
    console.log(value)

    return (
        <div className={"bg-gray-500 border-2 border-gray-400 w-96 h-fit rounded-md flex flex-col items-center place-content-center text-black"}>

            <div className={"grid grid-cols-"+columnCount+" min-w-full gap-2 p-2"}>
                {skillComponents}
            </div>
        </div>
    )
}

export default TeamMembersSkills;