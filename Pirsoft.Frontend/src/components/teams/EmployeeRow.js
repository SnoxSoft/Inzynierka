
import React, {useState} from "react";
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";
import ReusableButton from "../base/ReusableButton";
import {MdOpenInNew} from "react-icons/md";
import {FiSettings} from "react-icons/fi";

const EmployeeRow = ({employee, row, id}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleRight/>);

    function changeVisibilityForPassword() {
        if (changeVisibilityIcon.type === VscTriangleDown) {
            setChangeVisibilityIcon(<VscTriangleRight />);
            //setEmployeesVisible(false)
        } else {
            setChangeVisibilityIcon(<VscTriangleDown />);
            //setEmployeesVisible(true)
        }
    }

    const[optionsEditVisible,setOptionsEditVisible] = useState(false)

    return <div id={id} key={id + "-key"}
                className={"hover:cursor-default w-44 row-start-"+row+" col-start-1 text-workday flex flex-row place-content-end gap-1"}
                onMouseOver={() => setOptionsEditVisible(true)} onMouseLeave={() => setOptionsEditVisible(false)}>
        <div>
            {employee.first_name + ' ' + employee.last_name}
        </div>
        {optionsEditVisible ?
                <ReusableButton id={id + "-open-employee"} value={<MdOpenInNew/>}
                                formatting={""} color={""}
                                link={"/employee/"+employee.employee_id}/>
                : <></>
        }
    </div>

}

export default EmployeeRow;