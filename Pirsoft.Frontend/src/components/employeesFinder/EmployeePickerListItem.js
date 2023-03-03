import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";

const EmployeePickerListItem = ({employee}) => {
    const[showHideButtons, setShowHideButtons] = useState(true);

    let skillList = []
    employee.skills.forEach((s) => {
        skillList.push(<div>{s}</div>)
    })

    return <div row={employee.firstname+"-"+employee.id}
                className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth hover:cursor-pointer hover:bg-opacity-80 rounded-md hover:border-b-workday hover:border-2"}>
                <div className={"grow-0 flex flex-row items-center justify-end gap-2"}>
                    {/*{showHideButtons && (*/}
                        <>
                            <input type={"checkbox"} className={"w-5 h-5"}/>
                            <input type={"radio"} className={"w-5 h-5"}/>
                        </>

                    {/*}*/}
                </div>
                <div className={"grow-0"}>
                {employee.avatar ?
                    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-10 rounded-2xl"}/>
                    : null}
                </div>
                <div className={"flex flex-row gap-2 grow items-center place-content-between"}>
                    <div>
                        {employee.firstname} {employee.lastname}, {employee.team}, {employee.position}
                    </div>
                    <div className={"flex flex-row gap-2 flex-wrap"}>
                        {skillList}
                    </div>
                </div>


            </div>
}

export default EmployeePickerListItem;

//