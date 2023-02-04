import TextInputEmployee from "./models/TextInputEmployee";

const GrossSalary = ({onChange, value}) => {
    return <TextInputEmployee onChange={onChange} value={value}/>
}

export default GrossSalary;