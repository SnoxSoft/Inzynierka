import React, {useState} from 'react'
import Select from 'react-select'

const PositionsList = ({onChange}) => {

    // wartosci z endpointa - brak
    // const positions = [
    //     { value: '', label: 'Wybierz...' },
    //     { value: 'KSIĘGOWA', label: 'KSIĘGOWA' },
    //     { value: 'TESTER OPROGRAMOWANIA', label: 'TESTER OPROGRAMOWANIA' },
    //     { value: 'PROGRAMISTA', label: 'PROGRAMISTA' }
    // ]

    // endpoint zakomentowany do uzycia
    const [positions, setPositions] = useState(Object);
    function GetSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    if (positions[0] === undefined) {
        fetch("http://127.0.0.1:3001/getAllPositions")
            .then((response) => response.json())
            .then((response) => {
                response.push({ value: '', label: 'Wybierz...' })
                response.sort(GetSortOrder("value"))
                setPositions(response)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return <Select className={"w-96 text-black"}
                   defaultValue={{ value: '', label: 'Wybierz...' }}
                   options={positions}
                   onChange={(e) => onChange(e.value)}/>

}

export default PositionsList;