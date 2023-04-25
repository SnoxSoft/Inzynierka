
import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import {FiSettings} from "react-icons/fi";
import {MdOpenInNew} from "react-icons/md";
import ReusableButton from "../base/ReusableButton";

const TeamRow = ({team, row, setEmployeesVisible, id}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleRight/>);

    function changeVisibilityForPassword() {
        if (changeVisibilityIcon.type === VscTriangleDown) {
            setChangeVisibilityIcon(<VscTriangleRight />);
            setEmployeesVisible(false)
        } else {
            setChangeVisibilityIcon(<VscTriangleDown />);
            setEmployeesVisible(true)
        }
    }

    const[optionsEditVisible,setOptionsEditVisible] = useState(false)

    return <div id={id + "-hover"} key={id + "-hover"}
                onMouseOver={() => setOptionsEditVisible(true)}
                onMouseLeave={() => setOptionsEditVisible(false)}
                className={"hover:cursor-pointer row-start-"+row+" col-start-1 text-workday text-left gap-2 flex flex-row"}>
            <div id={id + "-open"} key={id + "-open"} className={"flex flex-row"} onClick={() => changeVisibilityForPassword()}>
                <button>{changeVisibilityIcon}</button>
                <div>{team.department_name}</div>
            </div>
            {optionsEditVisible ?
                <>
                    <ReusableButton id={id + "-view-team"} value={<MdOpenInNew/>}
                            formatting={""} color={""}
                            link={"/team-view/"+team.department_id}/>

                    <ReusableButton id={id + "-edit-team"} value={<FiSettings/>}
                            formatting={""} color={""}
                            link={"/team-edit/"+team.department_id}/>
                </> : <></>
            }
        </div>
}

export default TeamRow;