import TextInputEmployee from "./models/TextInputEmployee";
import {BiHide, BiShow} from "react-icons/bi";
import {useState} from "react";

const Password = ({id, onChange, value, showHide = false, disableChange = false}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<BiHide/>);
    function changeVisibilityForPassword() {
        const password_component = document.getElementById("employee-password");
        if (password_component.type === "password") {
            password_component.type = "text";
            setChangeVisibilityIcon(<BiShow />);
        } else {
            password_component.type = "password";
            setChangeVisibilityIcon(<BiHide />);
        }
    }

    return <>
            <input id={id} className={"grow border text-black rounded-md text-left h-6 disabled:font-bold pl-2"} type={"password"}
                  onChange={(e) => onChange(e.target.value)} value={value} disabled={disableChange}></input>
            {showHide ?
                <button onClick={changeVisibilityForPassword}>{changeVisibilityIcon}</button> :
                <></>
            }
        </>
}

export default Password;