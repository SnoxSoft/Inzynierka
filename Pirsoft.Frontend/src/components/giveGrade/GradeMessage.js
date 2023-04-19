import {gradeMessageLabel} from "../../GlobalAppConfig";

const GradeMessage = ({id, onChange, value, enable = false}) => {

        return <div className={"flex flex-col gap-2 place-items-center hover:cursor-default"}>
        <div>{gradeMessageLabel}</div>
        <textarea id={id} className={"w-96 text-black rounded-sm text-center"}
            value={value} disabled={!enable}
            onChange={(e) => onChange(e.target.value)}
            rows={10}
            cols={5}
        />
    </div>

}
export default GradeMessage;