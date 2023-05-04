import React from 'react'
import Select from 'react-select'
import {teamAdditionalRow} from "../../../../GlobalAppConfig";

const TeamsList = ({value = undefined, onChange, id, teams,
                       disableChange = false, placement = "bottom", formatting = "w-96"}) => {

    let defaultValue = { department_id: 0, department_name: teamAdditionalRow };

    if(value !== undefined){
        teams.map(team => {
            if(team.department_id.toString().trim() === value.toString().trim()){
                defaultValue = { department_id: team.department_id, department_name: team.department_name };
            }
        });
    }

    return <Select id={id}
        className={formatting + " text-black"}
                   defaultValue={defaultValue}
                   menuPlacement={placement}
                   options={teams}
                   getOptionLabel={option =>
                       `${option.department_name}`
                   }
                   getOptionValue={option => `${option.department_id}`}
                   onChange={(e) => onChange(e.department_id)}
                   isDisabled={disableChange}/>
}
export default TeamsList;