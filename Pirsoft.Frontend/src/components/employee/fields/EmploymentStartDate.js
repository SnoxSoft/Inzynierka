
const EmploymentStartDate = ({onChange, value}) => {

    return <input className={"grow border text-black rounded-md text-left h-6"} type={"date"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>

}

export default EmploymentStartDate;