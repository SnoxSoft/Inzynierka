import React from 'react'
import Select from 'react-select'
import {contractAdditionalRow} from "../../../GlobalAppConfig";

const Contract = ({value = undefined, onChange, id, disableChange = false, contracts}) => {

    let defaultValue = { contract_id: 0, contract_type_name: contractAdditionalRow };

    if(value !== undefined){
        contracts.map(contract => {
            if(contract.contract_id.toString().trim() === value.toString().trim()){
                defaultValue = { contract_id: contract.contract_id, contract_type_name: contract.contract_type_name };
            }
        });
    }

    return <Select id={id}
                   className={"text-black rounded-full text-left grow"}
                   defaultValue={defaultValue}
                   options={contracts}
                   getOptionLabel={option =>
                       `${option.contract_type_name}`
                   }
                   menuPlacement="top"
                   getOptionValue={option => `${option.contract_id}`}
                   onChange={(e) => onChange(e.contract_id)}
                   isDisabled={disableChange}/>
}
export default Contract;