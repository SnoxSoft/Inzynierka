import {useEffect, useState} from "react";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EmployeeComponent from "./EmployeeComponent";
import {
    fetchGetAllContractsAndAddZeroRecordAndSort,
    fetchGetAllPositionsAndAddZeroRecordAndSort,
    fetchGetAllPositionsLevelsAndAddZeroRecordAndSort,
    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetEmployeeDataById
} from "../../DataFetcher";
import {alertUnexpectedError} from "../../GlobalAppConfig";

function EmployeePreRender(){

    const navigate = useNavigate();

    //możliwe rodzaje parametru mode:
    // view - jeśli osoba bez uprawnień przegląda
    // create - do tworzenia
    // edit - osoba przeglądająca konto, uprawniona do edycji kont lub właściciel konta

    // id -1 w momencie gdy tworzymy pracownika
    const {id} = useParams();

    const [employee, setEmployee] = useState(null);
    const [teams, setTeams] = useState(null);
    const [positions, setPositions] = useState(null);
    const [contracts, setContracts] = useState(null);
    const [positionsLevels, setPositionsLevels] = useState(null);

    useEffect(() => {
        setEmployee(null);
        fetchGetEmployeeDataById(3, navigate)
            .then(employee => setEmployee(employee));

        setTeams(null);
        fetchGetAllTeamsAndAddZeroRecordAndSort(navigate)
            .then(teams => setTeams(teams))

        setContracts(null)
        fetchGetAllContractsAndAddZeroRecordAndSort(navigate)
            .then(contracts => setContracts(contracts))

        setPositions(null)
        fetchGetAllPositionsAndAddZeroRecordAndSort(navigate)
            .then(positions => setPositions(positions))

        setPositionsLevels(null)
        fetchGetAllPositionsLevelsAndAddZeroRecordAndSort(navigate)
            .then(positionsLevels => setPositionsLevels(positionsLevels))
    }, [id]);

    return(
        <>
            {(id === '-1'? true : employee) && teams && contracts && positions && positionsLevels ?
                <EmployeeComponent id={id}
                                   mode={ id === '-1' ? 'create' : 'edit'}
                                   employee={employee}
                                   teams={teams}
                                   contracts={contracts}
                                   positions={positions}
                                   positionsLevels={positionsLevels}/> :
                <div id={"employee-load"}
                     className={"every-page-on-scroll flex flex-col text-workday overflow-x-auto hover:cursor-default text-center"}
                     style={{minWidth:800} }>
                    {alertUnexpectedError}
                </div>
            }
        </>
    )
}

export default EmployeePreRender;