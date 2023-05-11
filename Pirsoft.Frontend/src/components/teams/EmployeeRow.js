
import React, {useState} from "react";
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";
import ReusableButton from "../base/ReusableButton";
import {MdOpenInNew} from "react-icons/md";
import {FiSettings} from "react-icons/fi";

const EmployeeRow = ({employee, row, id}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleRight/>);

    const[optionsEditVisible,setOptionsEditVisible] = useState(false)

    return <ReusableButton id={id} key={id + "-key"}
                // className={"hover:cursor-default w-44 row-start-"+row+" col-start-1 text-workday hover:cursor-pointer flex flex-row place-content-end gap-1"}
                    value={
                            <div className={"text-right"}>
                            {employee.first_name + ' ' + employee.last_name}
                            </div>
                        }

                    formatting={" w-44 row-start-"+row+" col-start-1 text-workday hover:cursor-pointer flex flex-row place-content-end gap-1 "} color={""}
                    hover={""}
                    link={"/employee/"+employee.employee_id}/>
}

export default EmployeeRow;