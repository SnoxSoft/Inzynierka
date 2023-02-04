import TextInputEmployee from "./models/TextInputEmployee";

const FirstName = ({onChange, value}) => {
    return <TextInputEmployee onChange={onChange} value={value}/>
}

export default FirstName;