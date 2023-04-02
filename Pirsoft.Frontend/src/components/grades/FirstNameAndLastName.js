
const FirstNameAndLastName = ({onChange, value}) => {

    return <div className={"flex flex-row gap-2"}>
        <div>IMIE I NAZWISKO: </div>
        <div>
        <input className={"w-96 text-black rounded-sm"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value} ></input>
        </div>
    </div>

}
export default FirstNameAndLastName;