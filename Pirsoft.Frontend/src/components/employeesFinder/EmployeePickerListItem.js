import React from "react";
import ReusableButton from "../base/ReusableButton";
import {BsPersonCircle} from "react-icons/bs";

const EmployeePickerListItem = ({employee, id}) => {

    let skillList = []

    employee.employee_skills.map((skill) => {
        skillList.push(<div>{skill.skill_name}</div>)
    })

    return <ReusableButton value={(
            <div id={id} key={id}
                 className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth bg-brown-menu border-2 border-workday hover:cursor-default hover:bg-opacity-80 rounded-md hover:border-b-workday hover:border-2"}>
                <div className={"grow-0"}>
                    {/*{employee.avatar ?*/}
                    {/*    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-10 rounded-2xl"}/>*/}
                    {/*    : null}*/}
                    <BsPersonCircle fontSize={40}/>
                </div>
                <div className={"flex flex-row gap-2 grow items-center place-content-between"}>
                    <div>
                        {employee.first_name} {employee.last_name}, {employee.employee_department_id}, {employee.employee_company_role_id}
                    </div>
                    <div className={"flex flex-row gap-2 flex-wrap"}>
                        {skillList}
                    </div>
                </div>
            </div>)
    }></ReusableButton>

}

export default EmployeePickerListItem;