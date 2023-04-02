
const GradeTitle = ({onChange, value, enable = false}) => {

        return <div className={"flex flex-col gap-2"}>
        <div>Tytuł</div>
        <div>
        <input className={"w-96 text-black rounded-sm text-center"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value} disabled={!enable}></input>
        </div>
    </div>

}
export default GradeTitle;