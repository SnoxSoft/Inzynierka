import {useSelector} from "react-redux";
import {selectAll} from "../store/EmployeesListSlice";
import EmployeesList from "../components/employees/EmployeesList";
import TeamsList from "../components/employees/search/fields/TeamsList";
import PositionsList from "../components/employees/search/fields/PositionsList";
import FirstnameAndLastname from "../components/employees/search/fields/FirstnameAndLastname";
import {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import SortingButton from "../components/employees/search/fields/SortingButton";
import FunctionForResize from "../components/base/FunctionForResize";
function Employees(){

    const[firstnameAndLastname, setFirstnameAndLastname] = useState();
    const[teamsList, setTeamsList] = useState();
    const[positionsList, setPositionsList] = useState();
    const[order, setOrder] = useState(true); // true oznacza sortowanie od A->Z, a false od Z->A

    const employeesList2 = useSelector(selectAll());
    const[employeesList, setEmployeesList] = useState(employeesList2)

    //const [employeesList, setEmployeesList] = useState(Array);

    //endpoint zakomentowany do uzycia
    // if (employeesList[0] === undefined) {
    //     fetch("http://127.0.0.1:3001/getAllEmployees")
    //         .then((response) => {response.json()
    //             .then((response) => {
    //                 setEmployeesList(response)
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         })
    // }

    const findEmployees = (e) => {
        e.preventDefault()

        let firstnameValue = "";
        let teamValue = "";
        let positionValue = "";

        if(firstnameAndLastname !== undefined && firstnameAndLastname.toString().length !== 0){
            console.log(firstnameAndLastname);
            firstnameValue = firstnameAndLastname;
        }
        else firstnameValue = " ";

        if(teamsList !== undefined && teamsList.toString().length !== 0){
            console.log(teamsList);
            teamValue = teamsList;
        }
        else teamValue = " ";

        if(positionsList !== undefined && positionsList.toString().length !== 0){
            console.log(positionsList);
            positionValue = positionsList;
        }
        else positionValue = " ";

        // potrzebny endpoint żeby kontynuować przeładowywanie listy

        // fetch("http://127.0.0.1:3001/getEmployees/"+firstnameValue+"/"+teamValue+"/"+positionValue+"/"+order)
        //     .then((response) => {response.json()
        //         .then((response) => {
        //             setEmployeesList(response)
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     })

    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("employee-list", {setWantedHeightForList});
    }, []);

    return(
        <div
            className={"bg-green-menu rounded-md border-2 border-b-workday text-workday"}>
            <div className={"p-4 gap-4 flex flex-wrap items-center"}>

                <div className={"flex flex-col gap-2"}>
                    <p className={""}>Wyszukaj pracownika</p>

                    <div>
                        <p className={""}>Imię i nazwisko: </p>
                        <FirstnameAndLastname className={""} onChange={setFirstnameAndLastname}/>
                    </div>
                    <div className={"flex flex-row gap-4 flex-wrap"}>
                        <div>
                            <p className={""}>Zespół: </p>
                            <TeamsList className={""} onChange={setTeamsList}/>
                        </div>

                        <div>
                            <p className={""}>Stanowisko: </p>
                            <PositionsList className={""} onChange={setPositionsList}/>
                        </div>
                    </div>

                </div>

                <div>
                    <SortingButton setOrder={setOrder}/>
                    <ReusableButton value={"SZUKAJ"} onClick={findEmployees}/>
                </div>
            </div>

            <div id={"employee-list"} className={"rounded-md overflow-y-auto"}
                 style={{ height: wantedHeightsForList } }>
                {employeesList ? <EmployeesList values={[employeesList][0]}/> : <p />}
            </div>

        </div>
    );
}

export default Employees;