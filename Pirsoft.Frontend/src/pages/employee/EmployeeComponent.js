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
    firstnameLabel,
    labelBack,
    labelBankAccount,
    labelBirthDate,
    labelChangePassword,
    labelContractType,
    labelCreate,
    labelDelete,
    labelEdit,
    labelEmail,
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
    labelTeam,
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
    alertWrongAddressEmail,
    labelLeaveDays,
    labelDemandDays,
    labelOverTenYears,
    alertSaved,
    alertProblemOccured,
    alertDeleted,
    alertProfilePictureTooBig,
    accountHR,
    accountPresident,
    accountTeamLeader,
    emailRegex,
    alertStartDateFromFuture,
    alertBirthDateFromFuture,
    accountEmployee,
    accountAccountant,
    accountManagement,
    questionDoEndRequest, questionDoDeleteRequest, questionDoDeleteEmployee, peselRegex
} from "../../GlobalAppConfig";
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
import {Popup} from "semantic-ui-react";
import {getLocalStorageKeyWithExpiry} from "../../components/jwt/LocalStorage";
import RequestWindow from "../RequestWindow";
import LeaveDays from "../../components/employee/fields/LeaveDays";
import DemandDays from "../../components/employee/fields/DemandDays";
import OverTenYears from "../../components/employee/fields/OverTenYears";
function EmployeeComponent({id, mode, employee, teams, contracts, positions, positionsLevels}){

    // Możliwe rodzaje parametru mode:
    // create - do tworzenia
    // edit - osoba przeglądająca konto lub
    //        uprawniona do edycji kont lub właściciel konta

    const navigate = useNavigate();

    if(id === '-1'){
        document.title = pageNameEmployeeRegister;
    }
    else if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null && id === getLocalStorageKeyWithExpiry("loggedEmployee").UserId){
        document.title = pageNameEmployeeData;
    }
    else document.title = pageNameEmployeeView;

    // Na razie od ręki ustationy przywilej i zapisany w sesji
    // Podział na widoczność pól według roli konta plus podział na możliwość edycji.
    // Tylko konto zalogowane które jest PRACOWNIKIEM HR, MOŻE EDYTOWAĆ DANE, albo właściciel konta. W innym przypadku

    // Zmienna która wyłącza z użytku, dla podstawowego użycia, dane pracownika
    let disableData = !
        (getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
            getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR || mode === 'create')
    
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
    const[leaveDays, setLeaveDays] = useState(employee !== undefined && employee !== null ? employee.leave_base_days : 0);
    const[demandDays, setDemandDays] = useState(employee !== undefined && employee !== null ? employee.leave_demand_days : 0);
    const[overTenYears, setOverTenYears] = useState(employee !== undefined && employee !== null ? employee.leave_is_seniority_threshold === 0 ? false: true : false);
    const[position, setPosition] = useState(employee !== undefined && employee !== null ? employee.employee_company_role_id : '');
    const[positionLevel, setPositionLevel] = useState(employee !== undefined && employee !== null ? employee.employee_seniority_level_id : '');
    const[start, setStart] = useState(employee !== undefined && employee !== null ? employee.employment_start_date.substring(0, 10) : '');

    // Reszta danych pracownika
    const [avatarData, setAvatarData] = useState(employee !== undefined && employee !== null ? employee.avatar_file_path : undefined); //employee.avatar
    const [fileToUpload, setFileToUpload] = useState(undefined);
    const [skillsData, setSkillsData] = useState(employee !== undefined && employee !== null ? employee.skills : []);

    useEffect(() => {
        if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
            navigate("/");
        }
        if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
            getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR && mode === "create"){
            navigate("/")
        }
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
            setLeaveDays(employee.leave_base_days)
            setDemandDays(employee.leave_demand_days)
            setOverTenYears(employee.leave_is_seniority_threshold)
            setPosition(employee.employee_company_role_id);
            setPositionLevel(employee.employee_seniority_level_id);
            setStart(employee.employment_start_date.substring(0, 10));

            setAvatarData(employee.avatar);
            setFileToUpload(undefined);
            setSkillsData(employee.skills);
        }
        else {
            clearWindowData();
        }
        setEmployeeDataShow(true)

    }, [id]);

    function clearWindowData(){
        setFirstName('');
        setLastName('');
        setEmail('');
        setBank('');
        setBirth('');
        setPesel('');
        setSalary('');
        setDepartment('');
        setContract('');
        setLeaveDays(0)
        setDemandDays(0)
        setOverTenYears(false)
        setPosition('');
        setPositionLevel('');
        setStart('');

        setAvatarData(undefined);
        setSkillsData([]);
        setFileToUpload(undefined);
    }

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
            setLeaveDays(leaveDays);
            setDemandDays(demandDays);
            setOverTenYears(overTenYears);
            setPosition(position);
            setPositionLevel(positionLevel);
            setStart(start);

            setAvatarData(avatarData);
            setSkillsData(skillsData);
            setFileToUpload(fileToUpload);
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

    const buildPopupDelete = () => {
        return(
                <div className={"flex flex-col items-center justify-center text-workday gap-1 p-1 mb-2 w-44 rounded-md border-2 border-workday bg-blue-menu"}>
                    <div className={"text-center cursor-default"}>{questionDoDeleteEmployee}</div>

                    {showPopupWithProblems ?
                    <div className={"flex flex-col items-center text-center text-workday gap-2 p-2"}>
                        {alerts}
                    </div>:
                    <></>
                    }

                    <ReusableButton value={"Tak"} formatting={"border-2 border-b-workday min-w-min w-12 h-6"}
                                    onClick={() => {
                                        deleteEmployee()
                                    }}/>
                </div>
        )
    }

    function deleteEmployee(){
        fetchDeleteEmployee(id)
            .then(r => {
                if (r.status === 200) {
                    setAlerts( <p className={"bg-green-700 rounded-md border-workday border-2 font-bold pl-1 pr-1"}>
                        {alertDeleted}
                    </p>)
                    setShowPopupWithProblems(true)

                    setTimeout(() => {
                        clearWindowData();
                        navigate(-1);
                    }, 3000);
                } else {
                    setAlerts( <p className={"bg-red-700 rounded-md border-workday border-2 font-bold pl-1 pr-1"}>
                        {alertProblemOccured}
                    </p>)
                    setShowPopupWithProblems(true)
                }
            }).catch(e => {
            setAlerts( <p className={"bg-red-700 rounded-md border-workday border-2 font-bold pl-1 pr-1"}>
                {alertProblemOccured}
            </p>)
            setShowPopupWithProblems(true)
        })
    }


    const saveEmployee = () => {
        setShowPopupWithProblems(false)
        // Sprawdzenie błędów
        setAlerts(<></>)
        let alerts = []

        const profilePicture = document.getElementById('employee-profile-picture');
        if(profilePicture !== null) {
            if (profilePicture.naturalHeight > 351 || profilePicture.naturalWidth > 351) {
                alerts.push(
                    <p className={"bg-red-700 rounded-md font-bold"}>
                        {alertProfilePictureTooBig}
                    </p>
                )
            }
        }

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
        if(email.toString().trim().length === 0 || !emailRegex.test(email)){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongAddressEmail}
                </p>
            )
        }
        if(bank.toString().trim().length !== 26){
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
        }else if(new Date(birth) > new Date()){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertBirthDateFromFuture}
                </p>
            )
        }
        if(pesel.toString().trim().length !== 11 || Number(pesel) < 0 || !peselRegex.test(pesel)){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertWrongPESEL}
                </p>
            )
        }
        if(salary.toString().trim().length === 0 || Number(salary) < 0){
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
        else if(new Date(start) > new Date()){
            alerts.push(
                <p className={"bg-red-700 rounded-md font-bold"}>
                    {alertStartDateFromFuture}
                </p>
            )
        }
        setAlerts(alerts)

        const skillsDataAsString = () => {
            if (skillsData !== null && skillsData !== undefined) {
                return skillsData.map((skill) => skill.skill_id);
            }
        }

        const query = new URLSearchParams();
        query.set("firstName", firstName);
        query.set("lastName", lastName);
        query.set("email", email);
        query.set("bankAccountNumber", bank);
        query.set("skills", skillsDataAsString());
        query.set("birthDate", birth);
        query.set("password", "");
        query.set("pesel", pesel);
        query.set("grossSalary", salary.toString().indexOf(".") ? salary.toString().replace(",", ".") : salary);
        query.set("departmentId", department);
        query.set("contractType", contract);
        query.set("companyRole", position);
        query.set("seniorityLevel", positionLevel);
        query.set("employmentStartDate", start);
        query.set("leaveBaseDays", leaveDays);
        query.set("leaveDemandDays", demandDays);
        query.set("leaveIsSeniorityThreshold", overTenYears);

        const formData = new FormData();
        formData.append("employee_avatar", fileToUpload);

        if(alerts.length > 0){
            setShowPopupWithProblems(true)
        }
        else{
            if(id === "-1") {
                fetchPostCreateEmployee(query, formData)
                    .then(r => {
                        if (r.status === 200) {
                            setAlerts( <p className={"bg-green-700 rounded-md font-bold"}>
                                {alertSaved}
                            </p>)
                            setShowPopupWithProblems(true)

                            // Zapisanie umiejetnosci zaraz po tym
                            clearWindowData();
                        } else {
                            setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                                {alertProblemOccured}
                            </p>)
                            setShowPopupWithProblems(true)
                        }
                    }).catch(e => {
                    setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                        {alertProblemOccured}
                    </p>)
                    setShowPopupWithProblems(true)
                })
            }
            else{
                query.set("leaveIsSeniorityThreshold", overTenYears ? 1 : 0);
                fetchPutEditEmployee(id, query, formData)
                    .then(r => {
                        if (r.status === 200) {
                            setAlerts( <p className={"bg-green-700 rounded-md font-bold"}>
                                {alertSaved}
                            </p>)
                            setShowPopupWithProblems(true)
                        } else {
                            setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                                {alertProblemOccured}
                            </p>)
                            setShowPopupWithProblems(true)
                        }
                    }).catch(e => {
                    setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                        {alertProblemOccured}
                    </p>)
                    setShowPopupWithProblems(true)
                })
            }
        }
    }

    // Ładowanie umiejętności dla okna wyboru umiejętności
    const [loadedAllSkills, setLoadedAllSkills] = useState([])

    return(
        <>
        {employeeDataShow && getLocalStorageKeyWithExpiry("loggedEmployee") !== null ?
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

                    {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                        ((getLocalStorageKeyWithExpiry("loggedEmployee").UserId === id || getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountAccountant) ||
                            mode === "create" || getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR) ?

                    <>
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelBankAccount} </label>
                            <BankAccountNumber id={"employee-bank-number"} value={bank} onChange={setBank} disableChange={disableData}/>
                        </div>

                        {getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountAccountant ||
                            getLocalStorageKeyWithExpiry("loggedEmployee").UserId === id ?
                            <>
                            <div className={"flex flex-row justify-between text-right gap-4"}>
                                <label className={"basis-1/3"}> {labelBirthDate} </label>
                                <DateOfBirth id={"employee-birth-date"} value={birth} onChange={setBirth} disableChange={disableData}/>
                            </div>

                            <div className={"flex flex-row justify-between text-right gap-4"}>
                                <label className={"basis-1/3"}> {labelPESEL} </label>
                                <Pesel id={"employee-pesel"} value={pesel} onChange={setPesel} disableChange={disableData}/>
                            </div>
                            </>:
                        <></>
                        }
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
                        <label className={"basis-1/3"}> {labelPositionLevel} </label>
                        <PositionLevel id={"employee-position-level"} value={positionLevel} onChange={setPositionLevel}
                                       disableChange={disableData} positionLevels={positionsLevels}/>
                    </div>

                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelPosition} </label>
                        <PositionsList id={"employee-position"} value={position} onChange={setPosition} disableChange={disableData}
                                       positions={positions} formatting={"rounded-full text-left grow "}/>
                    </div>
                    <div className={"flex flex-row justify-between text-right gap-4"}>
                        <label className={"basis-1/3"}> {labelTeam} </label>
                        <TeamsList id={"employee-team"} value={department} onChange={setDepartment}
                                   disableChange={disableData && !(
                                       getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                                       getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountPresident)}
                                   teams={teams} placement={'top'} formatting={"rounded-full text-left grow"}/>
                    </div>

                    {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                    getLocalStorageKeyWithExpiry("loggedEmployee").UserId === id || mode === "create" ||
                    getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR   ?
                        <>
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <label className={"basis-1/3"}> {labelStartDate} </label>
                            <EmploymentStartDate id={"employee-start-date"} value={start} onChange={setStart} disableChange={disableData}/>
                        </div>
                        <div className={"flex flex-row justify-between text-right gap-4"}>
                            <div className={"basis-1/3"}> </div>
                            <div className={"flex flex-row gap-4 w-full place-content-evenly"}>
                                <div className={"flex flex-col place-items-center"}>
                                    <label>{labelLeaveDays}</label>
                                    <LeaveDays id={"employee_leave_days"} value={leaveDays} onChange={setLeaveDays} disableChange={disableData}/>
                                </div>
                                <div className={"flex flex-col place-items-center"}>
                                    <label>{labelDemandDays}</label>
                                    <DemandDays id={"employee-demand-days"} value={demandDays} onChange={setDemandDays} disableChange={disableData}/>
                                </div>
                                <div className={"flex flex-col place-items-center"}>
                                    <label>{labelOverTenYears}</label>
                                    <OverTenYears id={"employee-ten-years"} value={overTenYears} onChange={setOverTenYears} disableChange={disableData}/>
                                </div>
                            </div>
                        </div>
                        </>
                        : <></>}
                </div>

                <div className={"flex flex-col p-4"}>
                    <ProfilePicture id={"employee-profile-picture"} picture={avatarData} avatarData={avatarData}
                                    fileToUpload={fileToUpload} setFileToUpload={setFileToUpload} employeeId={id} mode={mode}/>
                    <SkillsList id={"employee-skill-list"} skillList={skillsData} />
                    <div className={"flex justify-center"}>
                        {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                        getLocalStorageKeyWithExpiry("loggedEmployee").UserId === id.toString() ||
                        getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR ?
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
            (getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                (getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== id)) ?
                <div className={"grow-0 p-4 flex flex-row justify-start"}>
                    <button
                        id={"employee-back"}
                        onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />{labelBack}</button>
                </div>
                : <></>
            }
            <div className={"grow-0 p-4 flex flex-row justify-around"}>
                    <>
                        {mode === 'edit' ?
                            <>
                                {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                                getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR &&
                                getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== id ?
                                <Popup content={buildPopupDelete} position={"top center"}
                                       trigger={<ReusableButton id={"employee-delete"}
                                                                value={labelDelete} onClick={() => {
                                           setShowPopupWithProblems(false);
                                           setAlerts(<></>)
                                       }}/>}
                                /> :
                                    <></>
                                }
                                {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                                    (getLocalStorageKeyWithExpiry("loggedEmployee").UserId === id ||
                                        getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR ||
                                        getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountPresident) ?
                                <Popup content={buildPopup} position={"top center"}
                                    trigger={<ReusableButton id={"employee-save"}
                                                             value={labelSave} onClick={() => saveEmployee()}/>}
                                /> :
                                    <></>
                                }
                                {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
                                    getLocalStorageKeyWithExpiry("loggedEmployee").UserId === id &&
                                <ReusableButton id={"employee-password-change"} value={labelChangePassword}
                                        onClick={() => {
                                            setEmployeeDataShow(false);
                                            setShowPasswordChangeFrame(true);
                                        }}/>}

                                {getLocalStorageKeyWithExpiry("loggedEmployee") !== null && (
                                ((getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountTeamLeader &&
                                getLocalStorageKeyWithExpiry("loggedEmployee").Department === employee.employee_department.department_id.toString() &&
                                getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== employee.employee_id.toString()) ||

                                (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR &&
                                    getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== employee.employee_id.toString()) ||

                                (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountPresident) &&
                                    getLocalStorageKeyWithExpiry("loggedEmployee").UserId !== employee.employee_id.toString())) ?
                                <ReusableButton id={"employee-request"} value={labelRequest} onClick={() => {
                                    setShowAddEmployeeAnAbsence(true);
                                    setEmployeeDataShow(false);
                                }}/> :
                                    <></>
                                }
                            </>
                            : <></>
                        }
                        {mode === 'create' && getLocalStorageKeyWithExpiry("loggedEmployee") !== null && getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR ?
                            <Popup
                                content={buildPopup}
                                position={"top center"}
                                trigger={<ReusableButton id={"employee-create"}
                                             value={labelCreate} onClick={() => saveEmployee()}/>}
                            />
                            : <></>
                        }
                    </>
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