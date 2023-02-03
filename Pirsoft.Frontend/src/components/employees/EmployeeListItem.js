import React, {useRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReusableButton from "../base/ReusableButton";

const EmployeeListItem = ({employee}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    return <li className={"flex flex-row m-2 p-4 gap-2 hover:bg-dayoffmonth hover:cursor-pointer hover:bg-opacity-80 rounded-md bg-brown-menu border-b-workday border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}>
                <div className={"grow-0"}>
                {employee.avatar ?
                    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-12 rounded-2xl"}/>
                    : null}
                {/*<Link to={`/employee/${employee.id}`}>*/}
                </div>
                <div className={"grow-0"}>
                    {employee.firstname} {employee.lastname}, {employee.team}, {employee.position}
                </div>
                <div className={"grow flex flex-row justify-end gap-2"}>
                    {showHideButtons && (
                        <>
                            <ReusableButton value={"WNIOSEK"}></ReusableButton>
                            <ReusableButton value={"POKAŻ PROFIL"} link={`/employee/${employee.id}`}></ReusableButton>
                        </>
                    )}

                </div>
                {/*</Link>*/}
            </li>

}

export default EmployeeListItem;

//