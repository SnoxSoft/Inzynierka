
import React from "react";

const EmployeeRow = ({employee, row, id}) => {

    return <div id={id} key={id}
                className={"hover:cursor-default w-44 row-start-"+row+" col-start-1 text-workday text-right pr-2"}>
        {employee.first_name + ' ' + employee.last_name}
    </div>
}

export default EmployeeRow;