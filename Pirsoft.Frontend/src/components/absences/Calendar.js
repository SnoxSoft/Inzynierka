import React, {useState, useRef} from "react";
import companySchedule from "../../pages/CompanySchedule";
const Calendar= ({setDateTo,setDateFrom,from,to, disabled = false}) => {

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }

    function validateDate(pickedDateText, method){
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
                setDateFrom(new Date().toLocaleDateString("sv", options))
            }else {
                setDateTo(new Date().toLocaleDateString("sv", options))
            }
        }

        if(pickedDate.getFullYear().toString().length > 4 ||
        pickedDate.getFullYear().toString().length < 4){
            if(method === "from") {
                setDateFrom(new Date().toLocaleDateString("sv", options))
            }else {
                setDateTo(new Date().toLocaleDateString("sv", options))
            }
        }
    }

    return (
        <div className={"content-center"}>
            <div className={"flex flex-row gap-4 place-self-center justify-left "}>
                <p className={""}>OD: <input
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
                /></p>
                <p className={""}>DO: <input
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
                /></p>
            </div>
        </div>
    );
}
export default Calendar;