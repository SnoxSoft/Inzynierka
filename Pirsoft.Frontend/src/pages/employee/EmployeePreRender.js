import {useEffect, useState} from "react";
import React from "react";
import {useParams} from "react-router-dom";
import FunctionForResize from "../../components/base/FunctionForResize";
import EmployeeComponent from "./EmployeeComponent";
import {serverIp} from "../../GlobalAppConfig";
import {endpointGetEmployeeData} from "../../EndpointAppConfig";

function EmployeePreRender(){

    //możliwe rodzaje parametru mode:
    // view - jeśli osoba bez uprawnień przegląda
    // create - do tworzenia
    // edit - osoba przeglądająca konto, uprawniona do edycji kont lub właściciel konta

    // id -1 w momencie gdy tworzymy pracownika
    const {id} = useParams();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(id !== '-1') {
                const response = await fetch(serverIp + "/" + endpointGetEmployeeData + "/" + id);
                const newData = await response.json();
                setEmployee(newData[0]);
            }
            else setEmployee(undefined)
        };

        fetchData();
    }, [id]);

    return(
        <>

            {employee?
                <EmployeeComponent id={id} mode={'edit'} employee={employee}/> :
                    id === '-1' ?
                <EmployeeComponent id={id} mode={'create'} employee={employee}/> :

                <div id={"employee-load"}
                     className={"every-page-on-scroll flex flex-col text-workday overflow-x-auto hover:cursor-default"}
                     style={{minWidth:800} } />
            }
        </>
    )

}

export default EmployeePreRender;