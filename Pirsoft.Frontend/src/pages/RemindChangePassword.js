import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {useNavigate, useParams} from "react-router-dom";
import LoggingPassword from "../components/logging/LoggingPassword";
import {
    alertNewPasswordsAreIncompatible, alertPasswordChanged, alertPasswordIsIncompatible,
    alertPutNewPasswords,
    alertUnexpectedError,
    labelApprove, labelBack, labelChangePassword, labelCode,
    labelGiveNewPassword,
    labelGiveNewPasswordAgain, labelRemindPassword,
    pagePasswordChange, passwordRegex
} from "../GlobalAppConfig";
import {fetchGetChangePasswordData, fetchPutChangePassword} from "../DataFetcher";
import {MdOutlineArrowBackIosNew} from "react-icons/md";

function Remind(){
    document.title = pagePasswordChange;

    const navigate = useNavigate()

    // const [employee, setEmployee] = useState([])
    // const [employeeId, setEmployeeId] = useState(null);
    // const [employeeName, setEmployeeName] = useState('');

    useEffect(() => {
        // fetchGetChangePasswordData(navigate, "")
        //     .then(employeeItem => {
        //         if(employee.length === 0){
        //             setEmployee(employeeItem)
        //         }
        //     })
    })

    // useEffect(() => {
    //     if(employee.length !== 0 && employeeId === null){
    //         let employeeItem = employee.pop()
    //         setEmployeeId(employeeItem.employee_id)
    //         setEmployeeName(employeeItem.first_name + " " + employeeItem.last_name)
    //     }
    // }, [employee])

    const [code, setCode] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newRepeatPassword, setNewRepeatPassword] = useState();

    const [passwordChangedSuccesfully, setPasswordChangedSuccesfully] = useState(false)
    const [problemOccured, setProblemOccured] = useState(false)
    const [wrongPasswords, setWrongPassword] = useState(false)
    const [notTheSame, setNotTheSame] = useState(false)
    const [passwordDoNotMatch, setPasswordDoNotMatch] = useState(false)

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        FunctionForResize("password-reminder-page", {setWantedHeightForList});
    }, []);

    const changePassword = () => {
        // if(employeeId === null){
        //     setProblemOccured(true);
        //     setTimeout(() => {setProblemOccured(false)}, 3000);
        // }
        // else
            if (newPassword !== undefined && newRepeatPassword !== undefined && code !== undefined &&
            newPassword.toString().length > 0 && newRepeatPassword.toString().length > 0 && code.toString() > 0) {
            if(newPassword.toString() === newRepeatPassword.toString()){
                if(passwordRegex.test(newPassword)) {
                    const query = new URLSearchParams();
                    query.set("code", code);
                    query.set("passwordFirst", newPassword);
                    query.set("passwordSecond", newRepeatPassword);
                    fetchPutChangePassword(query)
                        .then((response) => {
                            if (response.status === 200) {
                                setPasswordChangedSuccesfully(true);
                                setTimeout(() => {
                                    setPasswordChangedSuccesfully(false)
                                }, 3000);
                                setTimeout(function () {
                                    navigate("/")
                                }, 5000);
                            } else {
                                setProblemOccured(true);
                                setTimeout(() => {
                                    setProblemOccured(false)
                                }, 3000);
                            }
                        })
                        .catch((err) => {
                            setProblemOccured(true);
                            setTimeout(() => {
                                setProblemOccured(false)
                            }, 3000);
                        })
                }
                else{
                    setPasswordDoNotMatch(true);
                    setTimeout(() => {setPasswordDoNotMatch(false)}, 3000);
                }
            }else {
                setNotTheSame(true);
                setTimeout(() => {setNotTheSame(false)}, 3000);
            }
        }
        else {
            setWrongPassword(true);
            setTimeout(() => {setWrongPassword(false)}, 3000);
        }
    }

    return  <div id={"password-reminder-page"}
                 className={"every-page-on-scroll hover:cursor-default"}
                 style={{ height: wantedHeightsForList } }>
                <div className={"flex flex-col text-workday m-4 text-center gap-4"}>
                    <div>
                        <div className={"grow-0 p-4 flex flex-row justify-start"}>
                            <button id={"remind-back"}
                                    onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />
                                {labelBack}
                            </button>
                        </div>
                        <p>{labelChangePassword}</p>
                        {/*<p>{employeeName}</p>*/}
                    </div>
                    <br/><br/>
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelCode}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <input id={"code-new-password"}
                                   className={"border text-black rounded-md text-center h-6 w-72 self-center"}
                                   type={"text"}
                                   onChange={(e) => setCode(e.target.value)} value={code}></input>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveNewPassword}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <LoggingPassword
                                id={"remind-new-password"}
                                value={newPassword} onChange={setNewPassword} showHide={true}/>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveNewPasswordAgain}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <LoggingPassword
                                id={"remind-repeat-password"}
                                value={newRepeatPassword} onChange={setNewRepeatPassword} showHide={true}/>
                        </div>
                    </div>
                    <br/>
                    <div className={"bg-blue-menu self-center"}>
                        <ReusableButton id={"remind-change-password-approve"}
                            value={labelApprove} onClick={() => changePassword()}/>
                    </div>
                </div>
                <div className={"flex flex-col items-center text-workday"}>
                    {passwordChangedSuccesfully ?
                        <p className={"bg-green-700 rounded-md font-bold whitespace-pre-wrap text-center"}>
                            {alertPasswordChanged}
                        </p> : <></> }
                    {problemOccured ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertUnexpectedError}
                        </p> : <></> }
                    {wrongPasswords ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertPutNewPasswords}
                        </p> : <></> }
                    {notTheSame ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertNewPasswordsAreIncompatible}
                        </p> : <></> }
                    {passwordDoNotMatch ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertPasswordIsIncompatible}
                        </p> : <></> }
                </div>
            </div>
}

export default Remind;