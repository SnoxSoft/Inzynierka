import TextInputEmployee from "./models/TextInputEmployee";

const Contract = ({onChange, value, disableChange}) => {
    return <TextInputEmployee onChange={onChange} value={value} disableChange={disableChange}/>
}

export default Contract;