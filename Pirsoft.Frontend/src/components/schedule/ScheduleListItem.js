import React, {useState} from "react";
import {HiArrowLeft} from "react-icons/hi";

const EmployeeListItem = ({text, date, setShowHidePickedMonth}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    const openWholeMonth = () => {
        console.clear()
        console.log(date)
        setShowHidePickedMonth(false)

    }

    return <li className={"flex flex-row m-4 p-4 gap-4 text-workday hover:cursor-pointer rounded-md max-w-fit"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}
               onClick={() => openWholeMonth()}>
                <div className={"grow-0"}>
                    {text}
                </div>
                <div className={"flex flex-row justify-start gap-2"}>
                    {showHideButtons && (
                        <button><HiArrowLeft /></button>
                    )
                    }
                </div>
            </li>
}

export default EmployeeListItem;

//