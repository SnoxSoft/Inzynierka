import React from "react";
import {calendarLabelFrom, calendarLabelTo, optionsForDateYYYY_MM_DD} from "../../GlobalAppConfig";
const Calendar= ({setDateTo,setDateFrom,from,to, disabled = false, id, doValidate = false}) => {

    function validateDate(pickedDateText, method){
        if(!doValidate){
            return
        }

        let pickedDate = new Date(pickedDateText)

        if(method === "from") {
            setDateFrom(pickedDateText)
        }else {
            setDateTo(pickedDateText)
        }

        if(pickedDate.getFullYear().toString().length === 4
            && (pickedDate.getFullYear().toString().substring(0, 2) !== "19" ||
                pickedDate.getFullYear().toString().substring(0, 2) !== "20")){
            if(method === "from") {
                setDateFrom(new Date().toLocaleDateString("sv", optionsForDateYYYY_MM_DD))
            }else {
                setDateTo(new Date().toLocaleDateString("sv", optionsForDateYYYY_MM_DD))
            }
        }

        if(pickedDate.getFullYear().toString().length > 4 ||
        pickedDate.getFullYear().toString().length < 4){
            if(method === "from") {
                setDateFrom(new Date().toLocaleDateString("sv", optionsForDateYYYY_MM_DD))
            }else {
                setDateTo(new Date().toLocaleDateString("sv", optionsForDateYYYY_MM_DD))
            }
        }
    }

    return (
        <div className={"content-center"}>
            <div className={"flex flex-row gap-4 place-self-center justify-left "}>
                <p className={"hover:cursor-default"}>{calendarLabelFrom}
                    <input
                        id={id+"-date-from"}
                        type={"date"}
                        className={"text-black rounded-md disabled:text-black disabled:bg-workday"}
                        value={from}
                        disabled={disabled}
                        required
                        pattern="[0-9]{4}-[0-9]{2}"
                        onChange={(e) => {
                            setDateFrom(e.target.value)
                        }}
                        onBlur={() => validateDate(from, "from")}
                    />
                </p>
                <p className={"hover:cursor-default"}>{calendarLabelTo}
                    <input
                        id={id+"-date-to"}
                        type={"date"}
                        className={"text-black rounded-md disabled:text-black disabled:bg-workday"}
                        value={to}
                        disabled={disabled}
                        required
                        pattern="[0-9]{4}-[0-9]{2}"
                        onChange={(e) => {
                            setDateTo(e.target.value)
                        }}
                        onBlur={() => validateDate(to, "to")}
                    />
                </p>
            </div>
        </div>
    );
}
export default Calendar;