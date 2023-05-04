import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {useNavigate, useParams} from "react-router-dom";
import LoggingPassword from "../components/logging/LoggingPassword";
import {
    alertNewPasswordsAreIncompatible, alertPasswordChanged,
    alertPutNewPasswords,
    alertUnexpectedError,
    labelApprove, labelBack, labelChangePassword,
    labelGiveNewPassword,
    labelGiveNewPasswordAgain,
    pagePasswordChange,
    serverIp
} from "../GlobalAppConfig";
import {endpointPostChangePassword} from "../EndpointAppConfig";
import {fetchGetChangePasswordData} from "../DataFetcher";

function Remind(){
    document.title = pagePasswordChange;

    const navigate = useNavigate()
    const {code} = useParams();

    const [employeeId, setEmployeeId] = useState(null);
    const [employeeName, setEmployeeName] = useState('');

    useEffect(() => {
        fetchGetChangePasswordData(navigate, code)
            .then(response => {
                setEmployeeId(response.employee_id)
                setEmployeeName(response.first_name + " " + response.last_name)
            })
    })

    const [newPassword, setNewPassword] = useState();
    const [newRepeatPassword, setNewRepeatPassword] = useState();

    const [passwordChangedSuccesfully, setPasswordChangedSuccesfully] = useState(false)
    const [problemOccured, setProblemOccured] = useState(false)
    const [wrongPasswords, setWrongPassword] = useState(false)
    const [notTheSame, setNotTheSame] = useState(false)

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        FunctionForResize("password-reminder-page", {setWantedHeightForList});
    }, []);

    const changePassword = () => {
        if(employeeId === null){
            setProblemOccured(true);
            setTimeout(() => {setProblemOccured(false)}, 3000);
        }
        else if (newPassword !== undefined && newRepeatPassword !== undefined &&
            newPassword.toString().length > 0 && newRepeatPassword.toString().length > 0) {

            // Tutaj do pomyślenia jakie wartosci sprawdzic
            if(newPassword.toString() === newRepeatPassword.toString()){
                fetch(serverIp + "/" + endpointPostChangePassword,
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            employee_id: employeeId,
                            new_employee_password: newPassword,
                            repeat_new_employee_password: newRepeatPassword})
                    })
                    .then((response) => {
                        if(response.status === 200){
                            setPasswordChangedSuccesfully(true);
                            setTimeout(() => {setPasswordChangedSuccesfully(false)}, 3000);
                            setTimeout(function() {
                                navigate("/")
                            }, 5000);
                        }
                        else{
                            setProblemOccured(true);
                            setTimeout(() => {setProblemOccured(false)}, 3000);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);

                    })
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
                        <p>{labelChangePassword}</p>
                        <p>{employeeName}</p>
                    </div>
                    <br/><br/>
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveNewPassword}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <LoggingPassword
                                id={"remind-new-password"}
                                value={newPassword} onChange={setNewPassword} showHide={false}/>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveNewPasswordAgain}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <LoggingPassword
                                id={"remind-repeat-password"}
                                value={newRepeatPassword} onChange={setNewRepeatPassword} showHide={false}/>
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
                </div>
            </div>
}

export default Remind;