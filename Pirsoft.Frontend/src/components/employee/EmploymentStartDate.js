
const EmploymentStartDate = ({onChange, value}) => {

    return <div>
        <input className={"border text-center"} type={"date"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>
    </div>

}

export default EmploymentStartDate;