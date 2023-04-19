import {gradeTitleLabel} from "../../GlobalAppConfig";

const GradeTitle = ({id, onChange, value, enable = false}) => {

        return <div className={"flex flex-col gap-2 hover:cursor-default"}>
        <div>{gradeTitleLabel}</div>
        <div>
        <input id={id} className={"w-96 text-black rounded-sm text-center"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value} disabled={!enable}></input>
        </div>
    </div>

}
export default GradeTitle;