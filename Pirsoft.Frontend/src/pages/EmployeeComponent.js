import ProfilePicture from "../components/employee/fields/ProfilePicture";

import SkillsList from "../components/employee/fields/SkillsList";
import {useEffect, useState} from "react";
import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import ReusableButton from "../components/base/ReusableButton";
import FunctionForResize from "../components/base/FunctionForResize";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import FirstName from "../components/employee/fields/FirstName";
import LastName from "../components/employee/fields/LastName";
import Email from "../components/employee/fields/Email";
import Password from "../components/employee/fields/Password";
import {FiSettings} from "react-icons/fi";
import BankAccountNumber from "../components/employee/fields/BankAccountNumber";
import DateOfBirth from "../components/employee/fields/DateOfBirth";
import Pesel from "../components/employee/fields/Pesel";
import GrossSalary from "../components/employee/fields/GrossSalary";
import PositionType from "../components/employee/fields/PositionType";
import EmploymentStartDate from "../components/employee/fields/EmploymentStartDate";
function EmployeeComponent({id, mode, employee, letRefresh}){
    //możliwe rodzaje parametru mode:
    // create - do tworzenia
    // edit - osoba przeglądająca konto lub
    //        uprawniona do edycji kont lub właściciel konta

    const navigate = useNavigate()

    // na razie od ręki ustationy przywilej i zapisany w sesji
    //podział na widoczność pól według roli konta plus podział na możliwość edycji.
    //tylko konto zalogowane które jest PRACOWNIKIEM HR, MOŻE EDYTOWAĆ DANE, albo właściciel konta. W innym przypadku

    //uprawnienia edycji oraz przeglądania danych konta pracownika według zalogowanego konta
    sessionStorage.setItem("PRIVILEDGE", 'UNAUTHORIED')

    //purpose of it is to show or hide skill picker and changer
    const [employeeDataShow, setEmployeeDataShow] = useState(true);
    //const [employeeData, setEmployeeData] = useState(useSelector(selectId(id)));

    //employee data
    const[firstName, setFirstName] = useState(employee !== undefined && employee !== null ? employee.firstname : '');
    const[lastName, setLastName] = useState(employee !== undefined && employee !== null? employee.lastname : '');
    const[email, setEmail] = useState(employee !== undefined && employee !== null ? employee.email : '');
    const[password, setPassword] = useState(employee !== undefined && employee !== null ? employee.password : '');
    const[bank, setBank] = useState(employee !== undefined && employee !== null ? employee.bank : '');
    const[birth, setBirth] = useState(employee !== undefined && employee !== null ? employee.birth : '');
    const[pesel, setPesel] = useState(employee !== undefined && employee !== null ? employee.pesel : '');
    const[salary, setSalary] = useState(employee !== undefined && employee !== null ? employee.salary : '');
    const[position, setPosition] = useState(employee !== undefined && employee !== null ? employee.position : '');
    const[start, setStart] = useState(employee !== undefined && employee !== null ? employee.start : '');

    //rest of employee data
    const [avatarData, setAvatarData] = useState(employee !== undefined && employee !== null ? employee.avatar : undefined);
    const [skillsData, setSkillsData] = useState(employee !== undefined && employee !== null ? employee.skills : []);

    useEffect(() => {
        console.log("data changed")
        if(employee !== undefined && employee !== null && id !== '-1'){
            console.log("w srodku")
            console.log(employee);
            setFirstName(employee.firstname);
            setLastName(employee.lastname);
            setEmail(employee.email);
            setPassword(employee.password);
            setBank(employee.bank);
            setBirth(employee.birth);
            setPesel(employee.pesel);
            setSalary(employee.salary);
            setPosition(employee.position);
            setStart(employee.start);

            setAvatarData(employee.avatar);
            setSkillsData(employee.skills);

        }
        else {
            console.log("w minusach");
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setBank('');
            setBirth('');
            setPesel('');
            setSalary('');
            setPosition('');
            setStart('');

            setAvatarData(undefined);
            setSkillsData([]);
        }
        setEmployeeDataShow(true)


        console.log("refresh przed")
        console.log(letRefresh)
        if(letRefresh === 1){
            window.location.reload(true)
            letRefresh = 0
        }
        console.log("refresh po")
        console.log(letRefresh)

    }, [id]);

    const saveEmployee = () => {
        console.log(
            "id:"+id+
            "\n employee data: \n" +
            firstName + ", \n" +
            lastName + ", \n" +
            email + ", \n" +
            password + ", \n" +
            bank + ", \n" +
            birth + ", \n" +
            pesel + ", \n" +
            salary + ", \n" +
            position + ", \n" +
            start + " \n \n" +
            " skills: \n" +
            skillsData +
            " \n avatar: " //+
            //avatarData
        )
    }

    const saveSkills = () => {
        const element = document.getElementById('skills-edit');
        const elements = element.getElementsByTagName("div");

        let skillsList = [];
        try {
            for(const ele in elements){
                const p = elements[ele].getElementsByTagName("p")[0];
                const input = elements[ele].getElementsByTagName("input")[0];

                if(p !== undefined && input !== undefined && input.checked){
                    skillsList.push(p.textContent+"");
                }
            }
        }catch (e) {
        }
        const myObjStr = JSON.stringify(skillsList);
        //console.log(myObjStr);

        setSkillsData(skillsList)
        setEmployeeDataShow(true)
    }

    //component for showing skills under an avatar
    const [skillsComponent, setSkillsComponent] = useState(<></>);

    //changing skills from change skill view
    const setSkills = () => {
        setSkillsComponent(<></>)
        const allSkills = ["GROOVY", "C++", "SQL", "WORD", "EXCEL","PHP", "JAVA", "C#"]
        let detailsOne = []

        for(const availableSkill in allSkills){
            let hasSkill = false;

            if(mode === "edit") {
                for (const property in skillsData) {
                    if (allSkills[availableSkill].includes(skillsData[property])) {
                        hasSkill = true;
                    }
                }
            }
            detailsOne.push(
                <div key={"skill"+availableSkill} className={"grid grid-cols-2 gap-4 p-4 h-9"}>
                    <p>{allSkills[availableSkill]}</p>
                    <input className={"bg-weekend checked:bg-weekend"} type={"checkbox"} defaultChecked={hasSkill}/>
                </div>
            );
        }
        setSkillsComponent(detailsOne)
        setEmployeeDataShow(false);
    }

    //for resizing main component
    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("employee-info", {setWantedHeightForList});
        FunctionForResize("skills", {setWantedHeightForList});
    }, []);

    return(
        <>
        {employeeDataShow ?
        <div id={"employee-info"}
             className={"flex flex-col bg-green-menu rounded-md border-2 border-b-workday text-workday overflow-y-auto"}
             style={{ height: wantedHeightsForList } }>
            <div className={"grow flex flex-row"}>
                <div className={"basis-4/5 grow p-4 flex flex-col justify-around"}>
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

                <div className={"flex flex-col p-4"}>
                    <ProfilePicture picture={avatarData}/>
                    <SkillsList skillList={skillsData} />
                    <div className={"flex justify-center"}>
                        {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                            <ReusableButton value={employee !== undefined &&
                                employee !== null ? "EDYTUJ" : "WYBIERZ"}
                                            onClick={ () => setSkills()}/>
                            :
                            <></>}
                    </div>
                </div>
            </div>
            {mode !== 'create' &&
                sessionStorage.getItem('USER') !== id ?
                <div className={"grow-0 p-4 flex flex-row justify-start"}>
                    <button onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />Wstecz</button>
                </div>
                : <></>
            }
            <div className={"grow-0 p-4 flex flex-row justify-around"}>

                {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                    <>
                        {mode === 'edit' ?
                            <>
                                <ReusableButton value={"USUŃ KONTO"} link={""} />
                                <ReusableButton value={"ZAPISZ ZMIANY"} onClick={() => saveEmployee()}/>
                                <ReusableButton value={"WYSTAW WNIOSEK"} link={""} />
                            </>
                            : <></>
                        }
                        {mode === 'create' ?
                            <ReusableButton value={"UTWÓRZ"} onClick={() => saveEmployee()}/>
                            : <></>
                        }
                    </>
                    : <></>}
            </div>
        </div>
        :
        <div id={"skills"}
             className={"p-4 grid grid-cols-1 bg-blue-menu rounded-md border-2 border-b-workday text-workday overflow-y-auto text-center" +
                 ""}
             style={{ height: wantedHeightsForList } }>

            <div id={"skills-edit"} className={"flex flex-col justify-evenly"}>
                <div>UMIEJĘTNOŚCI</div>
                {skillsComponent}
                <div className={"p-4 flex flex-row justify-evenly"}>
                    <ReusableButton value={"ZATWIERDŹ"} onClick={ () => saveSkills()}/>
                    <ReusableButton value={"ZAMKNIJ"} onClick={() => setEmployeeDataShow(true)}/>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default EmployeeComponent;