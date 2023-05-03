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

function Employees(){
    document.title = pageNameEmployees;

    const navigate = useNavigate();

    const[firstnameAndLastname, setFirstnameAndLastname] = useState();
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
                .then(positions => setEmployeesList(positions));
        }
    });

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
                                               onChange={setTeamsList} teams={teamsList}/>
                                </div>
                                <div>
                                    <PositionsList id={"employees-positions-list"} className={""}
                                                   positions={positionsList}
                                                   onChange={setPositionsList} placement={"bottom"}/>
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
                                           showRequest={setShowAddEmployeeAnAbsence}/> : <p/>}
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