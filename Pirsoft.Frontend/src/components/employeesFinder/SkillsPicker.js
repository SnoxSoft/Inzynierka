import ReusableButton from "../base/ReusableButton";
import {labelClear, labelPick, skillsLabel} from "../../GlobalAppConfig";

const SkillsPicker = ({setSkills, loadAllSkills, setSkillsNotShows, id}) => {

    return <div className={"flex flex-row place-items-center gap-2"}>
        <div>{skillsLabel}</div>
        <div>
            <ReusableButton id={id + "-pick"} value={labelPick} onClick={() =>
                loadAllSkills().then(r => {
                    setSkillsNotShows()
                })}/>
        </div>
        <div>
            <ReusableButton id={id + "-clear"} value={labelClear} onClick={() => setSkills([])}/>
        </div>
    </div>
}

export default SkillsPicker;