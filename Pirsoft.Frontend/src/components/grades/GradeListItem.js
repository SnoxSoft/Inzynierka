import React, {useState} from "react";
import GradeRating from "./GradeRating";
import {employeeGradedText, employeeGradeText} from "../../GlobalAppConfig";

const GradeListItem = ({id, grade, setGradeMode, setPickedGradeData, setGradesVisible, mode}) => {

    return <li id={id} className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth hover:cursor-pointer hover:bg-opacity-80 rounded-md bg-brown-menu border-b-workday border-2"}
            onClick={() => {setPickedGradeData(grade);setGradeMode("view");setGradesVisible(false);}}>
                <div>{grade.quarter_name}</div>
                <div className={"flex flex-col"}>
                    <div className={"place-self-start"}>
                        {grade.grade_title}, {mode === "given" ? employeeGradeText + " " + grade.grade_graded_name : employeeGradedText + " " + grade.grade_creator_name} {grade.grade_create_time}
                    </div>
                    <div className={"place-self-start text-left"} >
                        {grade.grade_message.length > 30 ? grade.grade_message.slice(0, 150) + ".." : grade.grade_message}
                    </div>
                    <div className={"flex flex-row"}>
                        <GradeRating value={grade.quarter_grade}/>
                        <div></div>
                    </div>
                </div>
    </li>

}

export default GradeListItem;