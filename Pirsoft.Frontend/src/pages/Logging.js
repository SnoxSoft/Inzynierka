import React, {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import ReusableButton from "../components/base/ReusableButton";
import {Link, useNavigate} from "react-router-dom";
import LoggingEmail from "../components/logging/LoggingEmail";
import LoggingPassword from "../components/logging/LoggingPassword";
import {
    labelEmail,
    labelLogIn,
    labelPassword, pageNameHomePage,
    pageNameLogging,
    serverIp,
    welcomeMessage,
    welcomeMessageShort
} from "../GlobalAppConfig";
import {endpointGetLogIn} from "../EndpointAppConfig";
import {fetchLoginEmployee} from "../DataFetcher";
import {getLocalStorageKeyWithExpiry, setLocalStorageKeyWithExpiryKey} from "../components/jwt/LocalStorage";
import {parseJWT} from "../components/jwt/JwtParser";

function Logging(){
    if(getLocalStorageKeyWithExpiry("loggedEmployee") == null){
        document.title = pageNameLogging;
    }
    else {
        document.title = pageNameHomePage;
    }
    const navigate = useNavigate();

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        FunctionForResize("home-logging-in", {setWantedHeightForList});
        FunctionForResize("home-logged-in", {setWantedHeightForList});
    }, []);

    const logIn = () => {
        if (getLocalStorageKeyWithExpiry("loggedEmployee") === null)
        {
            fetchLoginEmployee(navigate, email, password)
                .then(employee => {
                    switch (employee.statusCode)
                    {
                        case 0:
                            const employeeTokenParsed = parseJWT(employee.token);
                            setLocalStorageKeyWithExpiryKey("loggedEmployee", employeeTokenParsed);
                            window.location.reload();
                            break;
                        case 1:
                        case 2:
                            document.getElementById("login-error-message").innerText = "Niepoprawne hasło!";
                            break;
                        case 3:
                            document.getElementById("login-error-message").innerText = "Konto nie istnieje!";
                            break;
                        case 4:
                            document.getElementById("login-error-message").innerText = "Błędny adres email!";
                            break;
                        default:
                            break;
                    }
                })
        }
    }

    return <>
        {getLocalStorageKeyWithExpiry("loggedEmployee") === null ?
        <div id={"home-logging-in"}
             className={"every-page-on-scroll hover:cursor-default"}
             style={{ height: wantedHeightsForList } }>
            <div className={"flex flex-col text-workday m-4 text-center gap-4"}>
                <div>
                    <p>{welcomeMessage}</p>
                </div>
                <div id={"login-error-message"} className={"text-red-600 font-bold"}></div>
                <br></br>

                <div className={"flex flex-col gap-4"}>
                    <label>{labelEmail}</label>
                    <LoggingEmail value={email} onChange={setEmail}/>
                </div>
                <br></br>
                <div className={"flex flex-col gap-4"}>
                    <label>{labelPassword}</label>
                    <div className={"flex flex-col gap-4 self-center"}>
                        <LoggingPassword value={password} onChange={setPassword}/>
                    </div>
                </div>
                <div>
                    <Link id={"logging-remind-password"} to={"/remind"} className={"text-weekend"}>Nie pamiętasz hasła?</Link>
                </div>
                <br/>
                <div className={"self-center"}>
                    <ReusableButton id={"logging-log-in"} value={labelLogIn} onClick={() => logIn()}/>
                </div>
            </div>
        </div> :
            <div id={"home-logged-in"}
                 className={"every-page-on-scroll hover:cursor-default"}
                 style={{ height: wantedHeightsForList } }>
                <div className={"flex flex-col text-workday m-4 text-center gap-4"}>
                    <div>
                        <p>{welcomeMessageShort+
                            getLocalStorageKeyWithExpiry("loggedEmployee").FirstName+' '+
                            getLocalStorageKeyWithExpiry("loggedEmployee").LastName
                        }</p>
                    </div>
                </div>
            </div>
        }
    </>
}

export default Logging;