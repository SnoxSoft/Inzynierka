
const BankAccountNumber = ({onChange, value}) => {

    return <input className={"grow border text-black rounded-md text-left"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>

}

export default BankAccountNumber;