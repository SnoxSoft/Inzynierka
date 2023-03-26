import React, {useState} from "react";

import ReusableButton from "../base/ReusableButton";
import {MdOpenInNew} from "react-icons/md";
import GradeRating from "./GradeRating";

const GradeListItem = ({grade}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    return <li className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth hover:cursor-pointer hover:bg-opacity-80 rounded-md bg-brown-menu border-b-workday border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}>
                <div>{grade.quartet}</div>
                <div className={"flex flex-col"}>
                    <div className={"place-self-start"}>
                        {grade.title} {grade.time}
                    </div>
                    <div className={"place-self-start text-left"}>
                        {grade.message}
                    </div>
                    <GradeRating rating={grade.grade}/>
                </div>
    </li>

}

export default GradeListItem;