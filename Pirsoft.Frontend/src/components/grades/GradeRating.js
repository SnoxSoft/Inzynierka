import React, {useEffect} from "react";
import GradeRatingItem from "./GradeRatingItem";

const GradeRating = ({value, onChange,
         placing = "place-self-start", createMode = false})=> {
    let ratings = []

    function loadGradesStars() {
        for (let i = 1; i <= 5; i++) {
            ratings.push(
                <GradeRatingItem rating={i}
                                 fullStar={i <= value}
                                 createMode={createMode} onChange={onChange}/>)
        }
    }

    loadGradesStars()

    useEffect(() => {
        loadGradesStars()
    },[value])

    return <div className={placing + " flex flex-row gap-2"}>
        {ratings}
    </div>

}

export default GradeRating;