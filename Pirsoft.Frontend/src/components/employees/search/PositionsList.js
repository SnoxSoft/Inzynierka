import React from 'react'
import Select from 'react-select'

const PositionsList = ({onChange}) => {

    const positions = [
        { value: '', label: 'Wybierz...' },
        { value: 'KSIĘGOWA', label: 'KSIĘGOWA' },
        { value: 'TESTER OPROGRAMOWANIA', label: 'TESTER OPROGRAMOWANIA' },
        { value: 'PROGRAMISTA', label: 'PROGRAMISTA' }
    ]

    return <Select className={"w-96 text-black"}
                   defaultValue={positions[0]}
                   options={positions}
                   onChange={(e) => onChange(e.value)}/>

}

export default PositionsList;