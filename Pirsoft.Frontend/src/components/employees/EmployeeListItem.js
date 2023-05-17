import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {labelRequest, labelShowProfile} from "../../GlobalAppConfig";
import {BsPersonCircle} from "react-icons/bs";
import axios from "axios";

const EmployeeListItem = ({employee, action, showRequest, id, teams, positions, positionLevels}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    const [couldFindPicture, setCouldFindPicture] = useState(true)

    axios
        .get(process.env.PUBLIC_URL + removePathPart(employee.avatar_file_path))
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

    return <div id={id} className={"rounded-md grid grid-cols-6 m-2 p-4 hover:cursor-default hover:bg-opacity-80 hover:bg-brown-menu hover:border-b-workday hover:border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}>
                <div className={"place-self-center"}>
                    {employee.avatar_file_path !== undefined && employee.avatar_file_path !== "" && couldFindPicture ?
                        <img
                            style={{ width: 40, height: 40 }}
                            id={id}
                            src={process.env.PUBLIC_URL + removePathPart(employee.avatar_file_path)}
                            alt="Image"
                            className="card-img-top mx-auto text-center h-16 rounded-full"/>
                        :
                        <BsPersonCircle fontSize={40}/>
                    }
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {employee.first_name} {employee.last_name}
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {employee.employee_department.department_name}
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {employee.employee_seniority_level.seniority_level_name}
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {employee.employee_company_role.role_name}
                </div>
                <div className={"grow flex flex-row place-self-center gap-x-2"}>
                    {showHideButtons && (
                        <>
                            <ReusableButton id={id + "-request"} value={labelRequest} onClick={() => {
                                action(employee)
                                showRequest(true)
                            }}></ReusableButton>
                            <ReusableButton id={id + "-profile"} value={labelShowProfile} link={`/employee/${employee.employee_id}`}></ReusableButton>
                        </>
                    )
                    }
                </div>
            </div>
}

export default EmployeeListItem;