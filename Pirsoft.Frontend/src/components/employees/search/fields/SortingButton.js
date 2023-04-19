import React, {useState} from 'react'
import {AiOutlineSortAscending, AiOutlineSortDescending} from "react-icons/ai";

const SortingButton = ({setOrder, id}) => {

    const[orderingButton, setOrderingButton] = useState(<AiOutlineSortAscending size={70}/>)

    const changeOrdering = () => {
        if(orderingButton.type === AiOutlineSortAscending){
            setOrderingButton(<AiOutlineSortDescending size={70} />)
            setOrder(true);
        }
        else{
            setOrderingButton(<AiOutlineSortAscending size={70}/>)
            setOrder(false);
        }
    }
    return(
    <button id={id} onClick={changeOrdering} className={"h-auto w-9"}>
        {orderingButton}
    </button>
    );
}
export default SortingButton;