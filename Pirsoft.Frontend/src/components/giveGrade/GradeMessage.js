
const GradeMessage = ({onChange, value, enable = false}) => {

        return <div className={"flex flex-col gap-2 place-items-center"}>
        <div>Treść</div>
        <textarea className={"w-96 text-black rounded-sm text-center"}
            value={value} disabled={!enable}
            onChange={(e) => onChange(e.target.value)}
            rows={10}
            cols={5}
        />
    </div>

}
export default GradeMessage;