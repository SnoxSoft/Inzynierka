import {labelFirstNameAndLastName} from "../../GlobalAppConfig";

const FirstNameAndLastName = ({id, onChange, value}) => {

    return <div className={"flex flex-row gap-2 hover:cursor-default"}>
        <div>{labelFirstNameAndLastName}</div>
        <div>
        <input id={id} className={"w-96 text-black rounded-sm"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value} ></input>
        </div>
    </div>

}
export default FirstNameAndLastName;