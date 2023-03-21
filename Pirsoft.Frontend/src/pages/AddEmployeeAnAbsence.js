import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/absences/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import Select from "react-select";
import {CgClose} from "react-icons/cg";


const AddEmployeeAnAbsence = ({setShowAddEmployeeAnAbsence, setEmployeeDataShow, forEmployee}) =>{
    document.title = "PIRSOFT: Wystaw wniosek";

    // Opcje dla wyświetlenia daty w formacie tekstowym
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }
    const currentDate = new Date();

    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(currentDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(currentDate.toLocaleDateString("sv", options));

    const absenceOptions = [
        { value: 'dayoff', label: 'URLOP WYPOCZYNKOWY'},
        { value: 'demand', label: 'URLOP NA ŻĄDANIE' },
        { value: 'absent', label: 'NIEOBECNOŚĆ' },
        { value: 'sick', label: 'URLOP CHOROBOWY' }
    ]

    return(
        <div id={"add-employee-request"}
             className={"every-page-on-scroll flex text-center flex-col bg-blue-menu text-workday p-4"}
             style={{minWidth: 800}}>
            <div className={"grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    WNIOSEK URLOPOWY
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={<CgClose  size={30}/>}
                                    onClick={() => {
                                        setShowAddEmployeeAnAbsence(false);
                                        setEmployeeDataShow(true);
                                    }}
                    formatting={""} color={""}/>
                </div>
            </div>
            <div>{forEmployee.firstname} {forEmployee.lastname}</div>
            <br/>
            <div className={"flex p-4 gap-8 text-center flex-col"}>
                <div className={"flex justify-center"}>
                    <Calendar setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}/>
                </div>
                <div className={"flex"}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        RODZAJ
                    </p>
                    <div className={"bg-workday text-black basis-1/3"}>
                        <Select options={absenceOptions} defaultValue={{ value: '', label: 'URLOP WYPOCZYNKOWY'}}
                                className={"h-6"}/>
                    </div>
                </div>
                <div className={"flex place-content-center"}>
                    <p className={"text-end pr-4"}>
                        URLOP BEZPŁATNY
                    </p>
                    <input type={"checkbox"} className={"h-5 w-5 checked:decoration-workday self-center"}/>
                </div>
            </div>
            <br/><br/>
            <div className={"flex justify-evenly"} >
                <ReusableButton value={"ZATWIERDZ"} onClick={() => {
                    setShowAddEmployeeAnAbsence(false);
                    setEmployeeDataShow(true);
                }}/>
            </div>
        </div>
    )
}
export default AddEmployeeAnAbsence;