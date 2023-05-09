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
import BankAccountNumber from "../../components/employee/fields/BankAccountNumber";
import DateOfBirth from "../../components/employee/fields/DateOfBirth";
import Pesel from "../../components/employee/fields/Pesel";
import GrossSalary from "../../components/employee/fields/GrossSalary";
import EmploymentStartDate from "../../components/employee/fields/EmploymentStartDate";
import Contract from "../../components/employee/fields/Contract";
import {
    alertNewPasswordsAreIncompatible,
    alertOldPasswordIsIncompatible,
    alertPutNewPasswords,
    firstnameLabel,
    headerPasswordChange,
    labelApprove,
    labelBack,
    labelBankAccount,
    labelBirthDate,
    labelChange,
    labelChangePassword,
    labelClose,
    labelContractType,
    labelCreate,
    labelDelete,
    labelEdit,
    labelEmail,
    labelGiveNewPassword,
    labelGiveNewPasswordAgain,
    labelGiveOldPassword,
    labelPESEL,
    labelPick,
    labelPosition,
    labelPositionLevel,
    labelRequest,
    labelSalary,
    labelSave,
    labelStartDate,
    lastnameLabel,
    pageNameEmployeeData,
    pageNameEmployeeRegister,
    pageNameEmployeeView,
    serverIp,
    labelTeam,
    legendLabel,
    alertPasswordChanged,
    alertUnexpectedError,
    alertWrongFirstName,
    alertWrongLastName,
    alertWrongBankAccount,
    alertWrongBirthDate,
    alertWrongPESEL,
    alertWrongSalary,
    alertWrongContract,
    alertWrongPosition,
    alertWrongPositionLevel,
    alertWrongTeam,
    alertWrongStartDate,
    alertWrongEmail,
    alertWrongAddressEmail
} from "../../GlobalAppConfig";
import {endpointGetAllSkills} from "../../EndpointAppConfig";
import PositionsList from "../../components/employees/search/fields/PositionsList";
import PositionLevel from "../../components/employee/fields/PositionLevel";
import SkillPicker from "../SkillPicker";
import EditPasswordWindow from "./EditPasswordWindow";
import TeamsList from "../../components/employees/search/fields/TeamsList";
import {
    fetchDeleteEmployee,
    fetchGetAllSkillsAndSort,
    fetchPostCreateEmployee,
    fetchPutEditEmployee
} from "../../DataFetcher";
import Legend from "../../components/legend/Legend";
import {Popup} from "semantic-ui-react";
import grossSalary from "../../components/employee/fields/GrossSalary";
import RequestWindow from "../RequestWindow";
function EmployeeComponent({id, mode, employee, teams, contracts, positions, positionsLevels}){
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

    // Zmienna która wyłącza z użytku, dla podstawowego użycia, dane pracownika
    let disableData = sessionStorage.getItem('USER') !== id && mode !== 'create'

    // Do pokazania/ukrycia danych pracownika
    const [employeeDataShow, setEmployeeDataShow] = useState(true);
    // Do pokazania/ukrycia okna do wyboru umiejętności
    const [showSkillsFrame, setShowSkillsFrame] = useState(false);
    // Do pokazania/ukrycia okna do zmiany hasła
    const [showPasswordChangeFrame, setShowPasswordChangeFrame] = useState(false);
    // Do pokazania/Ukrycia okna do wystawiania wniosku urlopowego
    const [showAddEmployeeAnAbsence, setShowAddEmployeeAnAbsence] = useState(false)


    // Dane pracownika
    const[firstName, setFirstName] = useState(employee !== undefined && employee !== null ? employee.first_name : '');
    const[lastName, setLastName] = useState(employee !== undefined && employee !== null? employee.last_name : '');
    const[email, setEmail] = useState(employee !== undefined && employee !== null ? employee.email_address : '');
    const[bank, setBank] = useState(employee !== undefined && employee !== null ? employee.bank_account_number : '');
    const[birth, setBirth] = useState(employee !== undefined && employee !== null ? employee.birth_date.substring(0, 10) : '');
    const[pesel, setPesel] = useState(employee !== undefined && employee !== null ? employee.pesel : '');
    const[salary, setSalary] = useState(employee !== undefined && employee !== null ? employee.salary_gross : '');
    const[department, setDepartment] = useState(employee !== undefined && employee !== null ? employee.employee_department_id : '');
    const[contract, setContract] = useState(employee !== undefined && employee !== null ? employee.employee_contract_type_id : '');
    const[position, setPosition] = useState(employee !== undefined && employee !== null ? employee.employee_company_role_id : '');
    const[positionLevel, setPositionLevel] = useState(employee !== undefined && employee !== null ? employee.employee_seniority_level_id : '');
    const[start, setStart] = useState(employee !== undefined && employee !== null ? employee.employment_start_date.substring(0, 10) : '');

    // Reszta danych pracownika
    const [avatarData, setAvatarData] = useState(employee !== undefined && employee !== null ? undefined : undefined); //employee.avatar
    const [skillsData, setSkillsData] = useState(employee !== undefined && employee !== null ? employee.skills : []);

    useEffect(() => {
        if(employee !== undefined && employee !== null && id !== '-1'){
            setFirstName(employee.first_name);
            setLastName(employee.last_name);
            setEmail(employee.email_address);
            setBank(employee.bank_account_number);
            setBirth(employee.birth_date.substring(0, 10));
            setPesel(employee.pesel);
            setSalary(employee.salary_gross);
            setDepartment(employee.employee_department_id);
            setContract(employee.employee_contract_type_id);
            setPosition(employee.employee_company_role_id);
            setPositionLevel(employee.employee_seniority_level_id);
            setStart(employee.employment_start_date.substring(0, 10));

            setAvatarData(employee.avatar);
            setSkillsData(employee.skills);
        }
        else {
            setFirstName('');
            setLastName('');
            setEmail('');
            setBank('');
            setBirth('');
            setPesel('');
            setSalary('');
            setDepartment('');
            setContract('');
            setPosition('');
            setPositionLevel('');
            setStart('');

            setAvatarData(undefined);
            setSkillsData([]);
        }
        setEmployeeDataShow(true)

    }, [id]);

    useEffect(() => {
        if(employee !== undefined && employee !== null && id !== '-1'){
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setBank(bank);
            setBirth(birth);
            setPesel(pesel);
            setSalary(salary);
            setDepartment(department)
            setContract(contract);
            setPosition(position);
            setPositionLevel(positionLevel);
            setStart(start);

            setAvatarData(avatarData);
            setSkillsData(skillsData);
        }

    }, [employeeDataShow]);


    const [showPopupWithProblems, setShowPopupWithProblems] = useState(false);
    const [alerts, setAlerts] = useState(<></>)

    const buildPopup = () => {
        return showPopupWithProblems ?
                <div className={"flex flex-col items-center text-workday gap-2 p-2"}>
                    {alerts}
                </div>:
            <></>
    }
    function deleteEmployee(){
        fetchDeleteEmployee(id)
            .then(r => console.log(r))
    }


    const saveEmployee = () => {
        setShowPopupWithProblems(false)
        // Sprawdzenie błędów
        setAlerts(<></>)
        let alerts = []
        if(firstName.toString().trim().length === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongFirstName}
                </p>
            )
        }
        if(lastName.toString().trim().length === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongLastName}
                </p>
            )
        }
        if(email.toString().trim().length === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongAddressEmail}
                </p>
            )
        }
        if(bank.toString().trim().length !== 26 || Number(bank) === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongBankAccount}
                </p>
            )
        }
        if(birth.toString().trim().length === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongBirthDate}
                </p>
            )
        }
        if(pesel.toString().trim().length !== 11 || Number(pesel) === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongPESEL}
                </p>
            )
        }
        if(salary.toString().trim().length === 0 || Number(salary) === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongSalary}
                </p>
            )
        }
        if(contract.toString().trim().length === 0 || contract === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongContract}
                </p>
            )
        }
        if(position.toString().trim().length === 0 || position === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongPosition}
                </p>
            )
        }
        if(positionLevel.toString().trim().length === 0 || positionLevel === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongPositionLevel}
                </p>
            )
        }
        if(department.toString().trim().length === 0 || department === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongTeam}
                </p>
            )
        }
        if(start.toString().trim().length === 0){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongStartDate}
                </p>
            )
        }
        setAlerts(alerts)
        if(alerts.length > 0){
            setShowPopupWithProblems(true)
        }
        else{
            const query = new URLSearchParams();
            query.set("firstName", firstName);
            query.set("lastName", lastName);
            query.set("email", email);
            query.set("bankAccountNumber", bank);
            query.set("dateOfBirth", birth);
            query.set("password", "Wanda123@2113wanda");
            query.set("pesel", pesel);
            query.set("grossSalary", salary.toString().indexOf(".") ? salary.toString().replace(",", ".") : salary);
            query.set("departmentId", department);
            query.set("contractType", contract);
            query.set("companyRole", position);
            query.set("seniorityLevel", positionLevel);
            query.set("employmentStartDate", start);

            if(id === "-1") {
                console.log("create")
                fetchPostCreateEmployee(query)
                    .then(r => console.log(r))
            }
            else{
                console.log("edit lol")

                const query = new URLSearchParams();
                query.set("firstName", firstName);
                query.set("lastName", lastName);
                query.set("email", email);
                query.set("bankAccountNumber", bank);
                query.set("dateOfBirth", birth);
                query.set("password", "Wanda123@2113wanda");
                query.set("pesel", pesel);
                query.set("grossSalary", salary.toString().indexOf(".") ? salary.toString().replace(",", ".") : salary);
                query.set("departmentId", department);
                query.set("contractType", contract);
                query.set("companyRole", position);
                query.set("seniorityLevel", positionLevel);
                query.set("employmentStartDate", start);

                let bodyEdit = JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    bankAccountNumber: bank,
                    dateOfBirth: birth,
                    //password: "Wanda123@2113wanda",
                    pesel: pesel,
                    grossSalary: salary.toString().indexOf(".") ? salary.toString().replace(",", ".") : salary,
                    departmentId: department,
                    contractType: contract,
                    companyRole: position,
                    seniorityLevel: positionLevel,
                    employmentStartDate: start

                })


                let employee = {employee: bodyEdit}
                fetchPutEditEmployee(query, employee, query)
                    .then(r => console.log(r))
            }
        }

        // // Do celów testowych żeby widzieć dane w konsoli
        // console.log(
        //     "id:"+id+
        //     "\n employee data: \n" +
        //     firstName + ", \n" +
        //     lastName + ", \n" +
        //     email + ", \n" +
        //     bank + ", \n" +
        //     birth + ", \n" +
        //     pesel + ", \n" +
        //     salary + ", \n" +
        //     department + ", \n" +
        //     contract + ", \n" +
        //     position + ", \n" +
        //     positionLevel + ", \n" +
        //     start + " \n \n" +
        //     " skills: \n" +
        //     skillsData +
        //     " \n avatar: " //+
        //     //avatarData
        // )
    }

    // Ładowanie umiejętności dla okna wyboru umiejętności
    const [loadedAllSkills, setLoadedAllSkills] = useState([])

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
                        <FirstName id={"employee-firstname"} value={firstName} onChange={setFirstName} disableChange={disableData}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {lastnameLabel} </label>
                        <LastName id={"employee-lastname"} value={lastName} onChange={setLastName} disableChange={disableData}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelEmail} </label>
                        <Email id={"employee-email"} value={email} onChange={setEmail} disableChange={mode !== 'create'}/>
                    </div>

                    {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ? <>
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelBankAccount} </label>
                            <BankAccountNumber id={"employee-bank-number"} value={bank} onChange={setBank} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelBirthDate} </label>
                            <DateOfBirth id={"employee-birth-date"} value={birth} onChange={setBirth} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelPESEL} </label>
                            <Pesel id={"employee-pesel"} value={pesel} onChange={setPesel} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelSalary} </label>
                            <GrossSalary id={"employee-salary"} value={salary} onChange={setSalary} disableChange={disableData}/>
                        </div>

                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelContractType} </label>
                            <Contract id={"employee-contract"} value={contract} onChange={setContract} disableChange={disableData}
                                      contracts={contracts}/>
                        </div>

                    </> : <></>}
                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelPosition} </label>
                        <PositionsList id={"employee-position"} value={position} onChange={setPosition} disableChange={disableData}
                                       positions={positions} formatting={"rounded-full text-left grow "}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelPositionLevel} </label>
                        <PositionLevel id={"employee-position-level"} value={positionLevel} onChange={setPositionLevel}
                                       disableChange={disableData} positionLevels={positionsLevels}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelTeam} </label>
                        <TeamsList id={"employee-team"} value={department} onChange={setDepartment} disableChange={disableData}
                                   teams={teams} placement={'top'} formatting={"rounded-full text-left grow"}/>
                    </div>

                    {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelStartDate} </label>
                            <EmploymentStartDate id={"employee-start-date"} value={start} onChange={setStart} disableChange={disableData}/>
                        </div>
                        : <></>}
                </div>

                <div className={"flex flex-col p-4"}>
                    <ProfilePicture id={"employee-profile-picture"} picture={avatarData}/>
                    <SkillsList id={"employee-skill-list"} skillList={skillsData} />
                    <div className={"flex justify-center"}>
                        {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' && sessionStorage.getItem('USER') === id || mode === 'create' ?
                            <ReusableButton id={"employee-skill-pick"} value={employee !== undefined &&
                                employee !== null ? labelEdit : labelPick}
                                onClick={ () => {
                                    setLoadedAllSkills([])
                                    fetchGetAllSkillsAndSort().then(skills => {
                                        setLoadedAllSkills(skills)
                                        setEmployeeDataShow(false);
                                        setShowSkillsFrame(true)
                                    })
                                }}/> :
                            <></>}
                    </div>
                </div>
            </div>
            {mode !== 'create' &&
                sessionStorage.getItem('USER') !== id ?
                <div className={"grow-0 p-4 flex flex-row justify-start"}>
                    <button
                        id={"employee-back"}
                        onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />{labelBack}</button>
                </div>
                : <></>
            }
            <div className={"grow-0 p-4 flex flex-row justify-around"}>

                {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                    <>
                        {mode === 'edit' && sessionStorage.getItem('USER') === id ?
                            <>
                                <ReusableButton id={"employee-delete"} value={labelDelete} onClick={() => deleteEmployee()} />
                                <ReusableButton id={"employee-save"} value={labelSave} onClick={() => saveEmployee()}/>
                                {sessionStorage.getItem('USER') === id &&
                                <ReusableButton id={"employee-password-change"} value={labelChangePassword}
                                        onClick={() => {
                                            setEmployeeDataShow(false);
                                            setShowPasswordChangeFrame(true);
                                        }}/>}

                                <ReusableButton id={"employee-request"} value={labelRequest} onClick={() => {
                                    setShowAddEmployeeAnAbsence(true);
                                    setEmployeeDataShow(false);
                                }}/>
                            </>
                            : <></>
                        }
                        {mode === 'create' ?
                            <Popup
                                content={buildPopup}
                                position={"top center"}
                                trigger={<ReusableButton id={"employee-create"}
                                             value={labelCreate} onClick={() => saveEmployee()}/>}
                            />
                            : <></>
                        }
                    </>
                    : <></>}
            </div>
        </div>
        :
            <>
                {showSkillsFrame ?
                    <SkillPicker parent={"employee"}
                                 loadedAllSkills={loadedAllSkills}
                                 skillsData={skillsData}
                                 setSkillsData={setSkillsData}
                                 actionSetTrue={setEmployeeDataShow}
                                 actionSetFalse={setShowSkillsFrame} /> :
                    <></>}

                {showPasswordChangeFrame ?
                    <EditPasswordWindow
                        employee={employee}
                        setEmployeeDataShow={setEmployeeDataShow}
                        setShowPasswordChangeFrame={setShowPasswordChangeFrame}/> :
                    <></>}
                {showAddEmployeeAnAbsence ?
                    <RequestWindow setShowAddEmployeeAnAbsence={setShowAddEmployeeAnAbsence}
                             setEmployeeDataShow={setEmployeeDataShow}
                            requestData={employee}/>
                    :
                    <></>
                }
            </>
        }
        </>
    )
}

export default EmployeeComponent;