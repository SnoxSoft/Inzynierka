
const DateOfBirth = ({id, onChange, value, disableChange}) => {

    return <input id={id} className={"grow border text-left text-black rounded-md h-6"} type={"date"}
               onChange={(e) => {onChange(e.target.value) }} value={value} disableChange={disableChange} readOnly={disableChange}></input>

}

export default DateOfBirth;