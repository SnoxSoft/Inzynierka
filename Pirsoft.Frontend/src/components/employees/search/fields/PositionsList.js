import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";
import {positionAdditionalRow, serverIp} from "../../../../GlobalAppConfig";
import {endpointGetAllPositions} from "../../../../EndpointAppConfig";

const PositionsList = ({onChange, id}) => {
    const [positions, setPositions] = useState(Object);

    if (positions[0] === undefined) {
        fetch(serverIp + "/" + endpointGetAllPositions)
            .then((response) => response.json())
            .then((response) => {

                console.log(response)
                response.push({ role_id: 0, role_name: positionAdditionalRow })
                response.sort(FunctionForSortingJson("role_id", "ascending"))
                setPositions(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select id={id} className={"w-96 text-black"}
                   defaultValue={{ role_id: 0, role_name: positionAdditionalRow }}
                   getOptionLabel={option =>
                       `${option.role_name}`
                   }
                   getOptionValue={option => `${option.role_id}`}
                   options={positions}
                   onChange={(e) => onChange(e.value)}/>

}

export default PositionsList;