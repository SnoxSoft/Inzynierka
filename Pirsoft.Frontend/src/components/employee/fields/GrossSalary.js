import TextInputEmployee from "./models/TextInputEmployee";

const GrossSalary = ({onChange, value, disableChange}) => {
    return <TextInputEmployee onChange={onChange} value={value} disableChange={disableChange}/>
}

export default GrossSalary;