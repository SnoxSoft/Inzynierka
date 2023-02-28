
import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";
import {FiSettings} from "react-icons/fi";
import {MdOpenInNew} from "react-icons/md";

const TeamRow = ({team, row, setEmployeesVisible}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleRight/>);

    // dołączyć całą funkcjonalność do chowania zespołów
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

    return <div key={"team-teams-" + team.value}
                onMouseOver={() => setOptionsEditVisible(true)} onMouseLeave={() => setOptionsEditVisible(false)}
                className={"hover:cursor-pointer row-start-"+row+" col-start-1 text-workday text-left gap-2 flex flex-row"}>
            <div className={"flex flex-row"} onClick={() => changeVisibilityForPassword()}>
            <button>{changeVisibilityIcon}</button>
            <div>{team.value}</div>
            </div>
            {optionsEditVisible ?
                <>
                <button className={""} onClick={() => console.log("clicked open in new")}><MdOpenInNew/></button>
                <button className={""} onClick={() => console.log("clicked settings")}><FiSettings/></button>
                </> : <></>
            }
        </div>
}

export default TeamRow;