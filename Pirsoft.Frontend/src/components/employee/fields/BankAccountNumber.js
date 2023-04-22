import TextInputEmployee from "./models/TextInputEmployee";

const BankAccountNumber = ({id, onChange, value, disableChange}) => {
    return <TextInputEmployee id={id} onChange={onChange} value={value} disableChange={disableChange}
                              type={"number"} maxLength={26}/>
}

export default BankAccountNumber;