
const EmploymentStartDate = ({id, onChange, value, disableChange}) => {

    return <input className={"grow border text-black rounded-md text-left h-6"} type={"date"}
                  id={id}
               onChange={(e) => onChange(e.target.value)} value={value} disableChange={disableChange} readOnly={disableChange}></input>

}

export default EmploymentStartDate;