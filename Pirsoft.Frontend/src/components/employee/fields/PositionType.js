import TextInputEmployee from "./models/TextInputEmployee";
import Select from "react-select";
import React from "react";

const PositionType = ({id, onChange, value, disableChange}) => {
    return <TextInputEmployee id={id} onChange={onChange} value={value} disableChange={disableChange}/>
}

export default PositionType;