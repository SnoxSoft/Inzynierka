import ProfilePicture from "../../components/employee/fields/ProfilePicture";

import SkillsList from "../../components/employee/fields/SkillsList";
import {useEffect, useState} from "react";
import React from "react";
import {useNavigate} from "react-router-dom";
import ReusableButton from "../../components/base/ReusableButton";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import FirstName from "../../components/employee/fields/FirstName";
import LastName from "../../components/employee/fields/LastName";
import Email from "../../components/employee/fields/Email";
import Password from "../../components/employee/fields/Password";
import {FiSettings} from "react-icons/fi";
import BankAccountNumber from "../../components/employee/fields/BankAccountNumber";
import DateOfBirth from "../../components/employee/fields/DateOfBirth";
import Pesel from "../../components/employee/fields/Pesel";
import GrossSalary from "../../components/employee/fields/GrossSalary";
import PositionType from "../../components/employee/fields/PositionType";
import EmploymentStartDate from "../../components/employee/fields/EmploymentStartDate";
import LoggingPassword from "../../components/logging/LoggingPassword";
import Contract from "../../components/employee/fields/Contract";
import AddEmployeeAnAbsence from "../AddEmployeeAnAbsence";
import {
    alertNewPasswordsAreIncompatible,
    alertOldPasswordIsIncompatible,
    alertPutNewPasswords,
    firstnameLabel,
    headerPasswordChange,
    labelApprove,
    labelBack, labelBankAccount, labelBirthDate, labelChange,
    labelClose, labelContractType,
    labelCreate,
    labelDelete,
    labelEdit,
    labelEmail,
    labelGiveNewPassword,
    labelGiveNewPasswordAgain,
    labelGiveOldPassword,
    labelPassword, labelPESEL,
    labelPick,
    labelPosition,
    labelRequest, labelSalary,
    labelSave,
    labelStartDate,
    lastnameLabel, pageNameEmployeeData, pageNameEmployeeRegister, pageNameEmployeeView, serverIp,
    skillsLabel
} from "../../GlobalAppConfig";
import {endpointGetAllSkills, endpointGetAvailableQuartets} from "../../EndpointAppConfig";
import {HiPlus} from "react-icons/hi";
function EmployeeComponent({id, mode, employee}){
    if(id === '-1'){
        document.title = pageNameEmployeeRegister;
    }
    else if(id === sessionStorage.getItem('USER')){
        document.title = pageNameEmployeeData;
    }
    else document.title = pageNameEmployeeView;

    // Możliwe rodzaje parametru mode:
    // create - do tworzenia
    // edit - osoba przeglądająca konto lub
    //        uprawniona do edycji kont lub właściciel konta

    const navigate = useNavigate()

    // Na razie od ręki ustationy przywilej i zapisany w sesji
    // Podział na widoczność pól według roli konta plus podział na możliwość edycji.
    // Tylko konto zalogowane które jest PRACOWNIKIEM HR, MOŻE EDYTOWAĆ DANE, albo właściciel konta. W innym przypadku

    // Uprawnienia edycji oraz przeglądania danych konta pracownika według zalogowanego konta
    sessionStorage.setItem("PRIVILEDGE", 'UNAUTHORIED')

    // Do pokazania danych pracownika
    const [employeeDataShow, setEmployeeDataShow] = useState(true);
    const [showSkillsFrame, setShowSkillsFrame] = useState(false);
    const [showPasswordChangeFrame, setShowPasswordChangeFrame] = useState(false);

    // Dane pracownika
    const[firstName, setFirstName] = useState(employee !== undefined && employee !== null ? employee.firstname : '');
    const[lastName, setLastName] = useState(employee !== undefined && employee !== null? employee.lastname : '');
    const[email, setEmail] = useState(employee !== undefined && employee !== null ? employee.email : '');
    const[password, setPassword] = useState(employee !== undefined && employee !== null ? employee.password : '');
    const[bank, setBank] = useState(employee !== undefined && employee !== null ? employee.bank : '');
    const[birth, setBirth] = useState(employee !== undefined && employee !== null ? employee.birth : '');
    const[pesel, setPesel] = useState(employee !== undefined && employee !== null ? employee.pesel : '');
    const[salary, setSalary] = useState(employee !== undefined && employee !== null ? employee.salary : '');
    const[contract, setContract] = useState(employee !== undefined && employee !== null ? employee.contract : '');
    const[position, setPosition] = useState(employee !== undefined && employee !== null ? employee.position : '');
    const[start, setStart] = useState(employee !== undefined && employee !== null ? employee.start : '');

    // Reszta danych pracownika
    const [avatarData, setAvatarData] = useState(employee !== undefined && employee !== null ? employee.avatar : undefined);
    const [skillsData, setSkillsData] = useState(employee !== undefined && employee !== null ? employee.skills : []);

    useEffect(() => {
        if(employee !== undefined && employee !== null && id !== '-1'){
            setFirstName(employee.firstname);
            setLastName(employee.lastname);
            setEmail(employee.email);
            setPassword(employee.password);
            setBank(employee.bank);
            setBirth(employee.birth);
            setPesel(employee.pesel);
            setSalary(employee.salary);
            setContract(employee.contract);
            setPosition(employee.position);
            setStart(employee.start);

            setAvatarData(employee.avatar);
            setSkillsData(employee.skills);

        }
        else {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setBank('');
            setBirth('');
            setPesel('');
            setSalary('');
            setContract('');
            setPosition('');
            setStart('');

            setAvatarData(undefined);
            setSkillsData([]);
        }
        setEmployeeDataShow(true)

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
            contract + ", \n" +
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

        setSkillsData(skillsList)
        setEmployeeDataShow(true)
        setShowSkillsFrame(false)
    }

    // Komponent do pokazywania umiejętności pod awatarem
    const [skillsComponent, setSkillsComponent] = useState(<></>);

    const setNewPasswordFunction = () => {
        setEmployeeDataShow(false);
        setShowPasswordChangeFrame(true)
    }

    async function loadAllSkills(){
        let allSkillsLoad = []
        const response = await fetch(serverIp + "/" + endpointGetAllSkills)
        const skills = await response.json();

        skills.forEach((s) => {
            allSkillsLoad.push(s)
        })

        return allSkillsLoad;
    }

    // Zmiana umiejętności
    const setSkills = async () => {
        setSkillsComponent(<></>)

        // Ładowanie z endpointu
        let allSkills = await loadAllSkills();

        let detailsOne = []

        for (const availableSkill in allSkills) {
            let hasSkill = false;

            if (mode === "edit") {
                for (const property in skillsData) {
                    if (allSkills[availableSkill].includes(skillsData[property])) {
                        hasSkill = true;
                    }
                }
            }
            detailsOne.push(
                <>
                <div key={"skill" + availableSkill} className={"grid grid-cols-2 gap-4 p-4 h-9 content-center"}>
                    <p>{allSkills[availableSkill]}</p>
                    <input className={"bg-weekend checked:bg-weekend"} type={"checkbox"} defaultChecked={hasSkill}/>
                </div>
                    <hr />
                </>
            );
        }

        setSkillsComponent(detailsOne)
        setEmployeeDataShow(false);
        setShowSkillsFrame(true)
    }

    // Zmienna która wyłącza z użytku, dla podstawowego użycia, dane pracownika
    let disableData = sessionStorage.getItem('USER') !== id && mode !== 'create'


    // Poniżej znajdą się wszystkie dane i funkcje dla okienka zmiany hasła w danych pracownika
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newRepeatPassword, setNewRepeatPassword] = useState();

    const [wrongOldPasswords, setWrongOldPassword] = useState(false)
    const [wrongNewPasswords, setWrongNewPassword] = useState(false)
    const [notTheSame, setNotTheSame] = useState(false)

    const changePassword = () => {
        if(oldPassword !== undefined && oldPassword.toString().length > 0 && oldPassword.toString() === password) {
            if (newPassword !== undefined && newRepeatPassword !== undefined &&
                newPassword.toString().length > 0 && newRepeatPassword.toString().length > 0) {

                // Tutaj pomyslimy jakie wartosci sprawdzic
                if (newPassword.toString() === newRepeatPassword.toString()) {
                    setPassword(newPassword)

                    setOldPassword('')
                    setNewPassword('')
                    setNewRepeatPassword('')

                    setEmployeeDataShow(true);
                    setShowPasswordChangeFrame(false)
                } else {
                    setNotTheSame(true);
                    setTimeout(() => {
                        setNotTheSame(false)
                    }, 3000);
                }
            } else {
                setWrongNewPassword(true);
                setTimeout(() => {
                    setWrongNewPassword(false)
                }, 3000);
            }
        }
        else {
            setWrongOldPassword(true);
            setTimeout(() => {
                setWrongOldPassword(false)
            }, 3000);
        }
    }

    const [showAddEmployeeAnAbsence, setShowAddEmployeeAnAbsence] = useState(false)

    return(
        <>
        {employeeDataShow ?
        <div id={"employee-info"}
             className={"every-page-on-scroll flex flex-col text-workday overflow-x-auto hover:cursor-default"}
             style={{minWidth:800} }>
            <div className={"grow flex flex-row"}>
                <div className={"basis-4/5 grow p-4 flex flex-col justify-around"}>
                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {firstnameLabel} </label>
                        <FirstName value={firstName} onChange={setFirstName} disableChange={disableData}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {lastnameLabel} </label>
                        <LastName value={lastName} onChange={setLastName} disableChange={disableData}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelEmail} </label>
                        <Email value={email} onChange={setEmail} disableChange={mode !== 'create'}/>
                    </div>

                    {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ? <>
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelPassword} </label>
                            <div className={"flex flex-row justify-end gap-4 grow"}>
                                <Password value={password} onChange={setPassword}
                                          showHide={sessionStorage.getItem('USER') === id || mode === 'create'}
                                          disableChange={mode !== 'create'}/>
                                {sessionStorage.getItem('USER') === id ?
                                    <button className={""} onClick={() => setNewPasswordFunction()}><FiSettings/></button> :
                                    <></>
                                }
                            </div>
                        </div>


                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelBankAccount} </label>
                            <BankAccountNumber value={bank} onChange={setBank} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelBirthDate} </label>
                            <DateOfBirth value={birth} onChange={setBirth} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelPESEL} </label>
                            <Pesel value={pesel} onChange={setPesel} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelSalary} </label>
                            <GrossSalary value={salary} onChange={setSalary} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelContractType} </label>
                            <Contract value={contract} onChange={setContract} disableChange={disableData}/>
                        </div>

                    </> : <></>}
                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelPosition} </label>
                        <PositionType value={position} onChange={setPosition} disableChange={disableData}/>
                    </div>

                    {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelStartDate} </label>
                            <EmploymentStartDate value={start} onChange={setStart} disableChange={disableData}/>
                        </div>
                        : <></>}
                </div>

                <div className={"flex flex-col p-4"}>
                    <ProfilePicture picture={avatarData}/>
                    <SkillsList skillList={skillsData} />
                    <div className={"flex justify-center"}>
                        {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' && sessionStorage.getItem('USER') === id || mode === 'create' ?
                            <ReusableButton value={employee !== undefined &&
                                employee !== null ? labelEdit : labelPick}
                                            onClick={ () => setSkills()}/>
                            :
                            <></>}
                    </div>
                </div>
            </div>
            {mode !== 'create' &&
                sessionStorage.getItem('USER') !== id ?
                <div className={"grow-0 p-4 flex flex-row justify-start"}>
                    <button onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />{labelBack}</button>
                </div>
                : <></>
            }
            <div className={"grow-0 p-4 flex flex-row justify-around"}>

                {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                    <>
                        {mode === 'edit' && sessionStorage.getItem('USER') === id ?
                            <>
                                <ReusableButton value={labelDelete} link={""} />
                                <ReusableButton value={labelSave} onClick={() => saveEmployee()}/>
                                <ReusableButton value={labelRequest} onClick={() => {
                                    setShowAddEmployeeAnAbsence(true);
                                    setEmployeeDataShow(false);
                                }}/>
                            </>
                            : <></>
                        }
                        {mode === 'create' ?
                            <ReusableButton value={labelCreate} onClick={() => saveEmployee()}/>
                            : <></>
                        }
                    </>
                    : <></>}
            </div>
        </div>
        :
            <>
                {showSkillsFrame ?
                    <div id={"skills"}
                         className={"every-page-on-scroll grid grid-cols-1 bg-blue-menu text-workday text-center hover:cursor-default"}
                         style={{minWidth: 800}}>

                        <div id={"skills-edit"} className={"flex flex-col justify-evenly"}>
                            <div>{skillsLabel}</div>
                            {skillsComponent}
                            <div className={"p-4 flex flex-row justify-evenly"}>
                                <ReusableButton value={labelApprove} onClick={() => saveSkills()}/>
                                <ReusableButton value={labelClose} onClick={() => {setEmployeeDataShow(true); setShowSkillsFrame(false)}}/>
                            </div>
                        </div>
                    </div> :
                    <></>}

                {showPasswordChangeFrame ?
                <div id={"password"}
                     className={"every-page-on-scroll bg-blue-menu hover:cursor-default"}
                     style={{minWidth: 800}}>
                    <div className={"flex flex-col text-workday m-4 text-center gap-4"}>

                        <div>
                            <p>{headerPasswordChange}</p>
                        </div>
                        <br/><br/>

                        <div className={"flex flex-col gap-4"}>
                            <label>{labelGiveOldPassword}</label>
                            <LoggingPassword value={oldPassword} onChange={setOldPassword} showHide={false}/>
                        </div>
                        <br/>

                        <div className={"flex flex-col gap-4"}>
                            <label>{labelGiveNewPassword}</label>
                            <div className={"flex flex-col gap-4 self-center"}>
                                <LoggingPassword value={newPassword} onChange={setNewPassword} showHide={false}/>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <label>{labelGiveNewPasswordAgain}</label>
                            <div className={"flex flex-col gap-4 self-center"}>
                                <LoggingPassword value={newRepeatPassword} onChange={setNewRepeatPassword} showHide={false}/>
                            </div>
                        </div>

                        <br/><br/>

                        <div className={"flex flex-row justify-evenly"}>
                            <div className={"self-center"}>
                                <ReusableButton value={labelClose}
                                    onClick={() => {
                                        setOldPassword('');
                                        setNewPassword('');
                                        setNewRepeatPassword('');
                                        setEmployeeDataShow(true);
                                        setShowPasswordChangeFrame(false)}}/>
                            </div>
                            <div className={"bg-blue-menu self-center"}>
                                <ReusableButton value={labelApprove} onClick={() => changePassword()}/>
                            </div>
                        </div>

                    </div>
                    <div className={"flex flex-col items-center text-workday"}>
                        {wrongNewPasswords ?
                            <p className={"bg-red-700 rounded-md font-bold"}>{alertPutNewPasswords}</p> :
                            <></>
                        }
                        {wrongOldPasswords ?
                            <p className={"bg-red-700 rounded-md font-bold"}>{alertOldPasswordIsIncompatible}</p> :
                            <></>
                        }
                        {notTheSame ?
                            <p className={"bg-red-700 rounded-md font-bold"}>{alertNewPasswordsAreIncompatible}</p> :
                            <></>
                        }
                    </div>
                </div>
                :
                <></>}
                {showAddEmployeeAnAbsence ?
                    <AddEmployeeAnAbsence setShowAddEmployeeAnAbsence={setShowAddEmployeeAnAbsence}
                                          setEmployeeDataShow={setEmployeeDataShow}
                        forEmployee={employee}/> :
                    <></>
                }
            </>
        }
        </>
    )
}

export default EmployeeComponent;