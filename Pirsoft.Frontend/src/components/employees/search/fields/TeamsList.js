import React, {useState} from 'react'
import Select from 'react-select'
import FunctionForSortingJson from "../../../base/FunctionForSortingJson";
import {serverIp} from "../../../../GlobalAppConfig";

const TeamsList = ({onChange}) => {

    const [teams, setTeams] = useState(Object);

    if (teams[0] === undefined) {
        fetch(serverIp+"/getAllTeams")
            .then((response) => response.json())
            .then((response) => {
               // { value: '', label: 'Wybierz...' }
                response.push({ value: '', label: 'Wybierz...' })
                response.sort(FunctionForSortingJson("value", "ascending"))
                setTeams(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select className={"w-96 text-black"}
                   defaultValue={{ value: '', label: 'Wybierz...' }}
                   options={teams}
                   onChange={(e) => onChange(e.value)}/>

}
export default TeamsList;