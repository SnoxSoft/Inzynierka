import React from 'react'
import Select from 'react-select'
import {absencesAdditionalRow} from "../../GlobalAppConfig";
const AbsencesList = ({value = undefined, onChange, absences,
                       disableChange = false}) => {

    let defaultValue = { absence_type_id: 0, absence_type_name: absencesAdditionalRow };

    if(value !== undefined){
        absences.map(absence => {
            if(absence.absence_type_id.toString().trim() === value.toString().trim()){
                defaultValue = { absence_type_id: absence.absence_type_id, absence_type_name: absence.absence_type_name };
            }
        });
    }

    return <Select id={"request-type"}
        className={"text-black h-6"}
                   defaultValue={defaultValue}
                   value={defaultValue}
                   options={absences}
                   getOptionLabel={option =>
                       `${option.absence_type_name}`
                   }
                   getOptionValue={option => `${option.absence_type_id}`}
                   onChange={(e) => onChange(e.absence_type_id)}
                   isDisabled={disableChange}/>
}
export default AbsencesList;