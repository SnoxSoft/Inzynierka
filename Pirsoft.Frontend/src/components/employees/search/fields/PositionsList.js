import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";
import {positionAdditionalRow, serverIpProd} from "../../../../GlobalAppConfig";
import {endpointGetAllPositions} from "../../../../EndpointAppConfig";

const PositionsList = ({value, onChange, id, disableChange = false, formatting = "w-96", placement = "top"}) => {

    const [positions, setPositions] = useState();
    let defaultValue = { role_id: 0, role_name: positionAdditionalRow };

    if (positions === undefined) {
        fetch(serverIpProd + "/" + endpointGetAllPositions,
            {
                method: "GET"
            })
            .then((response) => response.json())//response.json())
            .then((response) => {
                response.push({role_id: 0, role_name: positionAdditionalRow})
                response.sort(FunctionForSortingJson("role_id", "ascending"))
                setPositions(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    // Zostawiam komentarz
    // if(positions[0] !== undefined){
    //     positions.map(position => {
    //         if(position.role_id.toString().trim() === value.toString().trim()){
    //             console.log(position.role_id + ", " + value + ",  ")
    //             console.log(position.role_id.toString().trim() === value.toString().trim())
    //             console.log(defaultValue)
    //             defaultValue = { role_id: position.role_id, role_name: position.role_name };
    //             console.log(defaultValue)
    //         }
    //     });
    // }

    return <>
            {positions && <Select id={id} className={"text-black " + formatting}
                                defaultValue={defaultValue}
                                getOptionLabel={option =>
                                    `${option.role_name}`
                                }
                                menuPlacement={placement}
                                getOptionValue={option => `${option.role_id}`}
                                options={positions}
                                onChange={(e) => onChange(e.value)}
                                isDisabled={disableChange}/>
            }
        </>

}

export default PositionsList;