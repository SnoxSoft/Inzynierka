import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {labelRequest, labelShowProfile} from "../../GlobalAppConfig";
import {BsPersonCircle} from "react-icons/bs";

const EmployeeListItem = ({employee, action, showRequest, id, teams, positions, positionLevels}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    return <div id={id} className={"rounded-md grid grid-cols-6 m-2 p-4 hover:cursor-default hover:bg-opacity-80 hover:bg-brown-menu hover:border-b-workday hover:border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}>
                <div className={"place-self-center"}>
                    {/*{employee.avatar ?*/}
                    {/*    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-12 rounded-2xl"}/>*/}
                    {/*    : <BsPersonCircle />*/}
                    {/*}*/}
                    <BsPersonCircle fontSize={50}/>
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