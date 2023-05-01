import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {BsPersonCircle} from "react-icons/bs";

const EmployeePickerListItem = ({employee, pickOneOrMore, pickedEmployeeData, setPickedEmployeeData, methodToUse, id}) => {
    let skillList = []
    employee.skills.forEach((s) => {
        skillList.push(<div>{s.skill_name}</div>)
    })

    function pickedEmployeesAction(e, employee){
        // here i will add or remove employees/leader from list

        if(pickOneOrMore){
            if(methodToUse === 'leader'){
                setPickedEmployeeData({employee_id: employee.employee_id, first_name: employee.first_name, last_name: employee.last_name})
            }
            if(methodToUse === 'employee' || methodToUse === 'grade'){
                setPickedEmployeeData({employee_id: employee.employee_id, first_name: employee.first_name, last_name: employee.last_name, skills: employee.skills})
            }
        }
        else {
            let pickedEmployeeDataCopy = pickedEmployeeData
            // if picked true then adding to list
            if(e){
                pickedEmployeeDataCopy.push(
                    {employee_id: employee.employee_id, first_name: employee.first_name, last_name: employee.last_name, skills: employee.skills}
                )
                setPickedEmployeeData(pickedEmployeeDataCopy)
            }else{
                // if unpicked then delete from list
                let newListOfPickedEmployee = []
                pickedEmployeeDataCopy.forEach((e) => {
                    if(employee.employee_id !== e.employee_id){
                        newListOfPickedEmployee.push({employee_id: e.employee_id, first_name: employee.first_name, last_name: employee.last_name,
                            skills: e.skills}
                        )
                    }
                })
                setPickedEmployeeData(newListOfPickedEmployee)
            }
        }
    }

    return <div id={id} row={id}
                className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth bg-brown-menu border-2 border-workday hover:cursor-default hover:bg-opacity-80 rounded-md hover:border-b-workday hover:border-2"}>
                <div className={"grow-0 flex flex-row items-center justify-end gap-2"}>
                    {pickOneOrMore ?
                        <input id={id + "-check"} type={"radio"} name={"shetty-group"} className={"w-5 h-5 hover:cursor-pointer"}
                               onChange={(e) => pickedEmployeesAction(e.target.checked, employee)}/>
                        :
                        <input id={id + "-check"} type={"checkbox"} className={"w-5 h-5 hover:cursor-pointer"}
                               onChange={(e) => pickedEmployeesAction(e.target.checked, employee)}/>
                    }
                </div>
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
            </div>
}

export default EmployeePickerListItem;