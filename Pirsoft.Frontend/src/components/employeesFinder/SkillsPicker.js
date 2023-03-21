import ReusableButton from "../base/ReusableButton";

const SkillsPicker = ({setSkills, setSkillsNotShows}) => {

    return <div className={"flex flex-row place-items-center gap-2"}>
        <div>UMIEJĘTNOŚCI:</div>
        <div>
            <ReusableButton value={"WYBIERZ"} onClick={() => setSkillsNotShows()}/>
        </div>
        <div>
            <ReusableButton value={"WYCZYŚĆ"} onClick={() => setSkills([])}/>
        </div>
    </div>
}

export default SkillsPicker;