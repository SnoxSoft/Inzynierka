// Plik z metodami do pobierania danych w aplikacji

import {
    contractAdditionalRow,
    positionAdditionalRow, positionLevelAdditionalRow,
    serverIp,
    serverIpProd,
    teamAdditionalRow
} from "./GlobalAppConfig";
import {
    endpointGetAbsencesTypes,
    endpointGetAllCompanyMonthDaysOff,
    endpointGetAllContracts,
    endpointGetAllEmployees,
    endpointGetAllPositions,
    endpointGetAllPositionsLevels,
    endpointGetAllSkills,
    endpointGetAllTeams,
    endpointGetEmployeeAbsences,
    endpointGetEmployeeData,
    endpointGetEmployeeMonthDaysOff,
    endpointGetEmployeesRequests,
    endpointGetRequestApprovers,
    endpointGetRequestsStatuses
} from "./EndpointAppConfig";
import React from "react";
import FunctionForSortingJson from "./components/base/FunctionForSortingJson";

function redirectToMainWindow(navigate){
    //przekierowanie do strony logowania - wystapil błąd albo do strony glownej
    setTimeout(function() {
        sessionStorage.clear()
        //navigate("/", { replace: true });
        //window.location.reload();
    }, 3000);
}

async function fetchGetEmployeeData(id, navigate) {
    if (id !== '-1') {
        const response = await fetch(serverIp + "/" + endpointGetEmployeeData + "/" + id)
            .catch( err => console.error(err))
        if(response.status === 200){
            const newData = await response.json();
            return newData[0]
        }
        else {
            redirectToMainWindow(navigate)
        }
    } else return undefined
}

async function fetchGetAllEmployees(navigate, sortForTeams = false) {
    const response = await fetch(serverIp + "/" + endpointGetAllEmployees)
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        if (sortForTeams)
            newData.sort(FunctionForSortingJson("last_name", "ascending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, addRecord = true) {
    const response = await fetch(serverIpProd + "/" + endpointGetAllTeams)
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        if(addRecord)
            newData.push({ department_id: 0, department_name: teamAdditionalRow })
        newData.sort(FunctionForSortingJson("department_id", "ascending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetAllContractsAndAddZeroRecordAndSort(navigate) {
    const response = await fetch(serverIpProd + "/" + endpointGetAllContracts,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        newData.push({ contract_id: 0, contract_type_name: contractAdditionalRow })
        newData.sort(FunctionForSortingJson("contract_id", "ascending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetAllPositionsAndAddZeroRecordAndSort(navigate) {
    const response = await fetch(serverIpProd + "/" + endpointGetAllPositions,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        newData.push({role_id: 0, role_name: positionAdditionalRow})
        newData.sort(FunctionForSortingJson("role_id", "ascending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetAllPositionsLevelsAndAddZeroRecordAndSort(navigate) {
    const response = await fetch(serverIpProd + "/" + endpointGetAllPositionsLevels,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        newData.push({ seniority_level_id: 0, seniority_level_name: positionLevelAdditionalRow })
        newData.sort(FunctionForSortingJson("seniority_level_id", "ascending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetAllSkillsAndSort(navigate) {
    const response = await fetch(serverIp + "/" + endpointGetAllSkills,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        newData.sort(FunctionForSortingJson("skill_name", "ascending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetRequestsStatuses(navigate) {
    const response = await fetch(serverIp + "/" + endpointGetRequestsStatuses,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetAbsencesTypes(navigate) {
    const response = await fetch(serverIp + "/" + endpointGetAbsencesTypes,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetEmployeesRequests(navigate, id) {
    const response = await fetch(serverIp + "/" + endpointGetEmployeesRequests + "/" + id,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        newData.sort(FunctionForSortingJson("from", "descending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetEmployeesAbsences(navigate, id) {
    const response = await fetch(serverIp + "/" + endpointGetEmployeeAbsences + "/" + id,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        newData.sort(FunctionForSortingJson("from", "descending"))
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchGetEmployeeMonthDaysOff(navigate, id, yearMonth) {
    const response = await fetch(serverIp + "/" + endpointGetEmployeeMonthDaysOff + "/" + id + "/" + yearMonth,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    console.clear()
    if(response.status === 200){
        const newData = await response.json();
        return newData
    }
    else {
        return []
    }
}

async function fetchGetCompanyMonthDaysOff(navigate, yearMonth) {
    const response = await fetch(serverIp + "/" + endpointGetAllCompanyMonthDaysOff + "/" + yearMonth,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    console.clear()
    if(response.status === 200){
        const newData = await response.json();
        return newData
    }
    else {
        return []
    }
}

async function fetchApproversForRequest(navigate, id) {
    const response = await fetch(serverIp + "/" + endpointGetRequestApprovers + "/" + id,
        {
            method: "GET"
        })
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        return newData
    }
    else {
        return []
    }
}

export {
    fetchGetEmployeeData,
    fetchGetAllEmployees,

    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetAllContractsAndAddZeroRecordAndSort,
    fetchGetAllPositionsAndAddZeroRecordAndSort,
    fetchGetAllPositionsLevelsAndAddZeroRecordAndSort,
    fetchGetAllSkillsAndSort,

    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes,
    fetchGetEmployeesRequests,
    fetchGetEmployeesAbsences,
    fetchApproversForRequest,

    fetchGetEmployeeMonthDaysOff,
    fetchGetCompanyMonthDaysOff

}