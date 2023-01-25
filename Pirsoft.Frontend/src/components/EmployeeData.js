import FirstName from "./employee/FirstName";
import LastName from "./employee/LastName";
import Email from "./employee/Email";
import Password from "./employee/Password";
import {FiSettings} from "react-icons/fi";
import BankAccountNumber from "./employee/BankAccountNumber";
import DateOfBirth from "./employee/DateOfBirth";
import Pesel from "./employee/Pesel";
import GrossSalary from "./employee/GrossSalary";
import PositionType from "./employee/PositionType";
import EmploymentStartDate from "./employee/EmploymentStartDate";

const EmployeeData = ({employee}) => {
        return <>
                <div className={"flex flex-row space-x-4 bg-blue-700 w-fit"}><label className={"block"}> IMIĘ </label>
                </div>
                <div className={"w-fit"}><FirstName value={employee.firstname}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> NAZWISKO </label></div>
                <div className={"w-fit"}><LastName value={employee.lastname}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> E-MAIL </label></div>
                <div className={"w-fit"}><Email value={employee.email}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> HASŁO </label></div>
                <div className={"w-fit"}>
                        <div className={"flex flex-row space-x-4"}><Password value={employee.password}/>
                                <button className={""}>
                                        <FiSettings/></button>
                        </div>
                </div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> KONTO BANKOWE </label></div>
                <div className={"w-fit"}><BankAccountNumber value={employee.bank}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> DATA URODZENIA </label></div>
                <div className={"w-fit"}><DateOfBirth value={employee.birth}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> PESEL </label></div>
                <div className={"w-fit"}><Pesel value={employee.pesel}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> WYNAGRODZENIE BRUTTO </label>
                </div>
                <div className={"w-fit"}><GrossSalary value={employee.salary}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> STANOWISKO </label></div>
                <div className={"w-fit"}><PositionType value={employee.position}/></div>

                <div className={"flex flex-row space-x-4"}><label className={"block"}> ROZPOCZĘCIE PRACY </label></div>
                <div className={"w-fit"}><EmploymentStartDate value={employee.start}/></div>
        </>
}
export default EmployeeData;