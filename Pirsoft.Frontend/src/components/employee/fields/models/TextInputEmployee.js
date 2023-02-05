import {useState} from "react";

const TextInputEmployee = ({onChange, value}) => {

    return <input className={"grow border text-black rounded-md text-left h-6"} type={"text"}
                  onChange={(e) => onChange(e.target.value)} value={value}>

    </input>

}
export default TextInputEmployee;