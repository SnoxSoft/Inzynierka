import React from 'react'
import Select from 'react-select'
import {positionLevelAdditionalRow} from "../../../GlobalAppConfig";

const PositionLevel = ({value = undefined, onChange, id, disableChange = false, positionLevels}) => {

    let defaultValue = { seniority_level_id: 0, seniority_level_name: positionLevelAdditionalRow };

    if(value !== undefined){
        positionLevels.map(positionLevel => {
            if(positionLevel.seniority_level_id.toString().trim() === value.toString().trim()){
                defaultValue = { seniority_level_id: positionLevel.seniority_level_id, seniority_level_name: positionLevel.seniority_level_name };
            }
        });
    }

    return <Select id={id}
        className={"text-black rounded-full text-left grow"}
                   defaultValue={defaultValue}
                   options={positionLevels}
                   getOptionLabel={option =>
                       `${option.seniority_level_name}`
                   }
                   menuPlacement="top"
                   getOptionValue={option => `${option.seniority_level_id}`}
                   onChange={(e) => onChange(e.seniority_level_id)}
                   isDisabled={disableChange}/>
}
export default PositionLevel;