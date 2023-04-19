
const FirstnameAndLastname = ({onChange, value, id}) => {

    return <div>
        <input id={id} className={"w-96 text-black rounded-sm"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>
    </div>

}
export default FirstnameAndLastname;