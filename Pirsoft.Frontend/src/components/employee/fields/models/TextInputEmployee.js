import {useState} from "react";

const TextInputEmployee = ({id, onChange, value, disableChange = false}) => {

    return <input id={id} className={"grow border text-black rounded-md text-left h-6"} type={"text"}
                  onChange={(e) => onChange(e.target.value)} value={value} disabled={disableChange}>

    </input>

}
export default TextInputEmployee;