import ReusableButton from "../base/ReusableButton";
import {labelClear, labelPick, skillsLabel} from "../../GlobalAppConfig";

const SkillsPicker = ({setSkills, setSkillsNotShows}) => {

    return <div className={"flex flex-row place-items-center gap-2"}>
        <div>{skillsLabel}</div>
        <div>
            <ReusableButton value={labelPick} onClick={() => setSkillsNotShows()}/>
        </div>
        <div>
            <ReusableButton value={labelClear} onClick={() => setSkills([])}/>
        </div>
    </div>
}

export default SkillsPicker;