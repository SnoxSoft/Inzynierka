
const FirstnameAndLastname = ({onChange, value}) => {

    return <div>
        <input className={"w-96"} type={"text"}
               onChange={(e) => onChange(e.target.value)} value={value}></input>
    </div>

}

export default FirstnameAndLastname;