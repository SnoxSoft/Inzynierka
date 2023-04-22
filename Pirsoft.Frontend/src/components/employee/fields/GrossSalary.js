import TextInputEmployee from "./models/TextInputEmployee";

const GrossSalary = ({id, onChange, value, disableChange}) => {
    return <TextInputEmployee id={id} onChange={onChange} value={value} disableChange={disableChange}
              type={"number"} pattern={"/^\\d*\\.?\\d*$/"}/>
}

export default GrossSalary;