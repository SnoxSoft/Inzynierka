
import {BiHide, BiShow} from "react-icons/bi";
import React, {useState} from "react";
import {VscTriangleDown,VscTriangleRight} from "react-icons/vsc";

const TeamRow = ({team, row}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<VscTriangleDown/>);

    // dołączyć całą funkcjonalność do chowania zespołów
    function changeVisibilityForPassword() {
        if (changeVisibilityIcon.type === VscTriangleDown) {
            setChangeVisibilityIcon(<VscTriangleRight />);
        } else {
            setChangeVisibilityIcon(<VscTriangleDown />);
        }
    }

    return <div key={"team" + team.value}
                onClick={() => changeVisibilityForPassword()}
                className={"hover:cursor-pointer row-start-"+row+" col-start-1 text-workday text-left"}>
            <button>{changeVisibilityIcon}</button>
            {team.value}
        </div>
}

export default TeamRow;