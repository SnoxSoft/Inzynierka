import {BiHide, BiShow} from "react-icons/bi";
import {useState} from "react";

const LoggingPassword = ({onChange, value, showHide = true}) => {

    console.log(showHide)

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<BiHide/>);
    function changeVisibilityForPassword() {
        const x = document.getElementById("logging-password");
        if (x.type === "password") {
            x.type = "text";
            setChangeVisibilityIcon(<BiShow />);
        } else {
            x.type = "password";
            setChangeVisibilityIcon(<BiHide />);
        }
    }

    return <>
            <input id={"logging-password"}
                   className={"border text-black rounded-md text-center h-6 w-72 self-center"}
                   type={"password"}
                  onChange={(e) => onChange(e.target.value)} value={value}></input>
            {showHide ?
                <button className={"flex self-center"} onClick={changeVisibilityForPassword}>{changeVisibilityIcon}</button> :
                <></>
            }
        </>
}

export default LoggingPassword;