import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {useNavigate} from "react-router-dom";
import RemindEmail from "../components/base/remind/RemindEmail";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import {
    alertMessageSent,
    alertUnexpectedError,
    alertWrongEmail, emailRegex,
    labelBack,
    labelGiveEmail, labelReceivedACode,
    labelRemindPassword,
    labelSendVerificationEmail,
    pageNameRemind
} from "../GlobalAppConfig";
import {fetchPostSendEmailForPasswordChange} from "../DataFetcher";

function RemindSendMail(){
    document.title = pageNameRemind;

    const navigate = useNavigate()

    const [email, setEmail] = useState();

    const [mailSentAlert, setMailSentAlert] = useState(false)
    const [badEmailAlert, setBadEmailAlert] = useState(false)
    const [problemOccured, setProblemOccured] = useState(false)

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    useEffect(() => {
        FunctionForResize("password-reminder-page", {setWantedHeightForList});
    }, []);

    const sendVerifyEmail = () => {
        if (email !== undefined && email.toString().length > 0 && email.toString().includes('@') &&
            emailRegex.test(email)) {

            const emailQuery = new URLSearchParams();
            emailQuery.set("email", email);

            fetchPostSendEmailForPasswordChange(emailQuery).then((response) => {
                if(response.status === 200){
                    setMailSentAlert(true);
                    setTimeout(() => {setMailSentAlert(false)}, 3000);
                }
                else{
                    setProblemOccured(true);
                    setTimeout(() => {setProblemOccured(false)}, 3000);
                }
            }).catch((err) => {
                console.log(err.message);
                setProblemOccured(true);
                setTimeout(() => {setProblemOccured(false)}, 3000);
            })
        }
        else {
            setBadEmailAlert(true);
            setTimeout(() => {setBadEmailAlert(false)}, 3000);
        }
    }

    return <div id={"password-reminder-page"}
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
                    <p>{labelRemindPassword}</p>
                </div>
                <br/><br/>

                <div className={"flex flex-col gap-4"}>
                    <label>{labelGiveEmail}</label>
                    <RemindEmail value={email} onChange={setEmail}/>
                </div>
                <br/>
                    <div className={"self-center gap-2 flex flex-col"}>
                        <ReusableButton id={"remind-send-verification-email"}
                            formatting={"border-2 border-b-workday min-w-min h-12"}
                            value={labelSendVerificationEmail}
                            onClick={() => sendVerifyEmail()}/>
                        <ReusableButton id={"remind-send-verification-email"}
                                        value={labelReceivedACode}
                                        formatting={"self-center h-8 border-2 w-32"}
                                        link={'/change-password'}/>
                    </div>
            </div>
            <div className={"flex flex-col items-center text-workday"}>
                {mailSentAlert ? <p className={"bg-green-700 rounded-md font-bold"}>{alertMessageSent}</p> : <></> }
                {badEmailAlert ? <p className={"bg-red-700 rounded-md font-bold"}>{alertWrongEmail}</p> : <></> }
                {problemOccured ? <p className={"bg-red-700 rounded-md font-bold"}>{alertUnexpectedError}</p> : <></> }
            </div>
        </div>
}

export default RemindSendMail;