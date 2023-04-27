import TextInputEmployee from "./models/TextInputEmployee";

const Pesel = ({id, onChange, value, disableChange}) => {

<<<<<<< HEAD

=======
>>>>>>> e64e4e3b0caf45d6129b5bc93816f458bae16902
    return <TextInputEmployee id={id} onChange={onChange} value={value} disableChange={disableChange}
              type={"number"} maxLength={11}/>
}

export default Pesel;