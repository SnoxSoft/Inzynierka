import TextInputEmployee from "./models/TextInputEmployee";
import Select from "react-select";
import React from "react";

const PositionType = ({onChange, value, disableChange}) => {
    return <TextInputEmployee onChange={onChange} value={value} disableChange={disableChange}/>
}

export default PositionType;