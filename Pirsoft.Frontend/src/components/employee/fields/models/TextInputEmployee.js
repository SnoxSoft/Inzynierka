import {useState} from "react";

const TextInputEmployee = ({id, onChange, value, disableChange = false,
           type="text", maxLength=-1}) => {

    return <input id={id} className={"grow border text-black rounded-md text-left h-6 pl-2"} type={type}
                  onChange={(e) => {
                      let newValue = e.target.value;
                      if(maxLength !== -1 && newValue.length > maxLength){
                          onChange(newValue.substring(0, maxLength))
                      }
                      else {
                          onChange(newValue)
                      }
                  }
                  } value={value} disabled={disableChange}>

    </input>

}
export default TextInputEmployee;