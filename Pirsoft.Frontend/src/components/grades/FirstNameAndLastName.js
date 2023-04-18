import {labelFirstNameAndLastName} from "../../GlobalAppConfig";

const FirstNameAndLastName = ({onChange, value}) => {

    return <div className={"flex flex-row gap-2 hover:cursor-default"}>
        <div>{labelFirstNameAndLastName}</div>
        <div>
        <input className={"w-96 text-black rounded-sm"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value} ></input>
        </div>
    </div>

}
export default FirstNameAndLastName;