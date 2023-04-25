import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {labelRequest, labelShowProfile} from "../../GlobalAppConfig";
import {BsPersonCircle} from "react-icons/bs";

const EmployeeListItem = ({employee, action, showRequest, id}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    return <li id={id} className={"flex flex-row m-2 p-4 gap-2 hover:bg-dayoffmonth hover:cursor-default hover:bg-opacity-80 rounded-md bg-brown-menu border-b-workday border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}>
                <div className={"grow-0"}>
                {/*{employee.avatar ?*/}
                {/*    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-12 rounded-2xl"}/>*/}
                {/*    : <BsPersonCircle />*/}
                {/*}*/}
                    <BsPersonCircle fontSize={50}/>
                </div>
                <div className={"grow-0 flex flex-row self-center"}>
                    {employee.first_name} {employee.last_name}, {employee.employee_department_id}, {employee.employee_company_role_id}
                </div>
                <div className={"grow flex flex-row justify-end gap-2"}>
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
            </li>
}

export default EmployeeListItem;

//