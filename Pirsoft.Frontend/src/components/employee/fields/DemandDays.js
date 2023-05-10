
const DemandDays = ({id, onChange, value, disableChange}) => {

    return <input id={id} className={"border text-black rounded-md text-center h-6 pl-2 w-11"} type={"number"}
                   onChange={(e) => {
                       let newValue = e.target.value;
                       if(newValue.length > 1){
                           onChange(newValue.substring(0, 1))
                       }
                       else {
                           onChange(newValue)
                       }
                   }
                   } value={value} disabled={disableChange}>
            </input>
}

export default DemandDays;