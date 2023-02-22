
const EmploymentStartDate = ({onChange, value, disableChange}) => {

    return <input className={"grow border text-black rounded-md text-left h-6"} type={"date"}
               onChange={(e) => onChange(e.target.value)} value={value} disableChange={disableChange} readOnly={disableChange}></input>

}

export default EmploymentStartDate;