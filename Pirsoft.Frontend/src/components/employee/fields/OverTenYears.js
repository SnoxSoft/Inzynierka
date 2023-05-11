

const OverTenYears = ({id, onChange, value, disableChange}) => {

    return (
        <>
        <input id={id}
                  onChange={(e) => {onChange(e.target.checked)}}
                  value={""} disabled={disableChange}
                  checked={value}
                  type={"checkbox"} className={"w-6 h-6 accent-workday"}/>
            </>
    )
}

export default OverTenYears;