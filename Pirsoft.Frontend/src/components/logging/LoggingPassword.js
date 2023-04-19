import {BiHide, BiShow} from "react-icons/bi";
import {useState} from "react";

const LoggingPassword = ({onChange, value, showHide = true, id = "\"logging-password\""}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<BiHide/>);
    function changeVisibilityForPassword() {
        const password_component = document.getElementById("logging-password");
        if (password_component.type === "password") {
            password_component.type = "text";
            setChangeVisibilityIcon(<BiShow />);
        } else {
            password_component.type = "password";
            setChangeVisibilityIcon(<BiHide />);
        }
    }

    return <>
            <input id={id}
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