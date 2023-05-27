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
    endpointGetEmployeeData,
    endpointGetOneEmployeeBetweenDatesDaysOff,
    endpointGetRequestsStatuses,
    endpointGetLogIn,
    endpointGetTeamData,
    endpointPostCreateEmployee,
    endpointPostSendCodeInEmail,
    endpointPutChangePassword,
    endpointPutEditEmployee,
    endpointPostCreateAbsence,
    endpointCreateTeam,
    endpointDeleteTeam,
    endpointEditTeam,
    endpointPutEditAbsence,
    endpointDeleteAbsence,
    endpointGetEmployeeNotifications,
    endpointDeleteNotification,
    endpointGetYears,
    endpointGetReceivedGrades,
    endpointGetGivenGrades,
    endpointGetAvailableQuartets,
    endpointGetAvailableQuarters, endpointPostCreateGrade
} from "./EndpointAppConfig";
import React from "react";
import FunctionForSortingJson from "./components/base/FunctionForSortingJson";
import axios from "axios";
import {getLocalStorageKeyWithExpiry} from "./components/jwt/LocalStorage";

function getBearerToken(tokenStorage){
    if(tokenStorage !== null)
        return tokenStorage.token
    else return ""
}

function isTokenExpiredMessageFromApi(apiMessage){
    return apiMessage === "token expired" ? true : false
}

const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${getBearerToken(getLocalStorageKeyWithExpiry("loggedEmployee"))}`,
    'charset': 'utf-8'
}

function redirectToMainWindow(navigate, logOut = false){
    setTimeout(function() {
        // przekierowanie na strónę główną jeśli problem z ładowaniem danych
        navigate("/", { replace: true });

        if(logOut){
            sessionStorage.clear()
            localStorage.clear()
            window.location.reload();
        }
    }, 2000);
}

async function fetchPutEditOldPasswordInProfile(navigate, query){
    return await axios.put(`${serverIpProd}/${endpointEmployeeChangePassword}?${query}`, null,{headers: headers})
}

async function fetchPostSendEmailForPasswordChange(emailQuery) {
    return await axios.post(`${serverIpProd}/${endpointPostSendCodeInEmail}?${emailQuery}`, null, {headers: headers})
}

async function fetchPutChangePassword(query) {
    return await axios.put(`${serverIpProd}/${endpointPutChangePassword}?${query}`,null,{headers: headers})
}

async function fetchPostCreateTeam(params) {
    return await axios.post(`${serverIpProd}/${endpointCreateTeam}?${params}`,null,{headers: headers})
}

async function fetchPutEditTeam(id, body) {
    return await axios.put(`${serverIpProd}/${endpointEditTeam}/${id}`, body,{headers: headers})
}

async function fetchDeleteTeam(id) {
    return await axios.delete(`${serverIpProd}/${endpointDeleteTeam}/${id}`,{headers: headers})
}

async function fetchGetEmployeeDataById(id, navigate) {
    if (id !== '-1') {
        try {
            const response = await axios.get(`${serverIpProd}/${endpointGetEmployeeData}/${id}`,{headers: headers})
            if (response && response.status === 200) {
                return response.data;
            } else {
                console.log(response);
                redirectToMainWindow(navigate);
            }
        } catch (error) {
            console.error(error);
            redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
        }
    } else return undefined

}

async function fetchPostCreateEmployee(params, formData) {
    return await axios.post(`${serverIpProd}/${endpointPostCreateEmployee}?${params}`, formData, {
        headers: headers,
        formData
    })
}

async function fetchPutEditEmployee(id, query, formData) {
    return await axios.put(`${serverIpProd}/${endpointPutEditEmployee}/${id}?${query}`, formData,{
        headers: headers,
        formData
    })
}

async function fetchDeleteEmployee(id) {
    return await axios.delete(`${serverIpProd}/${endpointDeleteEmployee}/${id}`, {
        headers: headers
    })
}

async function fetchGetAllEmployees(navigate, sortForTeams = false, sortDirection = "ascending") {
    try {
        const response = (await axios.get(`${serverIpProd}/${endpointGetAllEmployees}`, {
            headers: headers
        }))
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
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetTeamDataById(navigate, id) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetTeamData}/${id}`, {
            headers: headers
        });
        if (response && response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAllTeamsAndAddZeroRecordAndSort(navigate, addRecord = true) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllTeams}`, {
            headers: headers
        })
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
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAllContractsAndAddZeroRecordAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllContracts}`, {
            headers: headers
        })
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
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAllPositionsAndAddZeroRecordAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllPositions}`, {
            headers: headers
        })
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
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAllPositionsLevelsAndAddZeroRecordAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllPositionsLevels}`, {
            headers: headers
        })
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
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAllSkillsAndSort(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllSkills}`, {
            headers: headers
        })
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
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetRequestsStatuses(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetRequestsStatuses}`, {
            headers: headers
        })
        if (response && response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAbsencesTypes(navigate) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAbsencesTypes}`, {
            headers: headers
        })
        if (response && response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            redirectToMainWindow(navigate);
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchPostCreateAbsence(params) {
    try {
        return await axios.post(`${serverIpProd}/${endpointPostCreateAbsence}?${params}`, null,{
            headers: headers
        })
    } catch (error) {
        console.error(error);
        //redirectToMainWindow(navigate);
    }
}

async function fetchPutEditAbsence(id, query) {
    return await axios.put(`${serverIpProd}/${endpointPutEditAbsence}/${id}?${query}`, null, {
        headers: headers
    })
}

async function fetchDeleteAbsence(id) {
    return await axios.delete(`${serverIpProd}/${endpointDeleteAbsence}/${id}`, {
        headers: headers
    })
}

async function fetchGetOneEmployeeBetweenDatesDaysOff(navigate, id, dateFrom, dateTo) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetOneEmployeeBetweenDatesDaysOff}/${id}/${dateFrom}/${dateTo}`, {
            headers: headers
        })
        if (response && response.status === 200) {
            const newData = await response.data;
            newData.sort(FunctionForSortingJson("absence_start_date", "descending"))
            return newData;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetAllEmployeesBetweenDatesDaysOff(navigate, dateFrom, dateTo) {
    try {
        const response = await axios.get(`${serverIpProd}/${endpointGetAllEmployeesBetweenDatesDaysOff}/${dateFrom}/${dateTo}`, {
            headers: headers
        })
        if (response && response.status === 200) {
            const newData = await response.data;
            newData.sort(FunctionForSortingJson("absence_start_date", "descending"))
            return newData;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

async function fetchGetEmployeeNotifications(id) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetEmployeeNotifications}/${id}`)
        if (response && response.status === 200) {
            const newData = await response.data;
            newData.sort(FunctionForSortingJson("absence_start_date", "descending"))
            return newData;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        return []
    }
}

async function fetchDeleteNotification(id) {
    try {
        return await axios.delete(`${serverIp}/${endpointDeleteNotification}/${id}`, {
            headers: headers
        })
    } catch (error) {
        console.error(error);
    }
}

async function fetchGetYears(id) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetYears}/${id}`)
        if (response && response.status === 200) {
            return await response.data;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        return []
    }
}

async function fetchGetReceivedGrades(id, year) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetReceivedGrades}/${id}/${year}`)
        if (response && response.status === 200) {
            return await response.data;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        return []
    }
}

async function fetchGetGivenGrades(id, year) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetGivenGrades}/${id}/${year}`)
        if (response && response.status === 200) {
            return await response.data;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        return []
    }
}

