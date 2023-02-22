import TextInputEmployee from "./models/TextInputEmployee";

const BankAccountNumber = ({onChange, value, disableChange}) => {
    return <TextInputEmployee onChange={onChange} value={value} disableChange={disableChange}/>
}

export default BankAccountNumber;