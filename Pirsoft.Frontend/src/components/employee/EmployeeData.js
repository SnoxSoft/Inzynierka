import FirstName from "./fields/FirstName";
import LastName from "./fields/LastName";
import Email from "./fields/Email";
import Password from "./fields/Password";
import {FiSettings} from "react-icons/fi";
import BankAccountNumber from "./fields/BankAccountNumber";
import DateOfBirth from "./fields/DateOfBirth";
import Pesel from "./fields/Pesel";
import GrossSalary from "./fields/GrossSalary";
import PositionType from "./fields/PositionType";
import EmploymentStartDate from "./fields/EmploymentStartDate";
import {useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";

const EmployeeData = ({employee, pr}) => {

        const[firstName, setFirstName] = useState(employee.firstname);
        const[lastName, setLastName] = useState(employee.lastname);
        const[email, setEmail] = useState(employee.email);
        const[password, setPassword] = useState(employee.password);
        const[bank, setBank] = useState(employee.bank);
        const[birth, setBirth] = useState(employee.birth);
        const[pesel, setPesel] = useState(employee.pesel);
        const[salary, setSalary] = useState(employee.salary);
        const[position, setPosition] = useState(employee.position);
        const[start, setStart] = useState(employee.start);


        return <div className={"basis-4/5 grow p-4 flex flex-col justify-around"}>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> IMIĘ </label>
                        <FirstName value={firstName} onChange={setFirstName}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> NAZWISKO </label>
                        <LastName value={lastName} onChange={setLastName}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> E-MAIL </label>
                        <Email value={email} onChange={setEmail}/>
                </div>

                {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ? <>
                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> HASŁO </label>
                        <div className={"flex flex-row justify-end gap-4 grow"}>
                                <Password value={password} onChange={setPassword}/>
                                <button className={""}><FiSettings/></button>
                        </div>
                </div>


                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> KONTO BANKOWE </label>
                        <BankAccountNumber value={bank} onChange={setBank}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> DATA URODZENIA </label>
                        <DateOfBirth value={birth} onChange={setBirth}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> PESEL </label>
                        <Pesel value={pesel} onChange={setPesel}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> WYNAGRODZENIE BRUTTO </label>
                        <GrossSalary value={salary} onChange={setSalary}/>
                </div>

                </> : <></>}
                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> STANOWISKO </label>
                        <PositionType value={position} onChange={setPosition}/>
                </div>

                {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> ROZPOCZĘCIE PRACY </label>
                        <EmploymentStartDate value={start} onChange={setStart}/>
                </div>
                    : <></>}
        </div>
}
export default EmployeeData;