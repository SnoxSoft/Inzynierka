import React, {useEffect, useRef, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";
import FirstnameAndLastname from "../components/employees/search/fields/FirstnameAndLastname";
import TeamsList from "../components/employees/search/fields/TeamsList";
import PositionsList from "../components/employees/search/fields/PositionsList";
import ReusableButton from "../components/base/ReusableButton";
import {Link} from "react-router-dom";
import Password from "../components/employee/fields/Password";
import {FiSettings} from "react-icons/fi";
import LoggingEmail from "../components/logging/LoggingEmail";
import LoggingPassword from "../components/logging/LoggingPassword";
import Email from "../components/employee/fields/Email";
import {serverIp} from "../GlobalAppConfig";

function Logging(){
    if(sessionStorage.getItem('USER') == null){
        document.title = "PIRSOFT: Okno logowania";
    }
    else {
        document.title = "PIRSOFT: Ekran powitalny";
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        FunctionForResize("home-logging-in", {setWantedHeightForList});
        FunctionForResize("home-logged-in", {setWantedHeightForList});
    }, []);

    const logIn = () => {
        if (sessionStorage.getItem('USER') === null) {
            fetch(serverIp+"/getEmployee/"+email+"/"+password)
                .then((response) => {response.json()
                    .then((response) => {
                        sessionStorage.setItem('USER', response[0].id)
                        sessionStorage.setItem('FIRSTNAME', response[0].firstname)
                        sessionStorage.setItem('LASTNAME', response[0].lastname)
                        sessionStorage.setItem('AVATAR', response[0].avatar)
                        sessionStorage.setItem('START', response[0].start)

                        window.location.reload(false);
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                    sessionStorage.setItem('USER', null)
                    sessionStorage.setItem('FIRSTNAME', null)
                    sessionStorage.setItem('LASTNAME', null)
                    sessionStorage.setItem('AVATAR', null)
                    sessionStorage.setItem('START', null)

                })
        }
    }

    return <>
        {sessionStorage.getItem('USER') === null ?
        <div id={"home-logging-in"}
             className={"every-page-on-scroll"}
             style={{ height: wantedHeightsForList } }>
            <div className={"flex flex-col text-workday m-4 text-center gap-4"}>
                <div>
                    <p>WITAJ</p>
                    <p>ZALOGUJ SIĘ</p>
                </div>
                <br></br>

                <div className={"flex flex-col gap-4"}>
                    <label>EMAIL</label>
                    <LoggingEmail value={email} onChange={setEmail}/>
                </div>
                <br></br>
                <div className={"flex flex-col gap-4"}>
                    <label>HASŁO</label>
                    <div className={"flex flex-col gap-4 self-center"}>
                        <LoggingPassword value={password} onChange={setPassword}/>
                    </div>
                </div>
                <div>
                    <Link to={"/remind"} className={"text-weekend"}>Nie pamiętasz hasła?</Link>
                </div>
                <br/>
                <div className={"self-center"}>
                    <ReusableButton value={"ZALOGUJ"} onClick={() => logIn()}/>
                </div>
            </div>
        </div> :
            <div id={"home-logged-in"}
                 className={"every-page-on-scroll"}
                 style={{ height: wantedHeightsForList } }>
                <div className={"flex flex-col text-workday m-4 text-center gap-4"}>
                    <div>
                        <p>{'WITAJ, '+
                            sessionStorage.getItem('FIRSTNAME')+' '+
                            sessionStorage.getItem('LASTNAME')}</p>
                    </div>
                </div>
            </div>
        }
    </>
}

export default Logging;