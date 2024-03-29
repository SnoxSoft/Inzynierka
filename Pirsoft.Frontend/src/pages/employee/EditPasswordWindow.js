import {
    alertNewPasswordsAreIncompatible,
    alertOldPasswordIsMissing, alertPasswordChanged, alertPasswordIsIncompatible, alertPasswordIsWrong,
    alertPutNewPasswords, alertUnexpectedError,
    headerPasswordChange, labelApprove, labelClose,
    labelGiveNewPassword,
    labelGiveNewPasswordAgain,
    labelGiveOldPassword, pagePasswordEdit, passwordRegex, serverIp
} from "../../GlobalAppConfig";
import LoggingPassword from "../../components/logging/LoggingPassword";
import ReusableButton from "../../components/base/ReusableButton";
import React, {useState} from "react";
import {fetchPutEditOldPasswordInProfile} from "../../DataFetcher";
import {useNavigate} from "react-router-dom";

function EditPasswordWindow({setShowPasswordChangeFrame,
                                setEmployeeDataShow, employee}) {
    document.title = pagePasswordEdit;

    const navigate = useNavigate();

    // Poniżej znajdą się wszystkie dane i funkcje dla okienka zmiany hasła w danych pracownika
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newRepeatPassword, setNewRepeatPassword] = useState();

    const [passwordChangedSuccesfully, setPasswordChangedSuccesfully] = useState(false)
    const [problemOccured, setProblemOccured] = useState(false)
    const [passwordIncorrect, setPasswordIncorrect] = useState(false)
    const [passwordWrong, setPasswordWrong] = useState(false)
    const [missingOldPassword, setMissingOldPassword] = useState(false)
    const [wrongNewPassword, setWrongNewPassword] = useState(false)
    const [notTheSame, setNotTheSame] = useState(false)

    const changePassword = () => {
        if(oldPassword !== undefined && oldPassword.toString().length > 0) {
            if (newPassword !== undefined && newRepeatPassword !== undefined &&
                newPassword.toString().length > 0 && newRepeatPassword.toString().length > 0) {

                // Tutaj pomyslimy jakie wartosci sprawdzic
                if (newPassword.toString() === newRepeatPassword.toString()) {

                    if (passwordRegex.test(newPassword)) {
                        const query = new URLSearchParams();
                        query.set("oldPassword", oldPassword);
                        query.set("newPasswordOnce", newPassword);
                        query.set("newPasswordTwice", newRepeatPassword);
                        query.set("employeeId", employee.employee_id);

                    fetchPutEditOldPasswordInProfile(navigate, query)
                        .then((response) => {
                            if (response.status === 200) {
                                setPasswordChangedSuccesfully(true);
                                setTimeout(() => {
                                    setPasswordChangedSuccesfully(false)
                                    setOldPassword('')
                                    setNewPassword('')
                                    setNewRepeatPassword('')

                                    setEmployeeDataShow(true);
                                    setShowPasswordChangeFrame(false)
                                }, 3000);
                            } else {
                                setProblemOccured(true);
                                setTimeout(() => {
                                    setProblemOccured(false)
                                }, 3000);
                            }
                        })
                        .catch((err) => {
                            setPasswordWrong(true);
                            setTimeout(() => {
                                setPasswordWrong(false)
                            }, 3000);
                        })
                    } else {
                        setPasswordIncorrect(true);
                        setTimeout(() => {
                            setPasswordIncorrect(false)
                        }, 3000);
                    }
                } else {
                    setNotTheSame(true);
                    setTimeout(() => {
                        setNotTheSame(false)
                    }, 3000);
                }
            } else {
                setWrongNewPassword(true);
                setTimeout(() => {
                    setWrongNewPassword(false)
                }, 3000);
            }
        }
        else {
            setMissingOldPassword(true);
            setTimeout(() => {
                setMissingOldPassword(false)
            }, 3000);
        }
    }

    return <div id={"password"}
                 className={"every-page-on-scroll bg-blue-menu hover:cursor-default"}
                 style={{minWidth: 800}}>
                <div className={"flex flex-col text-workday m-4 text-center gap-4"}>

                    <div>
                        <p>{headerPasswordChange}</p>
                    </div>
                    <br/><br/>

                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveOldPassword}</label>
                        <LoggingPassword id={"employee-password-change-old-password"}
                                         value={oldPassword} onChange={setOldPassword} showHide={false}/>
                    </div>
                    <br/>

                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveNewPassword}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <LoggingPassword id={"employee-password-change-new-password"}
                                             value={newPassword} onChange={setNewPassword} showHide={true}/>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelGiveNewPasswordAgain}</label>
                        <div className={"flex flex-col gap-4 self-center"}>
                            <LoggingPassword id={"employee-password-change-repeat-password"}
                                             value={newRepeatPassword} onChange={setNewRepeatPassword} showHide={false}/>
                        </div>
                    </div>

                    <br/><br/>

                    <div className={"flex flex-row justify-evenly"}>
                        <div className={"self-center"}>
                            <ReusableButton
                                id={"employee-change-password-close"}
                                value={labelClose}
                                onClick={() => {
                                    setOldPassword('');
                                    setNewPassword('');
                                    setNewRepeatPassword('');
                                    setEmployeeDataShow(true);
                                    setShowPasswordChangeFrame(false)}}/>
                        </div>
                        <div className={"bg-blue-menu self-center"}>
                            <ReusableButton id={"employee-change-password-approve"} value={labelApprove}
                                            onClick={() => changePassword()}/>
                        </div>
                    </div>

                </div>
                <div className={"flex flex-col items-center text-workday"}>
                    {passwordChangedSuccesfully ?
                        <p className={"bg-green-700 rounded-md font-bold whitespace-pre-wrap text-center"}>
                            {alertPasswordChanged}
                        </p> : <></>}
                    {wrongNewPassword ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertPutNewPasswords}
                        </p> : <></>}
                    {missingOldPassword ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertOldPasswordIsMissing}
                        </p> : <></>}
                    {notTheSame ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertNewPasswordsAreIncompatible}
                        </p> : <></>}
                    {problemOccured ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertUnexpectedError}
                        </p> : <></> }
                    {passwordIncorrect ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertPasswordIsIncompatible}
                        </p> : <></> }
                    {passwordWrong ?
                        <p className={"bg-red-700 rounded-md font-bold"}>
                            {alertPasswordIsWrong}
                        </p> : <></> }
                </div>
            </div>
}
export default EditPasswordWindow;