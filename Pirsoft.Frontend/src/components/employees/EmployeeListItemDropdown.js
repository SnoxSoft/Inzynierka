
import React from "react";
import {Link} from "react-router-dom";

const EmployeeListItemDropdown = ({employee}) => {

    return <li id={`li_${employee.id}`}
               className={"m-4 p-4 hover:bg-dayoffmonth hover:cursor-pointer rounded-md bg-brown-menu border-b-workday border-2"}>

        {employee.avatar ?
            <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"h-auto w-9"}/>
            : null}
        <Link to={`/employee/${employee.id}`}>
        <p>
            {employee.firstname} {employee.lastname}, {employee.team}, {employee.position}
        </p>
        </Link>
    </li>

}

export default EmployeeListItemDropdown;

