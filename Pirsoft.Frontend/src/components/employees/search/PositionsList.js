import React from 'react'
import Select from 'react-select'

const TeamsList = () => {

    const teams = [
        { value: 'Zespół A', label: 'Zespół A' },
        { value: 'Zespół B', label: 'Zespół B' },
        { value: 'Zespół C', label: 'Zespół C' }
    ]

    return <Select options={teams} />

}

export default TeamsList;