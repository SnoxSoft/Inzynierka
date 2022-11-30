
const Pesel = ({onChange, value}) => {

    return <div>
        <input className={"border"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>
    </div>

}

export default Pesel;