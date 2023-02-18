import TextInputEmployee from "./models/TextInputEmployee";

const FirstName = ({id, onChange, value}) => {
    return <TextInputEmployee id={id} onChange={onChange} value={value}/>
}

export default FirstName;