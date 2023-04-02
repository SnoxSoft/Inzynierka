import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";

const EmployeePickerListItem = ({employee, pickOneOrMore, pickedEmployeeData, setPickedEmployeeData, methodToUse}) => {
    let skillList = []
    employee.skills.forEach((s) => {
        skillList.push(<div>{s}</div>)
    })

    function pickedEmployeesAction(e, employee){
        // here i will add or remove employees/leader from list

        if(pickOneOrMore){
            if(methodToUse === 'leader'){
                setPickedEmployeeData({id: employee.id, firstandlastname: employee.firstname + ' ' + employee.lastname})
            }
            if(methodToUse === 'employee' || methodToUse === 'grade'){
                setPickedEmployeeData({id: employee.id, firstandlastname: employee.firstname + ' ' + employee.lastname, skills: employee.skills})
            }
        }
        else {
            let pickedEmployeeDataCopy = pickedEmployeeData
            // if picked true then adding to list
            if(e){
                pickedEmployeeDataCopy.push(
                    {id: employee.id, firstandlastname: employee.firstname + ' ' + employee.lastname, skills: employee.skills}
                )
                setPickedEmployeeData(pickedEmployeeDataCopy)
            }else{
                // if unpicked then delete from list
                let newListOfPickedEmployee = []
                pickedEmployeeDataCopy.forEach((e) => {
                    if(employee.id !== e.id){
                        newListOfPickedEmployee.push({id: e.id, firstandlastname: e.firstandlastname,
                            skills: e.skills}
                        )
                    }
                })

                setPickedEmployeeData(newListOfPickedEmployee)
            }
        }
    }

    return <div row={employee.firstname+"-"+employee.id}
                className={"flex flex-row m-2 p-2 gap-2 hover:bg-dayoffmonth bg-brown-menu border-2 border-workday hover:cursor-pointer hover:bg-opacity-80 rounded-md hover:border-b-workday hover:border-2"}>
                <div className={"grow-0 flex flex-row items-center justify-end gap-2"}>
                    {pickOneOrMore ?
                        <input type={"radio"} name={"shetty-group"} className={"w-5 h-5"}
                               onChange={(e) => pickedEmployeesAction(e.target.checked, employee)}/>
                        :
                    <input type={"checkbox"} className={"w-5 h-5"}
                           onChange={(e) => pickedEmployeesAction(e.target.checked, employee)}/>
                    }
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