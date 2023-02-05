import ProfilePicture from "../components/employee/fields/ProfilePicture";
import {useSelector} from "react-redux";
import {selectId} from "../store/EmployeeSlice";
import SkillsList from "../components/employee/fields/SkillsList";
import {useEffect, useState} from "react";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReusableButton from "../components/base/ReusableButton";
import EmployeeData from "../components/employee/EmployeeData";
import FunctionForResize from "../components/base/FunctionForResize";
import {MdOutlineArrowBackIosNew} from "react-icons/md";


function Employee(){

    const {id} = useParams();
    const {mode} = useParams();
    const navigate = useNavigate();

    // na razie od ręki ustationy przywilej i zapisany w sesji
    //podział na widoczność pól według roli konta plus podział na możliwość edycji.
    //tylko konto zalogowane które jest PRACOWNIKIEM HR, MOŻE EDYTOWAĆ DANE, albo właściciel konta. W innym przypadku

    //uprawnienia edycji oraz przeglądania danych konta pracownika według zalogowanego konta
    sessionStorage.setItem("PRIVILEDGE", 'UNAUTHORIED')

    // const currentPath = location.pathname,
    //     parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    //
    // sessionStorage.getItem()
    //console.log(parentPath)

    //endpoint zakomentowany do uzycia
    // const[employee, setEmployee] = useState(Object);
    // fetch("http://127.0.0.1:3001/employee/"+id)
    //     .then((response) => response.json())
    //     .then((response) => {
    //         //console.log("fffffff "+ response)
    //         setEmployee(response[0])
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     })

    const employee = useSelector(selectId(id))

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("employee-info", {setWantedHeightForList});
    }, []);

    return(
        <div id={"employee-info"}
             className={"flex flex-col bg-green-menu rounded-md border-2 border-b-workday text-workday overflow-y-auto"}
             style={{ height: wantedHeightsForList } }>
            <div className={"grow flex flex-row"}>
                <EmployeeData employee={employee} />
                <div className={"flex flex-col p-4"}>
                    <ProfilePicture value={employee}/>
                    <SkillsList noPerson={employee}/>
                    <div className={"flex justify-center"}>
                        {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                            <ReusableButton value={"EDYTUJ"} link={""} /> :
                            <></>}
                    </div>
                </div>
            </div>
            {mode === 'view' ?
                <div className={"grow-0 p-4 flex flex-row justify-start"}>
                    <button onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew />Wstecz</button>
                </div>
                : <></>
            }
            <div className={"grow-0 p-4 flex flex-row justify-around"}>

                {sessionStorage.getItem("PRIVILEDGE") !== 'UNAUTHORISED' ?
                    <>
                        {mode === 'view' ?
                        <>
                            <ReusableButton value={"USUŃ KONTO"} link={""} />
                            <ReusableButton value={"ZAPISZ ZMIANY"} link={""} />
                            <ReusableButton value={"WYSTAW WNIOSEK"} link={""} />
                        </>
                                : <></>
                            }
                        {mode === 'create' ?
                            <ReusableButton value={"UTWÓRZ"}/>
                            : <></>
                        }
                    </>
                    : <></>}


            </div>
        </div>
    );
}

export default Employee;