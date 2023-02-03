
const DateOfBirth = ({onChange, value}) => {

    return <input className={"grow border text-left text-black rounded-md"} type={"date"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>

}

export default DateOfBirth;