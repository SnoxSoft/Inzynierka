import React, {useState, useRef} from "react";
const Calendar= ({setDateTo,setDateFrom,from,to}) => {

    return (
        <div className={"content-center"}>
            <div className={"flex flex-row gap-4 place-self-center justify-left "}>
                <p className={""}>OD: <input
                    type={"date"}
                    className={"text-black rounded-md"}
                    value={from}
                    required
                    pattern="[0-9]{4}-[0-9]{2}"
                    onChange={(e) => {
                        setDateFrom(e.target.value);
                    }}
                /></p>
                <p className={""}>DO: <input
                    type={"date"}
                    className={"text-black rounded-md"}
                    value={to}
                    required
                    pattern="[0-9]{4}-[0-9]{2}"
                    onChange={(e) => {
                        setDateTo(e.target.value);
                    }}
                /></p>
            </div>
        </div>
    );
}
export default Calendar;