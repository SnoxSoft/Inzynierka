import TextInputEmployee from "./models/TextInputEmployee";
import {BiHide, BiShow} from "react-icons/bi";
import {useState} from "react";

const Password = ({onChange, value}) => {

    const[changeVisibilityIcon, setChangeVisibilityIcon] = useState(<BiHide/>);
    function changeVisibilityForPassword() {
        const x = document.getElementById("employee-password");
        if (x.type === "password") {
            x.type = "text";
            setChangeVisibilityIcon(<BiShow />);
        } else {
            x.type = "password";
            setChangeVisibilityIcon(<BiHide />);
        }
    }

    return <>
            <input id={"employee-password"} className={"grow border text-black rounded-md text-left h-6"} type={"password"}
                  onChange={(e) => onChange(e.target.value)} value={value}></input>
            <button onClick={changeVisibilityForPassword}>{changeVisibilityIcon}</button>
        </>
}

export default Password;