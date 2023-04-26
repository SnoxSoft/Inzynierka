import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../base/FunctionForSortingJson";
import {positionLevelAdditionalRow, serverIpProd} from "../../../GlobalAppConfig";
import {endpointGetAllPositionsLevels} from "../../../EndpointAppConfig";

const PositionLevel = ({value, onChange, id, disableChange = false}) => {

    const [positionLevels, setPositionLevels] = useState();

    if (positionLevels === undefined) {
        fetch(serverIpProd + "/" + endpointGetAllPositionsLevels,
            {
                method: "GET"
            })
            .then((response) => response.json())
            .then((response) => {
                response.push({ seniority_level_id: 0, seniority_level_name: positionLevelAdditionalRow })
                response.sort(FunctionForSortingJson("seniority_level_id", "ascending"))
                setPositionLevels(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select id={id}
        className={"text-black rounded-full text-left grow"}
                   defaultValue={{ seniority_level_id: 0, seniority_level_name: positionLevelAdditionalRow }}
                   options={positionLevels}
                   getOptionLabel={option =>
                       `${option.seniority_level_name}`
                   }
                   menuPlacement="top"
                   getOptionValue={option => `${option.seniority_level_id}`}
                   onChange={(e) => onChange(e.value)}
                   isDisabled={disableChange}/>


}
export default PositionLevel;