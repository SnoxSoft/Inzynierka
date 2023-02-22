import React, {useState} from 'react'
import Select from 'react-select'

const TeamsList = ({onChange}) => {

    // wartosci z endpointa - brak
    const teams = [
        { value: '', label: 'Wybierz...' },
        { value: 'Zespół A', label: 'zespół A' },
        { value: 'Zespół B', label: 'zespół B' },
        { value: 'Zespół C', label: 'zespół C' }
    ]

    //endpoint zakomentowany do uzycia
    // const [teams, setTeams] = useState(Object);
    //
    // if (teams[0] === undefined) {
    //     fetch("http://127.0.0.1:3001/getAllTeams")
    //         .then((response) => response.json())
    //         .then((response) => {
    //             //console.log("fffffff "+ response[0])
    //             setTeams(response)
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         })
    // }

    return <Select className={"w-96 text-black"}
                   defaultValue={teams[0]}
                   options={teams}
                   onChange={(e) => onChange(e.value)}/>

}
export default TeamsList;