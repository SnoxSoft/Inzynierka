import React, {useRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReusableButton from "../base/ReusableButton";
import {labelRequest, labelShowProfile} from "../../GlobalAppConfig";

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
                {employee.avatar ?
                    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-12 rounded-2xl"}/>
                    : null}
                </div>
                <div className={"grow-0"}>
                    {employee.firstname} {employee.lastname}, {employee.team}, {employee.position}
                </div>
                <div className={"grow flex flex-row justify-end gap-2"}>
                    {showHideButtons && (
                        <>
                            <ReusableButton id={id + "-request"} value={labelRequest} onClick={() => {
                                action(employee)
                                showRequest(true)
                            }}></ReusableButton>
                            <ReusableButton id={id + "-profile"} value={labelShowProfile} link={`/employee/${employee.id}`}></ReusableButton>
                        </>
                    )
                    }
                </div>
            </li>
}

export default EmployeeListItem;

//