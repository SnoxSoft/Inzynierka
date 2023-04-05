
import React from "react";

const EmployeeRow = ({employee, row, team}) => {
    return <div key={"employee-teams-" + row}
                className={"hover:cursor-pointer w-44 row-start-"+row+" col-start-1 text-workday text-right"}>
        {employee.firstname + ' ' + employee.lastname}
    </div>
}

export default EmployeeRow;