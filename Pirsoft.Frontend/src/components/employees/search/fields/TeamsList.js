import React from 'react'
import Select from 'react-select'

const TeamsList = ({onChange}) => {

    // wartosci z endpointa - brak
    const teams = [
        { value: '', label: 'Wybierz...' },
        { value: 'Zespół A', label: 'zespół A' },
        { value: 'Zespół B', label: 'zespół B' },
        { value: 'Zespół C', label: 'zespół C' }
    ]

    return <Select className={"w-96 text-black"}
                   defaultValue={teams[0]}
                   options={teams}
                   onChange={(e) => onChange(e.value)}/>

}
export default TeamsList;