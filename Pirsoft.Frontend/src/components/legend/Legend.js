import React from "react";

function Legend({bigLegend = false, id}){

    let legendItem = [
        {color: "bg-workday", text: "Dzień pracujący"},
        {color: "bg-dayoffmonth", text: "Dzień z poza bieżącego miesiąca", bigLegend: true},
        {color: "bg-dayoff", text: "Dzień urlopowy", bigLegend: true},
        {color: "bg-sick", text: "Dzień chorobowy", bigLegend: true},
        {color: "bg-weekend", text: "Weekend"},
        {color: "bg-absent", text: "Nieobecność"}

    ]

    let legendComponent = []

    legendItem.forEach((l) => {
        if(l.bigLegend === undefined ||
        l.bigLegend === bigLegend) {
            legendComponent.push(
                <div className={"flex flex-row gap-1"}>
                    <div className={"h-6 w-6 " + l.color + " rounded-md border-2"}></div>
                    <div>{l.text}</div>
                </div>
            )
        }
    });

    return(
        <div
            id={id}
            className={"every-page-on-scroll bg-brown-menu overflow-y-hidden text-workday flex flex-col gap-1 p-2"}>
            {legendComponent}
        </div>
    )
}

export default Legend;