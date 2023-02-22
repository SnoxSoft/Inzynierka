
const RemindCode = ({onChange, value}) => {

    return <input id={"remind-code"}
                  className={"border text-black rounded-md text-center h-6 w-72 self-center"}
                  type={"text"}
           onChange={(e) => onChange(e.target.value)} value={value}></input>
}

export default RemindCode;