import TextInputEmployee from "./models/TextInputEmployee";

const Contract = ({id, onChange, value, disableChange}) => {
    return <TextInputEmployee id={id} onChange={onChange} value={value} disableChange={disableChange}/>
}

export default Contract;