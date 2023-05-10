// Plik z metodami do pobierania danych w aplikacji

import {
    contractAdditionalRow,
    positionAdditionalRow,
    positionLevelAdditionalRow,
    serverIp,
    serverIpProd,
    teamAdditionalRow
} from "./GlobalAppConfig";
import {
    endpointDeleteEmployee,
    endpointEmployeeChangePassword,
    endpointGetAbsencesTypes,
    endpointGetAllEmployeesBetweenDatesDaysOff,
    endpointGetAllContracts,
    endpointGetAllEmployees,
    endpointGetAllPositions,
    endpointGetAllPositionsLevels,
    endpointGetAllSkills,
    endpointGetAllTeams,
    endpointGetChangePassword,
    endpointGetEmployeeData,
    endpointGetOneEmployeeBetweenDatesDaysOff,
    endpointGetRequestsStatuses,
    endpointGetTeamData,
    endpointPostCreateEmployee,
    endpointPostSendEmailForPasswordChange,
    endpointPutChangePassword,
    endpointPutEditEmployee, endpointPostCreateAbsence
} from "./EndpointAppConfig";
import React from "react";
import FunctionForSortingJson from "./components/base/FunctionForSortingJson";
import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...',
    'charset': 'utf-8'
}

function redirectToMainWindow(navigate, logOut = false){
    setTimeout(function() {
        // przekierowanie na strónę główną jeśli problem z ładowaniem danych
        navigate("/", { replace: true });

        if(logOut){
            sessionStorage.clear()
            window.location.reload();
        }
    }, 3000);
}

async function fetchPutEditOldPasswordInProfile(navigate, id, oldPassword, newPassword, newRepeatPassword) {
    return await fetch(serverIp + "/" + endpointEmployeeChangePassword,
        {
            method: 'PUT',
            body: JSON.stringify({
                employee_id: id,
                employee_old_password: oldPassword,
                new_employee_password: newPassword,
                repeat_new_employee_password: newRepeatPassword})
        })
}

async function fetchPostSendEmailForPasswordChange(navigate, email) {
    return await fetch(serverIp + "/" + endpointPostSendEmailForPasswordChange + "/" + email,
        {
            method: 'POST'
        })
}

async function fetchGetChangePasswordData(navigate, code) {
    const response = await fetch(serverIp + "/" + endpointGetChangePassword + "/" + code)
        .catch( err => console.error(err))
    if(response.status === 200){
        const newData = await response.json();
        return newData
    }
    else {
        redirectToMainWindow(navigate)
    }
}

async function fetchPutChangePassword(navigate, employeeId, newPassword, newRepeatPassword) {
    return await fetch(serverIp + "/" + endpointPutChangePassword,
        {
            method: "PUT",
            body: JSON.stringify({
                employee_id: employeeId,
                new_employee_password: newPassword,
                repeat_new_employee_password: newRepeatPassword})
        })
}

async function fetchGetEmployeeDataById(id, navigate) {
    if (id !== '-1') {
        try {
            const response = await axios.get(`${serverIpProd}/${endpointGetEmployeeData}/${id}`)
            if (response && response.status === 200) {
                return response.data;
            } else {
                console.log(response);
                redirectToMainWindow(navigate);
            }
        } catch (error) {
            console.error(error);
            redirectToMainWindow(navigate);
        }
    } else return undefined

}

async function fetchPostCreateEmployee(params) {
    return await axios.post(`${serverIpProd}/${endpointPostCreateEmployee}?${params}`)
}

async function fetchPutEditEmployee(id, body, query) {
    // return await fetch(serverIpProd + "/" + endpointPutEditEmployee + "/" + id + "?" + query,
    //     {
    //         method: "PUT",
    //         body: body,
    //         headers: {'Content-Type': 'application/json', 'charset': 'utf-8'}
    //     })

    return await axios.put(`${serverIpProd}/${endpointPutEditEmployee}/${id}?${query}`, {
        headers: headers
    })
}

