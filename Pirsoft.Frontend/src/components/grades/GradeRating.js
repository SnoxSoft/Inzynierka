import React from "react";
import {TiStarFullOutline, TiStarOutline} from "react-icons/ti";

const GradeRating = ({rating}) => {
    let ratings = []
    for (let i = 1; i<=5 ; i++){
        if(i <= rating){
            ratings.push(<>
                <TiStarFullOutline fontSize={30} className={"text-rating"}/>
            </>)
        }
        else
        ratings.push(<>
            <TiStarOutline fontSize={30} className={"text-rating"}/>
        </>)
    }

    return <div className={"place-self-start flex flex-row gap-2"}>
        {ratings}
    </div>

}

export default GradeRating;