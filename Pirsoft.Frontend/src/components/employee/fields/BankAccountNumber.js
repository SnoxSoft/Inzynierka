import TextInputEmployee from "./models/TextInputEmployee";

const BankAccountNumber = ({onChange, value}) => {
    return <TextInputEmployee onChange={onChange} value={value}/>
}

export default BankAccountNumber;