async function fetchDeleteEmployee(id) {
    return await axios.delete(`${serverIpProd}/${endpointDeleteEmployee}/${id}`, {
        headers: headers
    })
}

async function fetchGetAllEmployees(navigate, sortForTeams = false, sortDirection = "ascending") {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllEmployees}`)
        if (response && response.status === 200) {
            let newData = response.data;
            if (sortForTeams) {
                newData = newData.sort(FunctionForSortingJson('last_name', sortDirection));
            }
            return newData;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetTeamDataById(navigate, id) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetTeamData}/${id}`);
        if (response && response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, addRecord = true) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllTeams}`)
        if (response && response.status === 200) {
            let newData = response.data;
            if (addRecord)
                newData.push({department_id: 0, department_name: teamAdditionalRow})
            newData.sort(FunctionForSortingJson("department_id", "ascending"))
            return newData;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAllContractsAndAddZeroRecordAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllContracts}`)
        if (response && response.status === 200) {
            let newData = response.data;
            newData.push({contract_id: 0, contract_type_name: contractAdditionalRow})
            newData.sort(FunctionForSortingJson("contract_id", "ascending"))
            return newData;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAllPositionsAndAddZeroRecordAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllPositions}`)
        if (response && response.status === 200) {
            let newData = response.data;
            newData.push({role_id: 0, role_name: positionAdditionalRow})
            newData.sort(FunctionForSortingJson("role_id", "ascending"))
            return newData;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAllPositionsLevelsAndAddZeroRecordAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllPositionsLevels}`)
        if (response && response.status === 200) {
            let newData = response.data;
            newData.push({seniority_level_id: 0, seniority_level_name: positionLevelAdditionalRow})
            newData.sort(FunctionForSortingJson("seniority_level_id", "ascending"))
            return newData;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAllSkillsAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllSkills}`)
        if (response && response.status === 200) {
            let newData = response.data;
            newData.sort(FunctionForSortingJson("skill_name", "ascending"))
            return newData;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetRequestsStatuses(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetRequestsStatuses}`)
        if (response && response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAbsencesTypes(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAbsencesTypes}`)
        if (response && response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchPostCreateAbsence(params) {
    return await axios.post(`${serverIpProd}/${endpointPostCreateAbsence}?${params}`)
}
async function fetchGetOneEmployeeBetweenDatesDaysOff(navigate, id, dateFrom, dateTo) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetOneEmployeeBetweenDatesDaysOff}/${id}/${dateFrom}/${dateTo}`)
        if (response && response.status === 200) {
            const newData = await response.data;
            newData.sort(FunctionForSortingJson("absence_start_date", "descending"))
            return newData;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

async function fetchGetAllEmployeesBetweenDatesDaysOff(navigate, dateFrom, dateTo) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetAllEmployeesBetweenDatesDaysOff}/${dateFrom}/${dateTo}`)
        if (response && response.status === 200) {
            const newData = await response.data;
            newData.sort(FunctionForSortingJson("absence_start_date", "descending"))
            return newData;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate);
    }
}

export {
    fetchPutEditOldPasswordInProfile,
    fetchPostSendEmailForPasswordChange,
    fetchGetChangePasswordData,
    fetchPutChangePassword,

    fetchGetEmployeeDataById,
    fetchPostCreateEmployee,
    fetchPutEditEmployee,
    fetchDeleteEmployee,
    fetchGetAllEmployees,

    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetTeamDataById,

    fetchGetAllContractsAndAddZeroRecordAndSort,
    fetchGetAllPositionsAndAddZeroRecordAndSort,
    fetchGetAllPositionsLevelsAndAddZeroRecordAndSort,
    fetchGetAllSkillsAndSort,

    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes,

    fetchPostCreateAbsence,
    fetchGetOneEmployeeBetweenDatesDaysOff,
    fetchGetAllEmployeesBetweenDatesDaysOff

}