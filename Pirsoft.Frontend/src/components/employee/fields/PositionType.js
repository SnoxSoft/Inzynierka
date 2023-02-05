import TextInputEmployee from "./models/TextInputEmployee";
import Select from "react-select";
import React from "react";

const PositionType = ({onChange, value}) => {
    return <TextInputEmployee onChange={onChange} value={value}/>
}

export default PositionType;