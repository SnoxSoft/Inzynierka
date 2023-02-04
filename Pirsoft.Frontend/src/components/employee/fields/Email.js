import TextInputEmployee from "./models/TextInputEmployee";

const Email = ({onChange, value}) => {
    return <TextInputEmployee onChange={onChange} value={value}/>
}

export default Email;