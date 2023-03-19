import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";

const PositionsList = ({onChange}) => {

    const [positions, setPositions] = useState(Object);

    if (positions[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllPositions")
            .then((response) => response.json())
            .then((response) => {
                response.push({ value: '', label: 'Wybierz...' })
                response.sort(FunctionForSortingJson("value", "ascending"))
                setPositions(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select className={"w-96 text-black"}
                   defaultValue={{ value: '', label: 'Wybierz...' }}
                   options={positions}
                   onChange={(e) => onChange(e.value)}/>

}

export default PositionsList;