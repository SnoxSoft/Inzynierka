import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {BsPersonCircle} from "react-icons/bs";
import axios from "axios";

const EmployeePickerListItem = ({employee, id}) => {

    let skillList = []

    employee.employee_skills.map((skill) => {
        skillList.push(<div>{skill.skill_name}</div>)
    })

    let avatarData = employee.avatar_file_path;
    const [couldFindPicture, setCouldFindPicture] = useState(true)

    axios
        .get(process.env.PUBLIC_URL + removePathPart(avatarData))
        .then(() => {
        })
        .catch(() => {
            setCouldFindPicture(false);
        });
    function removePathPart(path) {
        var backslashes = path.split("\\");
        var newPath = "\\" + backslashes.slice(-3).join("\\");
        return newPath;
    }

    return <ReusableButton id={id} formatting={"m-2 hover:bg-dayoffmonth bg-brown-menu border-2 border-workday hover:cursor-default hover:bg-opacity-80 rounded-md hover:border-b-workday hover:border-2"}
                           value={(
                               <div className={"flex flex-row items-center self-center p-2 gap-2"}>
                                <div className={"grow-0"}>
                                    {avatarData !== undefined && avatarData !== "" && couldFindPicture ?
                                        <img
                                            style={{ width: 40, height: 40 }}
                                            id={id}
                                            src={process.env.PUBLIC_URL + removePathPart(avatarData)}
                                            alt="Image"
                                            className="card-img-top mx-auto text-center h-16 rounded-full"/>
                                        :
                                        <BsPersonCircle fontSize={40}/>
                                    }
                                </div>
                                <div className={"flex flex-row gap-2 grow items-center place-content-between"}>
                                    <div>
                                        {employee.first_name} {employee.last_name}, {employee.employee_department.department_name}, {employee.employee_company_role.role_name}
                                    </div>
                                    <div className={"flex flex-row gap-2 flex-wrap"}>
                                        {skillList}
                                    </div>
                                </div>
                           </div>)}>
        </ReusableButton>

}

export default EmployeePickerListItem;