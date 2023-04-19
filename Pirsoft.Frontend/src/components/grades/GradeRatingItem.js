import React from "react";
import {TiStarFullOutline, TiStarOutline} from "react-icons/ti";

const GradeRatingItem = ({id, rating,
                             createMode = false,
                             fullStar = false,
                             onChange}) => {
    let star = []
    let hoverAction = ""
    if(createMode){
        hoverAction = "hover:cursor-pointer"
    }

    if(fullStar){
        star = <TiStarFullOutline id={id + "-rating-" + rating} key={"star_"+rating} fontSize={30}
                                  className={"text-rating " + hoverAction}
                                  onClick={() => onChange(rating)}
        />
    }
    else
        star = <TiStarOutline id={id + "-rating-" + rating} key={"star_"+rating} fontSize={30}
                              className={"text-rating " + hoverAction}
                              onClick={() => onChange(rating)}
        />

    return <>
        {star}
    </>

}

export default GradeRatingItem;