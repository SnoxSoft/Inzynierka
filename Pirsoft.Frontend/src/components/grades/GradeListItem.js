import React, {useState} from "react";
import GradeRating from "./GradeRating";

const GradeListItem = ({grade, setGradeMode, setPickedGradeData, setGradesVisible}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    return <li className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth hover:cursor-pointer hover:bg-opacity-80 rounded-md bg-brown-menu border-b-workday border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions} onClick={() => {
                                            setPickedGradeData(grade);
                                            setGradeMode("view");
                                            setGradesVisible(false);}}>
                <div>{grade.quartet}</div>
                <div className={"flex flex-col"}>
                    <div className={"place-self-start"}>
                        {grade.title} Ocena pracownika: {grade.personName} {grade.time}
                    </div>
                    <div className={"place-self-start text-left"}>
                        {grade.message}
                    </div>
                    <div className={"flex flex-row"}>
                        <GradeRating value={grade.grade}/>
                        <div></div>
                    </div>
                </div>
    </li>

}

export default GradeListItem;