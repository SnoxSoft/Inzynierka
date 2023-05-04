import EmployeesList from "../components/employees/EmployeesList";
import TeamsList from "../components/employees/search/fields/TeamsList";
import PositionsList from "../components/employees/search/fields/PositionsList";
import FirstnameAndLastname from "../components/employees/search/fields/FirstnameAndLastname";
import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import SortingButton from "../components/employees/search/fields/SortingButton";
import {
    alertUnexpectedError,
    headerEmployees,
    labelFind,
    labelFirstNameAndLastName,
    pageNameEmployees,
    serverIp
} from "../GlobalAppConfig";
import {endpointGetAllEmployees, endpointGetEmployees} from "../EndpointAppConfig";
import AddEmployeeAnAbsence from "./AddEmployeeAnAbsence";
import {
    fetchGetAllEmployees,
    fetchGetAllPositionsAndAddZeroRecordAndSort,
    fetchGetAllTeamsAndAddZeroRecordAndSort
} from "../DataFetcher";
import {useNavigate} from "react-router-dom";
import FunctionForResize from "../components/base/FunctionForResize";

function Employees(){
    document.title = pageNameEmployees;

    const navigate = useNavigate();

    // Wybrane wartości w filtrze
    const[firstnameAndLastname, setFirstnameAndLastname] = useState();
    const[team, setTeam] = useState();
    const[position, setPosition] = useState();

    //Załądowane listy dla filtra
    const[teamsList, setTeamsList] = useState(null);
    const[positionsList, setPositionsList] = useState(null);
    const[order, setOrder] = useState(true); // true oznacza sortowanie od A->Z, a false od Z->A

    const [employeesList, setEmployeesList] = useState();

    useEffect(() => {
        // Załadowanie wszystkich zespołów do filtra
        if(teamsList === null) {
            setTeamsList(null);
            fetchGetAllTeamsAndAddZeroRecordAndSort(navigate)
                .then(teamsList => setTeamsList(teamsList));
        }

        //Załadowanie wszystkich pozycji dla filtra
        if(positionsList === null) {
            setPositionsList(null);
            fetchGetAllPositionsAndAddZeroRecordAndSort(navigate)
                .then(positions => setPositionsList(positions));
        }

        // Pobranie listy wszystkich pracowników
        if (employeesList === undefined) {
            fetchGetAllEmployees(navigate)
                .then(employeesList => setEmployeesList(employeesList));
        }

        FunctionForResize("employee-list", {setWantedHeightForList});
    });

    function findEmployees(){
        // Pobranie listy pracowników przy użyciu przycisku Szukaj
        fetchGetAllEmployees(navigate)
            .then(employeesList => {
                let filteredEmployeeList = []
                employeesList.map(employee => {
                    const employeeName = employee.first_name + " " + employee.last_name

                    // Duża Funkcja filtrująca

                    // Jeśli tylko wpisana nazwa pracownika
                    if((firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0 &&
                        (team === undefined || team === 0) &&
                        (position === undefined || position === 0))){
                        if(employeeName.includes(firstnameAndLastname)){
                            filteredEmployeeList.push(employee)
                        }
                    }
                    // Jeśli tylko wybrany zespół pracownika
                    if(team !== undefined && team !== 0 &&
                        (firstnameAndLastname === undefined || firstnameAndLastname.toString().length === 0) &&
                        (position === undefined || position === 0)){
                        if(employee.employee_department_id.toString().trim() === team.toString().trim()){
                            filteredEmployeeList.push(employee)
                        }
                    }
                    // Jeśli tylko wybrane stanowisko pracownika
                    if(position !== undefined && position !== 0 &&
                        (firstnameAndLastname === undefined || firstnameAndLastname.toString().length === 0) &&
                        (team === undefined || team === 0)){
                        if(employee.employee_company_role_id.toString().trim() === position.toString().trim()){
                            filteredEmployeeList.push(employee)
                        }
                    }

                    // Jeśli wpisana nazwa pracownika i zespół
                    if((firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0 &&
                        (team !== undefined && team !== 0) &&
                        (position === undefined || position === 0))){
                        if(employeeName.includes(firstnameAndLastname) &&
                            employee.employee_department_id.toString().trim() === team.toString().trim()){
                            filteredEmployeeList.push(employee)
                        }
                    }
                    // Jeśli wpisana nazwa pracownika i stanowisko
                    if((firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0 &&
                        (team === undefined || team === 0) && (position !== undefined && position !== 0))){
                        if(employeeName.includes(firstnameAndLastname) &&
                            employee.employee_company_role_id.toString().trim() === position.toString().trim()){
                            filteredEmployeeList.push(employee)
                        }
                    }

                    // Jeśli wybrany zespół pracownika i stanowisko
                    if(team !== undefined && team !== 0 &&
                        (firstnameAndLastname === undefined || firstnameAndLastname.toString().length === 0) &&
                        (position !== undefined && position !== 0)){
                        if(employee.employee_department_id.toString().trim() === team.toString().trim() &&
                            employee.employee_company_role_id.toString().trim() === position.toString().trim()){
                            filteredEmployeeList.push(employee)
                        }
                    }

                    // Jeśli wybrane trzy na raz
                    if(position !== undefined && position !== 0 &&
                        (firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0) &&
                        (team !== undefined && team !== 0)){
                        if(employee.employee_company_role_id.toString().trim() === position.toString().trim() &&
                            employeeName.includes(firstnameAndLastname) &&
                            employee.employee_department_id.toString().trim() === team.toString().trim()){
                            filteredEmployeeList.push(employee)
                        }
                    }

                    // Wczytanie wszystkiego jeśli żadne filtry nie są wybrane
                    if((firstnameAndLastname === undefined || firstnameAndLastname.toString().length === 0) &&
                        (team === undefined || team === 0) && (position === undefined || position === 0)) {
                        filteredEmployeeList.push(employee)
                    }
                })

                setEmployeesList(filteredEmployeeList)
            });
    }

    const[showAddEmployeeAnAbsence, setShowAddEmployeeAnAbsence] = useState(false)
    const[pickedEmployeeData, setPickedEmployeeData] = useState()

    const[wantedHeightsForList, setWantedHeightForList] = useState(400);
    useEffect(() => {
        if(employeesList && teamsList && positionsList){
            FunctionForResize("employee-list", {setWantedHeightForList});
        }
    }, []);

    return(
        <>
        {showAddEmployeeAnAbsence ?
                <AddEmployeeAnAbsence setShowAddEmployeeAnAbsence={setShowAddEmployeeAnAbsence}
                                      //setEmployeeDataShow={setEmployeeDataShow}
                                      forEmployee={pickedEmployeeData}/> :
            <>
            {teamsList && positionsList ?
                <div
                    className={"every-page-on-scroll rounded-md border-2 border-b-workday text-workday overflow-y-hidden hover:cursor-default"}
                    style={{minWidth: 800}}>
                    <div className={"p-4 gap-4 grid grid-cols-2 items-center"}>

                        <div className={"flex flex-col gap-2"}>
                            <p>{headerEmployees}</p>
                            <div>
                                <p className={""}>{labelFirstNameAndLastName}</p>
                                <FirstnameAndLastname id={"employees-firstname-lastname"} className={""}
                                                      onChange={setFirstnameAndLastname}/>
                            </div>
                            <div className={"flex flex-row gap-2 flex-wrap"}>
                                <div>
                                    <TeamsList id={"employees-teams-list"} className={""}
                                               onChange={setTeam} teams={teamsList}/>
                                </div>
                                <div>
                                    <PositionsList id={"employees-positions-list"} className={""}
                                                   positions={positionsList}
                                                   onChange={setPosition} placement={"bottom"}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SortingButton id={"employees-sort"} setOrder={setOrder}/>
                            <ReusableButton id={"employees-find"} value={labelFind} onClick={findEmployees}/>
                        </div>
                    </div>
                    <hr/>
                    <div id={"employee-list"} className={"rounded-md overflow-y-auto"}
                        style={{height: wantedHeightsForList}}>
                        {employeesList && teamsList && positionsList ?
                            <EmployeesList values={[employeesList][0]} action={setPickedEmployeeData}
                                           showRequest={setShowAddEmployeeAnAbsence} teams={teamsList} positions={positionsList}/> : <p/>}
                    </div>
                </div> :
                <div id={"employees-load"}
                     className={"every-page-on-scroll flex flex-col text-workday overflow-x-auto hover:cursor-default text-center"}
                     style={{minWidth:800} }>
                    {alertUnexpectedError}
                </div>
            }
            </>
        }
        </>
    );
}

export default Employees;