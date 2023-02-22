import TextInputEmployee from "./models/TextInputEmployee";

const LastName = ({onChange, value, disableChange}) => {
    return <TextInputEmployee onChange={onChange} value={value} disableChange={disableChange}/>
}

export default LastName;