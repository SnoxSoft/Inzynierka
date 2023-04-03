import {useState} from "react";
import {labelFirstNameAndLastName} from "../../GlobalAppConfig";

const FirstnameAndLastname = ({onChange, value}) => {

    const[lockAndUnlock, setLockAndUnlock] = useState(true)

    return <div className={"flex flex-row gap-2"}>
        <div>{labelFirstNameAndLastName}</div>
        <div>
        <input type={"checkbox"} className={"w-6 h-6"} defaultChecked={false}
            onChange={(e) => setLockAndUnlock(!e.target.checked)}/>
        </div>
        <div>
        <input className={"w-96 text-black rounded-sm"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value} disabled={lockAndUnlock}></input>
        </div>
    </div>

}
export default FirstnameAndLastname;