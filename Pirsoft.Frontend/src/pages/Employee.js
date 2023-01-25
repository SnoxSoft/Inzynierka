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
import {selectId} from "../store/EmployeeSlice";
import SkillsList from "../components/employee/SkillsList";
import {useState} from "react";
import {useParams} from "react-router-dom";
import ReusableButton from "../components/ReusableButton";
import EmployeeData from "../components/EmployeeData";


function Employee(){

    const {id} = useParams();
    const employee = useSelector(selectId(id))

    const[avatar, setAvatar] = useState(employee?.avatar || '')

    return(
        <div className={"flex flex-col w-full m-4 bg-green-menu rounded-md border-2 border-b-workday text-workday"}>
            <div className={"flex flex-row h-full"}>
                <div className={"basis-4/6 grid grid-cols-2 gap-y-4 p-4 place-items-center "}>
                    <EmployeeData employee={employee} />
                </div>
                <div className={"basis-2/6 grid place-items-center p-4"}>
                    <div className={"rounded-md"}>
                        <ProfilePicture value={avatar}/>
                    </div>
                    <SkillsList noPerson={[employee]}/>
                    <ReusableButton value={"EDYTUJ"} link={""} />
                </div>
            </div>
            <div className={"p-4 grid grid-cols-3 place-items-center"}>
                <ReusableButton value={"USUŃ KONTO"} link={""} />
                <ReusableButton value={"ZAPISZ ZMIANY"} link={""} />
                <ReusableButton value={"WYSTAW WNIOSEK"} link={""} />
            </div>
        </div>
    );
}

export default Employee;