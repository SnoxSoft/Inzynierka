import {Link, useNavigate, useParams} from "react-router-dom";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import FunctionForResize from "../base/FunctionForResize";
import {useSelector} from "react-redux";
import {selectId} from "../../store/EmployeeSlice";
import ReusableButton from "../base/ReusableButton";

function SkillChangeFrame() {

    const {id} = useParams();
    const navigate = useNavigate();

    const employee = useSelector(selectId(id))

    // bedzie pobierana cala lista umiejętności z bazy danych
    const allSkills = ["GROOVY", "C++", "SQL", "WORD", "EXCEL","PHP", "JAVA", "C#"]
    let details = [];

    for(const availableSkill in allSkills){
        let hasSkill = false;
        for (const property in employee.skills) {
            if(allSkills[availableSkill].includes(employee.skills[property])){
                hasSkill = true;
            }
        }
        details.push(
        <div key={"skill"+availableSkill} className={"grid grid-cols-2 gap-4 p-4 h-9"}>
            <p>{allSkills[availableSkill]}</p><input className={"bg-weekend checked:bg-weekend"} type={"checkbox"} defaultChecked={hasSkill}/>
        </div>
            );
    }

    const saveSkills = () => {
        const element = document.getElementById('skills-edit');
        const elements = element.getElementsByTagName("div");

        let skillsList = [];
        try {
            for(const ele in elements){

                const p = elements[ele].getElementsByTagName("p")[0];
                const input = elements[ele].getElementsByTagName("input")[0];

                if(p !== undefined && input !== undefined && input.checked){
                    skillsList.push(p.textContent+"");
                }
            }
        }catch (e) {
        }
        const myObjStr = JSON.stringify(skillsList);
        //console.log(myObjStr);

        //tutaj muszę zbudować jsona dla api do edycji umiejętności
        // edycja usuwa wszystkie skille i zapisuje na nowo umiejętności, najlepsze rozwiązanie
        fetch("http://127.0.0.1:3001/editSkills/"+id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: "ABC",
                        body: myObjStr,
                        userId: Math.random().toString(36).slice(2),
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((response) => {console.log(response)
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("skills", {setWantedHeightForList});
    }, []);

    return <div id={"skills"}
            className={"p-4 grid grid-cols-1 bg-blue-menu rounded-md border-2 border-b-workday text-workday overflow-y-auto text-center" +
                ""}
            style={{ height: wantedHeightsForList } }>

                <div id={"skills-edit"} className={"flex flex-col justify-evenly"}>
                    <div>UMIEJĘTNOŚCI</div>
                    {details}
                    <div className={"p-4 flex flex-row justify-evenly"}>
                        <ReusableButton value={"ZATWIERDŹ"} onClick={saveSkills}/>
                        <ReusableButton value={"ZAMKNIJ"} onClick={() => navigate(-1)}/>
                    </div>
                </div>
    </div>
}

export default SkillChangeFrame;