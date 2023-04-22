import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../base/FunctionForSortingJson";
import {contractAdditionalRow, serverIp} from "../../../GlobalAppConfig";
import {endpointGetAllContracts} from "../../../EndpointAppConfig";

const Contract = ({value, onChange, id, disableChange = false}) => {

    const [contracts, setContracts] = useState();

    if (contracts === undefined) {
        fetch(serverIp + "/" + endpointGetAllContracts)
            .then((response) => response.json())
            .then((response) => {
                response.push({ contract_id: 0, contract_type_name: contractAdditionalRow })
                response.sort(FunctionForSortingJson("contract_id", "ascending"))
                setContracts(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select id={id}
                   className={"text-black rounded-full text-left grow"}
                   defaultValue={{ contract_id: 0, contract_type_name: contractAdditionalRow }}
                   options={contracts}
                   getOptionLabel={option =>
                       `${option.contract_type_name}`
                   }
                   menuPlacement="top"
                   getOptionValue={option => `${option.contract_id}`}
                   onChange={(e) => onChange(e.value)}
                   isDisabled={disableChange}/>


}
export default Contract;