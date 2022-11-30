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


function Employee(){

    const noPerson = useSelector(selectId("W3IbXluGxG1mnV5c5jzAL"))

    const[avatar, setAvatar] = useState(noPerson?.avatar || '')
    const[skills, setSkills] = useState(noPerson?.skills || '')

    return(
        <div className={"flex flex-col"}>
            <div className={"flex flex-row"}>
                <div className={"basis-4/6 bg-amber-600 space-y-4 p-2"}>
                    <div className={"flex flex-row space-x-4 bg-blue-700 w-fit"}><label className={"block"}> IMIĘ </label><FirstName /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> NAZWISKO </label><LastName /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> E-MAIL </label><Email /></div>
                    <div className={"flex flex-row space-x-4"}>
                        <div className={"flex flex-row space-x-4"}><label className={"block"}> HASŁO </label></div>
                        <div className={"flex flex-row space-x-4"}><Password /> <button className={""}><FiSettings /></button>
                        </div>
                    </div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> KONTO BANKOWE </label><BankAccountNumber /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> DATA URODZENIA </label><DateOfBirth /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> PESEL </label><Pesel /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> WYNAGRODZENIE BRUTTO </label><GrossSalary /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> STANOWISKO </label><PositionType /></div>
                    <div className={"flex flex-row space-x-4"}><label className={"block"}> ROZPOCZĘCIE PRACY </label><EmploymentStartDate /></div>
                </div>
                <div className={"container mx-auto text-center bg-cyan-400 basis-2/6"}>
                    <ProfilePicture value={avatar}/>
                    <SkillsList noPerson={[noPerson]}/>
                </div>
            </div>
            <div className={"flex flex-row space-x-10 h"}>
                <button className={"flex-none basis-1/4 border-solid border-2 border-gray-600"}>USUŃ KONTO</button>
                <button className={"border-solid basis-2/4 border-2 border-gray-600"}>ZAPISZ ZMIANY</button>
                <button className={"border-solid basis-1/4 border-2 border-gray-600"}>WYSTAW WNIOSEK</button>
            </div>
        </div>
    );
}

export default Employee;