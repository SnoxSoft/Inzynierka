import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {useNavigate} from "react-router-dom";
import LoggingPassword from "../components/logging/LoggingPassword";
import RemindEmail from "../components/base/remind/RemindEmail";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import RemindCode from "../components/base/remind/RemindCode";
import {
    alertMessageSent,
    alertNewPasswordsAreIncompatible,
    alertPutNewPasswords,
    alertUnexpectedError,
    alertVerficationCodeIsIncompatible,
    alertWrongEmail,
    labelApprove, labelBack,
    labelGiveEmail,
    labelGiveNewPassword,
    labelGiveNewPasswordAgain,
    labelRemindPassword,
    labelSendVerificationEmail,
    labelVerificationCode, pageNameRemind,
    serverIp
} from "../GlobalAppConfig";
import {endpointGetVerifyCode, endpointPostChangePassword, endpointPostSendVerifyCode} from "../EndpointAppConfig";

function Remind(){
    document.title = pageNameRemind;

    const navigate = useNavigate()

    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newRepeatPassword, setNewRepeatPassword] = useState();

    const [codeNotVerified, setCodeNotVerified] = useState(true)

    const [mailSentAlert, setMailSentAlert] = useState(false)
    const [badCodeAlert, setBadCodeAlert] = useState(false)
    const [badEmailAlert, setBadEmailAlert] = useState(false)
    const [problemOccured, setProblemOccured] = useState(false)
    const [wrongPasswords, setWrongPassword] = useState(false)
    const [notTheSame, setNotTheSame] = useState(false)

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        FunctionForResize("password-reminder", {setWantedHeightForList});
    }, []);

    const verifyCode = () => {
        if (email !== undefined && email.toString().length > 0 && email.toString().includes('@')) {
            if (code !== undefined && code.toString().length > 0) {
                fetch( + "/" + endpointGetVerifyCode + "/" + email + "/" + code)
                    .then((response) => {
                        if(response.status === 200){
                            setCodeNotVerified(false)
                        }
                        else{
                            setBadCodeAlert(true);
                            setTimeout(() => {setBadCodeAlert(false)}, 3000);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            }
            else {
                setBadCodeAlert(true);
                setTimeout(() => {setBadCodeAlert(false)}, 3000);
            }
        }
        else {
            setBadEmailAlert(true);
            setTimeout(() => {setBadEmailAlert(false)}, 3000);
        }
    }

    const changePassword = () => {
        if (newPassword !== undefined && newRepeatPassword !== undefined &&
            newPassword.toString().length > 0 && newRepeatPassword.toString().length > 0) {

            // Tutaj do pomyślenia jakie wartosci sprawdzic

            if(newPassword.toString() === newRepeatPassword.toString()){
                fetch(serverIp + "/" + endpointPostChangePassword + "/" + email + "/" + newPassword, {method: 'POST'})
                    .then((response) => {
                        console.log(response.status)
                        if(response.status === 200){
                            navigate("/")
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

    const sendVerifyEmail = () => {
        if (email !== undefined && email.toString().length > 0 && email.toString().includes('@')) {
            fetch(serverIp + "/" + endpointPostSendVerifyCode + "/" + email, {
                method: 'POST'
            })
                .then((response) => {
                    if(response.status === 200){
                        setMailSentAlert(true);
                        setTimeout(() => {setMailSentAlert(false)}, 3000);
                    }
                    else{
                        setProblemOccured(true);
                        setTimeout(() => {setProblemOccured(false)}, 3000);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }
        else {
            setBadEmailAlert(true);
            setTimeout(() => {setBadEmailAlert(false)}, 3000);
        }
    }

    return <div id={"password-reminder"}
             className={"every-page-on-scroll"}
             style={{ height: wantedHeightsForList } }>
            <div className={"flex flex-col text-workday m-4 text-center gap-4"}>

                <div>
                    <div className={"grow-0 p-4 flex flex-row justify-start"}>
                        <button onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />{labelBack}</button>
                    </div>
                    <p>{labelRemindPassword}</p>
                </div>
                <br/><br/>

                <div className={"flex flex-col gap-4"}>
                    <label>{labelGiveEmail}</label>
                    <RemindEmail value={email} onChange={setEmail} disableChange={!codeNotVerified}/>
                </div>
                <br/>
                {codeNotVerified ?
                    <div className={"flex flex-col gap-4"}>
                        <label>{labelVerificationCode}</label>
                        <RemindCode value={code} onChange={setCode}/>
                    </div>
                        :
                    <>
                        <div className={"flex flex-col gap-4"}>
                            <label>{labelGiveNewPassword}</label>
                            <div className={"flex flex-col gap-4 self-center"}>
                                <LoggingPassword value={newPassword} onChange={setNewPassword} showHide={false}/>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <label>{labelGiveNewPasswordAgain}</label>
                            <div className={"flex flex-col gap-4 self-center"}>
                                <LoggingPassword value={newRepeatPassword} onChange={setNewRepeatPassword} showHide={false}/>
                            </div>
                        </div>
                    </>
                }

                <br/>
                {codeNotVerified ?
                    <>
                        <div className={"self-center"}>
                            <ReusableButton value={labelSendVerificationEmail} onClick={() => sendVerifyEmail()}/>
                        </div>
                        <br/>
                        <div className={"bg-blue-menu self-center"}>
                            <ReusableButton value={labelApprove} onClick={() => verifyCode()}/>
                        </div>
                    </>
                    :
                    <div className={"bg-blue-menu self-center"}>
                        <ReusableButton value={labelApprove} onClick={() => changePassword()}/>
                    </div>
                }

            </div>
            <div className={"flex flex-col items-center text-workday"}>
                {mailSentAlert ? <p className={"bg-green-700 rounded-md font-bold"}>{alertMessageSent}</p> : <></> }
                {badCodeAlert ? <p className={"bg-red-700 rounded-md font-bold"}>{alertVerficationCodeIsIncompatible}</p> : <></> }
                {badEmailAlert ? <p className={"bg-red-700 rounded-md font-bold"}>{alertWrongEmail}</p> : <></> }
                {problemOccured ? <p className={"bg-red-700 rounded-md font-bold"}>{alertUnexpectedError}</p> : <></> }
                {wrongPasswords ? <p className={"bg-red-700 rounded-md font-bold"}>{alertPutNewPasswords}</p> : <></> }
                {notTheSame ? <p className={"bg-red-700 rounded-md font-bold"}>{alertNewPasswordsAreIncompatible}</p> : <></> }
            </div>
        </div>
}

export default Remind;