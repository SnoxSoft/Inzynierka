import TextInputEmployee from "./models/TextInputEmployee";

const LastName = ({onChange, value}) => {
    return <TextInputEmployee onChange={onChange} value={value}/>
}

export default LastName;