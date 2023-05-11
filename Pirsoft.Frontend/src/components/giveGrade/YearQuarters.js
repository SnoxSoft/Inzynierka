import {labelQuarter} from "../../GlobalAppConfig";

const YearQuarters = ({id, onChange, value, createMode = false,
                      availableQuartets = []}) => {

    let quartets = []
    for(let i = 0 ; i < 4; i++) {
        if (!createMode && "Q" + (i + 1) === value) {
            quartets.push(
                <div key={"Q" + (i + 1)} className={"flex flex-col"}>
                    {"Q" + (i + 1)}
                    <input id={id + "-Q" + (i + 1)} type={"radio"} checked={true} name={"quartet-group"} className={"accent-brown-menu"}/>
                </div>
            )
        }
        if(createMode){
            if(availableQuartets.includes("Q" + (i + 1))) {
                quartets.push(
                    <div key={"Q" + (i + 1)} className={"flex flex-col"}>
                        {"Q" + (i + 1)}
                        <input id={id + "-Q" + (i + 1)} type={"radio"} name={"quartet-group"} value={"Q" + (i + 1)} className={"accent-brown-menu"}
                               onClick={(e) => onChange(e.target.value)}/>
                    </div>
                )
            }
        }
    }

    return <div id={id} className={"flex flex-col gap-2 hover:cursor-default"}>
        <div>{labelQuarter}</div>
        <div className={"flex flex-row gap-8 place-self-center"}>
            {quartets}
        </div>
    </div>

}
export default YearQuarters;