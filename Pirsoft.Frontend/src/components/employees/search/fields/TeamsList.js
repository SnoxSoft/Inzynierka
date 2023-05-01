import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";
import {serverIpProd, teamAdditionalRow} from "../../../../GlobalAppConfig";
import {endpointGetAllTeams} from "../../../../EndpointAppConfig";

const TeamsList = ({onChange, id}) => {

    const [teams, setTeams] = useState(Object);

    if (teams[0] === undefined) {
        fetch(serverIpProd + "/" + endpointGetAllTeams)
            .then((response) => response.json())
            .then((response) => {
                response.push({ department_id: 0, department_name: teamAdditionalRow })
                response.sort(FunctionForSortingJson("department_id", "ascending"))
                setTeams(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select id={id}
        className={"w-96 text-black"}
                   defaultValue={{ department_id: 0, department_name: teamAdditionalRow }}
                   options={teams}
                   getOptionLabel={option =>
                       `${option.department_name}`
                   }
                   getOptionValue={option => `${option.department_id}`}
                   onChange={(e) => onChange(e.value)}/>


}
export default TeamsList;