import FirstName from "../components/employee/FirstName";
import LastName from "../components/employee/LastName";
import Email from "../components/employee/Email";
import Password from "../components/employee/Password";
import BankAccountNumber from "../components/employee/BankAccountNumber";
import DateOfBirth from "../components/employee/DateOfBirth";
import Pesel from "../components/employee/Pesel";
import GrossSalary from "../components/employee/GrossSalary";
import PositionType from "../components/employee/PositionType";
import EmploymentStartDate from "../components/employee/EmploymentStartDate";
import ProfilePicture from "../components/employee/ProfilePicture";
import {FiSettings} from "react-icons/fi";
import {useSelector} from "react-redux";
import {selectId} from "../store/reducer";
import SkillsList from "../components/employee/SkillsList";
import {useState} from "react";
import {useParams} from "react-router-dom";


function Employee(){

    const {id} = useParams();
    const employee = useSelector(selectId(id))

    const[avatar, setAvatar] = useState(employee?.avatar || '')

    return(
        <div className={"flex flex-col w-full"}>
            <div className={"flex flex-row h-full"}>
                <div className={"basis-4/6 bg-amber-600 grid grid-cols-2 gap-y-4 p-10 "}>
                    <div className={"flex flex-row space-x-4 bg-blue-700 w-fit"}><label className={"block"}> IMIĘ </label></div>
                    <div className={"w-fit"}><FirstName value={employee.firstname}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> NAZWISKO </label></div>
                    <div className={"w-fit"}><LastName value={employee.lastname}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> E-MAIL </label></div>
                    <div className={"w-fit"}><Email value={employee.email}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> HASŁO </label></div>
                    <div className={"w-fit"}>
                        <div className={"flex flex-row space-x-4"}><Password value={employee.password}/> <button className={""}>
                            <FiSettings /></button>
                        </div>
                    </div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> KONTO BANKOWE </label></div>
                    <div className={"w-fit"}><BankAccountNumber value={employee.bank}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> DATA URODZENIA </label></div>
                    <div className={"w-fit"}><DateOfBirth value={employee.birth}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> PESEL </label></div>
                    <div className={"w-fit"}><Pesel value={employee.pesel}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> WYNAGRODZENIE BRUTTO </label></div>
                    <div className={"w-fit"}><GrossSalary value={employee.salary}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> STANOWISKO </label></div>
                    <div className={"w-fit"}><PositionType value={employee.position}/></div>

                    <div className={"flex flex-row space-x-4"}><label className={"block"}> ROZPOCZĘCIE PRACY </label></div>
                    <div className={"w-fit"}><EmploymentStartDate value={employee.start}/></div>

                </div>
                <div className={"container mx-auto text-center bg-cyan-400 basis-2/6"}>
                    <div className={"justify-center p-2"}><ProfilePicture value={avatar}/></div>
                    <div><SkillsList noPerson={[employee]}/>
                    <button className={"border-solid border-2  border-gray-600 disabled m-5"}>EDYTUJ</button></div>
                </div>
            </div>
            <div className={"flex flex-row space-x-10 bg-cyan-400 p-5"}>
                <button className={"flex-none basis-1/4 border-solid border-2 border-gray-600"}>USUŃ KONTO</button>
                <button className={"border-solid basis-2/4 border-2 border-gray-600"}>ZAPISZ ZMIANY</button>
                <button className={"border-solid basis-1/4 border-2 border-gray-600"}>WYSTAW WNIOSEK</button>
            </div>
        </div>
    );
}

export default Employee;