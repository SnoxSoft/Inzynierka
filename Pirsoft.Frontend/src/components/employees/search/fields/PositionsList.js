import React from 'react'
import Select from 'react-select'
import {positionAdditionalRow} from "../../../../GlobalAppConfig";

const PositionsList = ({value = undefined, onChange, id, disableChange = false, positions,
                           formatting = "w-96", placement = "top"}) => {

    let defaultValue = { role_id: 0, role_name: positionAdditionalRow };

    if(value !== undefined){
        positions.map(position => {
            if(position.role_id.toString().trim() === value.toString().trim()){
                defaultValue = { role_id: position.role_id, role_name: position.role_name };
            }
        });
    }

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