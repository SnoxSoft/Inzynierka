import React, {useEffect, useState} from "react";
import {fetchGetAbsencesTypes} from "../../DataFetcher";
import {useNavigate} from "react-router-dom";
import {absent, dayoff, demand, occasional} from "../../GlobalAppConfig";

function Legend({bigLegend = false, id}){

    const navigate = useNavigate();

    const [legendItems, setLegendItems] = useState(null)

    useEffect(() => {
        if (legendItems === null) {
            setLegendItems([]);
            fetchGetAbsencesTypes(navigate)
                .then(legendItems => {
                    setLegendItems(legendItems)
                });
        }
    })

    let legendComponent = []

    if(legendItems !== null) {
        legendComponent.push(
            <div key={"legend-item-" + 0} className={"flex flex-row gap-1"}>
                <div className={"h-6 w-6 bg-workday rounded-md border-2"}></div>
            <div>Dzień pracujący</div>
        </div>)
        legendComponent.push(
            <div key={"legend-item-" + 1} className={"flex flex-row gap-1"}>
                <div className={"h-6 w-6 bg-weekend rounded-md border-2"}></div>
                <div>Weekend</div>
            </div>)
        legendItems.forEach((l, lId) => {
            if(bigLegend || bigLegend === false && l.absence_type_category === absent) {
                legendComponent.push(
                    <div key={"legend-item-" + lId + 2} className={"flex flex-row gap-1"}>
                        <div
                            className={"h-6 w-6 bg-" + (l.absence_type_category === demand || l.absence_type_category.toString() === occasional ? dayoff : l.absence_type_category) + " rounded-md border-2"}></div>
                        <div>{l.absence_type_name}</div>
                    </div>
                )
            }
        });
    }

    return(
        <div
            id={id}
            className={"every-page-on-scroll bg-brown-menu overflow-y-hidden text-workday flex flex-col gap-1 p-2"}>
            {legendComponent}
        </div>
    )
}

export default Legend;