import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";
import {serverIp, teamAdditionalRow} from "../../../../GlobalAppConfig";
import {endpointGetAllTeams} from "../../../../EndpointAppConfig";

const TeamsList = ({onChange}) => {

    const [teams, setTeams] = useState(Object);

    if (teams[0] === undefined) {
        fetch(serverIp + "/" + endpointGetAllTeams)
            .then((response) => response.json())
            .then((response) => {
                response.push({ value: '', label: teamAdditionalRow })
                response.sort(FunctionForSortingJson("value", "ascending"))
                setTeams(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select className={"w-96 text-black"}
                   defaultValue={{ value: '', label: teamAdditionalRow }}
                   options={teams}
                   onChange={(e) => onChange(e.value)}/>

}
export default TeamsList;