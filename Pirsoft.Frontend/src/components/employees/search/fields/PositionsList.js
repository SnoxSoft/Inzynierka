import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";
import {serverIp} from "../../../../Configure";

const PositionsList = ({onChange}) => {
    const [positions, setPositions] = useState(Object);

    if (positions[0] === undefined) {
        fetch(serverIp+"/getAllPositions")
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