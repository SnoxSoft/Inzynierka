import EmployeesList from "../components/employees/EmployeesList";
import TeamsList from "../components/employees/search/fields/TeamsList";
import PositionsList from "../components/employees/search/fields/PositionsList";
import FirstnameAndLastname from "../components/employees/search/fields/FirstnameAndLastname";
import React, {useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import SortingButton from "../components/employees/search/fields/SortingButton";
import {headerEmployees, labelFind, labelFirstNameAndLastName, pageNameEmployees, serverIp} from "../GlobalAppConfig";
import {endpointGetAllEmployees, endpointGetEmployees} from "../EndpointAppConfig";
import AddEmployeeAnAbsence from "./AddEmployeeAnAbsence";

function Employees(){
    document.title = pageNameEmployees;

    const[firstnameAndLastname, setFirstnameAndLastname] = useState();
    const[teamsList, setTeamsList] = useState();
    const[positionsList, setPositionsList] = useState();
    const[order, setOrder] = useState(true); // true oznacza sortowanie od A->Z, a false od Z->A

    const [employeesList, setEmployeesList] = useState();

    // Pobranie listy wszystkich pracowników
    if (employeesList === undefined) {
        fetch(serverIp + "/" + endpointGetAllEmployees)
            .then((response) => {response.json()
                .then((response) => {
                    setEmployeesList(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const findEmployees = (e) => {

        let firstnameValue = "";
        let teamValue = "";
        let positionValue = "";

        if(firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0){
            firstnameValue = firstnameAndLastname;
        }
        else firstnameValue = " ";

        if(teamsList !== undefined && teamsList.toString().length !== 0){
            teamValue = teamsList;
        }
        else teamValue = " ";

        if(positionsList !== undefined && positionsList.toString().length !== 0){
            positionValue = positionsList;
        }
        else positionValue = " ";

        // Pobranie listy pracowników przy użyciu przycisku Szukaj
        fetch(serverIp + "/" + endpointGetEmployees + "/" + firstnameValue + "/" + teamValue + "/" + positionValue + "/" + order)
            .then((response) => {response.json()
                .then((response) => {
                    setEmployeesList(response)
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const[showAddEmployeeAnAbsence, setShowAddEmployeeAnAbsence] = useState(false)
    const[pickedEmployeeData, setPickedEmployeeData] = useState()

    return(
        <>
        {showAddEmployeeAnAbsence ?
                <AddEmployeeAnAbsence setShowAddEmployeeAnAbsence={setShowAddEmployeeAnAbsence}
                                      //setEmployeeDataShow={setEmployeeDataShow}
                                      forEmployee={pickedEmployeeData}/> :
        <div
            className={"every-page-on-scroll rounded-md border-2 border-b-workday text-workday overflow-y-hidden hover:cursor-default"}
            style={{minWidth: 800}}>
            <div className={"p-4 gap-4 grid grid-cols-2 items-center"}>

                <div className={"flex flex-col gap-2"}>
                    <p>{headerEmployees}</p>
                    <div>
                        <p className={""}>{labelFirstNameAndLastName}</p>
                        <FirstnameAndLastname id={"employees-firstname-lastname"} className={""} onChange={setFirstnameAndLastname}/>
                    </div>
                    <div className={"flex flex-row gap-2 flex-wrap"}>
                        <div>
                            <TeamsList id={"employees-teams-list"} className={""} onChange={setTeamsList}/>
                        </div>

                        <div>
                            <PositionsList id={"employees-positions-list"} className={""} onChange={setPositionsList} placement={"bottom"}/>
                        </div>
                    </div>
                </div>
                <div>
                    <SortingButton id={"employees-sort"} setOrder={setOrder}/>
                    <ReusableButton id={"employees-find"} value={labelFind} onClick={findEmployees}/>
                </div>
            </div>
            <hr/>
            <div id={"employee-list"} className={"rounded-md overflow-y-auto h-full"}>
                {employeesList ?
                    <EmployeesList values={[employeesList][0]} action={setPickedEmployeeData}
                                   showRequest={setShowAddEmployeeAnAbsence} /> : <p />}
            </div>

        </div>
        }
        </>
    );
}

export default Employees;