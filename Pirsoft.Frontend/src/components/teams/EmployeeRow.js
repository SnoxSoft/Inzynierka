
import React, {useState} from "react";
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";
import ReusableButton from "../base/ReusableButton";
import {MdOpenInNew} from "react-icons/md";
import {FiSettings} from "react-icons/fi";

const EmployeeRow = ({employee, row, team}) => {

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

    return <div key={"employee-teams-" + row}
                className={"hover:cursor-default w-44 row-start-"+row+" col-start-1 text-workday flex flex-row place-content-end gap-1"}
                onMouseOver={() => setOptionsEditVisible(true)} onMouseLeave={() => setOptionsEditVisible(false)}>
        <div>
            {employee.firstname + ' ' + employee.lastname}
        </div>
        {optionsEditVisible ?
                <ReusableButton value={<MdOpenInNew/>}
                                formatting={""} color={""}
                                link={"/employee/"+employee.id}/>
                : <></>
        }
    </div>

}

export default EmployeeRow;