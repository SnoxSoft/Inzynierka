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

const EmployeeData = ({employee}) => {
        return <div className={"basis-4/5 grow p-4 flex flex-col justify-around"}>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> IMIĘ </label>
                        <FirstName value={employee.firstname}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> NAZWISKO </label>
                        <LastName value={employee.lastname}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> E-MAIL </label>
                        <Email value={employee.email}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> HASŁO </label>
                        <div className={"flex flex-row justify-end gap-4 grow"}>

                                <Password value={employee.password}/>
                                <button className={""}><FiSettings/></button>
                        </div>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> KONTO BANKOWE </label>
                        <BankAccountNumber value={employee.bank}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> DATA URODZENIA </label>
                        <DateOfBirth value={employee.birth}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> PESEL </label>
                        <Pesel value={employee.pesel}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> WYNAGRODZENIE BRUTTO </label>
                        <GrossSalary value={employee.salary}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> STANOWISKO </label>
                        <PositionType value={employee.position}/>
                </div>

                <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> ROZPOCZĘCIE PRACY </label>
                        <EmploymentStartDate value={employee.start}/>
                </div>
        </div>
}
export default EmployeeData;