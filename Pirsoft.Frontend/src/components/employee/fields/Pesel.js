import TextInputEmployee from "./models/TextInputEmployee";

const Pesel = ({onChange, value, disableChange}) => {
    return <TextInputEmployee onChange={onChange} value={value} disableChange={disableChange}/>
}

export default Pesel;