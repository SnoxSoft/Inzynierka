
const LeaveDays = ({id, onChange, value, disableChange}) => {

    return <input id={id} className={"border text-black rounded-md text-left pl-2 h-6 w-11"} type={"number"}
                   onChange={(e) => {
                       let newValue = e.target.value;
                       if(newValue.length > 2){
                           onChange(newValue.substring(0, 2))
                       }
                       else {
                           onChange(newValue)
                       }
                   }
                   } value={value} disabled={disableChange}>
            </input>
}

export default LeaveDays;