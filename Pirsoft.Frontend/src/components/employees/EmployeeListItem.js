import React, {useState} from "react";
import ReusableButton from "../base/ReusableButton";
import {labelRequest, labelShowProfile} from "../../GlobalAppConfig";
import {BsPersonCircle} from "react-icons/bs";

const EmployeeListItem = ({employee, action, showRequest, id, teams, positions, positionLevels}) => {
    const[showHideButtons, setShowHideButtons] = useState(false);

    const showOptions = () => {
        setShowHideButtons(true);

    }
    const hideOptions = () => {
        setShowHideButtons(false);
    }

    function translateDepartmentName(department_id){
        let returnDepartment = department_id
        teams.map(team => {
            if(team.department_id.toString().trim() === department_id.toString().trim())
                returnDepartment = team.department_name
        })
        return returnDepartment
    }

    function translatePositionName(position_id){
        let returnPosition = position_id
        positions.map(position => {
            if(position.role_id.toString().trim() === position_id.toString().trim() )
                returnPosition = position.role_name
        })

        return returnPosition
    }

    function translatePositionLevelName(position_level_id){
        let returnPositionLevel = position_level_id
        positionLevels.map(positionLevel => {
            if(positionLevel.seniority_level_id.toString().trim() === position_level_id.toString().trim() )
                returnPositionLevel = positionLevel.seniority_level_name
        })

        return returnPositionLevel
    }

    return <div id={id} className={"rounded-md grid grid-cols-6 m-2 h-16 hover:cursor-default hover:bg-opacity-80  hover:bg-brown-menu hover:border-b-workday hover:border-2"}
            onMouseOver={showOptions} onMouseLeave={hideOptions}>
                <div className={"place-self-center"}>
                    {/*{employee.avatar ?*/}
                    {/*    <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"w-12 rounded-2xl"}/>*/}
                    {/*    : <BsPersonCircle />*/}
                    {/*}*/}
                    <BsPersonCircle fontSize={50}/>
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {employee.first_name} {employee.last_name}
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {translateDepartmentName(employee.employee_department_id)}
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {translatePositionLevelName(employee.employee_seniority_level_id)}
                </div>
                <div className={"flex flex-row place-self-center"}>
                    {translatePositionName(employee.employee_company_role_id)}
                </div>
                <div className={"grow flex flex-row place-self-center gap-2"}>
                    {showHideButtons && (
                        <>
                            <ReusableButton id={id + "-request"} value={labelRequest} onClick={() => {
                                action(employee)
                                showRequest(true)
                            }}></ReusableButton>
                            <ReusableButton id={id + "-profile"} value={labelShowProfile} link={`/employee/${employee.employee_id}`}></ReusableButton>
                        </>
                    )
                    }
                </div>
            </div>
}

export default EmployeeListItem;