async function fetchGetAvailableQuarters(id, year) {
    try {
        const response = await axios.get(`${serverIp}/${endpointGetAvailableQuarters}/${id}`)
        if (response && response.status === 200) {
            return await response.data;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
        return []
    }
}

async function fetchPostCreateGrade(params) {
    return await axios.post(`${serverIp}/${endpointPostCreateGrade}?${params}`)
}

async function fetchLoginEmployee(navigate, email, password){
    try {
        const response = await fetch(serverIpProd + "/" + endpointGetLogIn + "?email=" + email + "&password=" + password,
            {
                method: "POST",
            })
            .catch( err => console.error(err))
        if (response && response.status === 200)
            return response.json()
        else
            return []
    } catch (error) {
        console.error(error);
        redirectToMainWindow(navigate, isTokenExpiredMessageFromApi(error.response.data.Error));
    }
}

export {
    fetchPutEditOldPasswordInProfile,
    fetchPostSendEmailForPasswordChange,
    fetchPutChangePassword,

    fetchGetEmployeeDataById,
    fetchPostCreateEmployee,
    fetchPutEditEmployee,
    fetchDeleteEmployee,
    fetchGetAllEmployees,

    fetchGetAllTeamsAndAddZeroRecordAndSort,
    fetchGetTeamDataById,
    fetchPostCreateTeam,
    fetchPutEditTeam,
    fetchDeleteTeam,

    fetchGetAllContractsAndAddZeroRecordAndSort,
    fetchGetAllPositionsAndAddZeroRecordAndSort,
    fetchGetAllPositionsLevelsAndAddZeroRecordAndSort,
    fetchGetAllSkillsAndSort,

    fetchGetRequestsStatuses,
    fetchGetAbsencesTypes,

    fetchPostCreateAbsence,
    fetchPutEditAbsence,
    fetchDeleteAbsence,
    fetchGetOneEmployeeBetweenDatesDaysOff,
    fetchGetAllEmployeesBetweenDatesDaysOff,

    fetchLoginEmployee,

    fetchGetEmployeeNotifications, fetchDeleteNotification,

    fetchGetYears, fetchGetReceivedGrades, fetchGetGivenGrades, fetchGetAvailableQuarters, fetchPostCreateGrade
}