import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/base/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import {CgClose} from "react-icons/cg";
import {
    accountHR, accountPresident, accountTeamLeader,
    alertAbsence,
    alertAccepted,
    alertCreated, alertDateFrom, alertDateTo,
    alertDeleted, alertProblemOccured, alertRefused,
    labelApprove, labelCreate, labelDisapprove,
    labelRequest,
    labelRequestApprovers,
    labelRequestNoPay,
    labelRequestType, pageNameAddEmployeeAnAbsence, pageNameApprovalOrRejectionRequest
} from "../GlobalAppConfig";
import {
    fetchGetAbsencesTypes,
    fetchGetEmployeeDataById,
    fetchPostCreateAbsence, fetchPutEditAbsence
} from "../DataFetcher";
import {useNavigate} from "react-router-dom";
import AbsencesList from "../components/absences/AbsencesList";
import {getLocalStorageKeyWithExpiry} from "../components/jwt/LocalStorage";
import {Popup} from "semantic-ui-react";

const RequestWindow = ({setAbsencesVisible = undefined,
                     setShowAddEmployeeAnAbsence = undefined, setEmployeeDataShow = undefined,
                     setRequestsVisible = undefined,
                     requestData = undefined, mode = "create"}) =>{

    if(mode === "create"){
        document.title = pageNameAddEmployeeAnAbsence;
    }
    else {
        document.title = pageNameApprovalOrRejectionRequest;
    }

    const navigate = useNavigate();
    if(getLocalStorageKeyWithExpiry("loggedEmployee") === null){
        navigate("/");
    }

    // Lista rodzai urlopów
    const [absencesList, setAbsencesList] = useState(null)

    // Lista w której pokażemy wsyzystkei ossoby które mogą zatwierdzać
    const [approversList, setApproversList] = useState(null);

    // Pracownik, który otrzymuje wniosek
    const [employee, setEmployee] = useState(null);

    // Ładowanie tych wartości z informacji pracownika
    const [demandDays, setDemandDays] = useState(0);
    const [leaveDays, setLeaveDays] = useState(0);

    useEffect(() => {
        // Załadowanie danych pracownika, dla którego wystawiamy wniosek
        if (employee === null && getLocalStorageKeyWithExpiry("loggedEmployee") !== null) {
            setEmployee(null);
            fetchGetEmployeeDataById(requestData.employee_id !== undefined ? requestData.employee_id : requestData.employee_owner_id, navigate)
                .then(employee => {
                    if(employee !== undefined){
                        setDemandDays(employee.leave_demand_days);
                        setLeaveDays(employee.leave_base_days);

                        setNoPay(requestData && mode === "approval" ? requestData.unpaid : mode === "create" ? employee.leave_base_days === 0 : false)

                        setEmployee(employee);
                    }
                });
        }

        if (absencesList === null && employee !== null) {
            setAbsencesList([]);
            fetchGetAbsencesTypes(navigate)
                .then(absences => {
                    let loadAbsencesList = []
                    if(requestData !== undefined) {
                        absences.map((absence) => {
                            if (requestData.type === absence.absence_type_name) {
                                setAbsence(absence.absence_type_name)
                            }
                            if(demandDays === 0 && absence.absence_type_category !== "demand" || demandDays > 0){
                                if((employee.employee_company_role_id !== 2 && absence.absence_type_category !== "absent" && absence.absence_type_category !== "sick") ||
                                    employee.employee_company_role_id === 2){
                                    loadAbsencesList.push(absence)
                                }
                            }
                        })
                    }
                    setAbsencesList(loadAbsencesList)
                });
        }

        // if(getLocalStorageKeyWithExpiry("loggedEmployee") !== null && employee !== null && (
        //     ((mode === "approval" &&
        //         (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountTeamLeader ||
        //         (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountTeamLeader &&
        //         getLocalStorageKeyWithExpiry("loggedEmployee").Department !== employee.employee_department.department_id.toString()) ||
        //     getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR))) ||
        //     (mode === "create" &&
        //         (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR && getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountPresident &&
        //             (getLocalStorageKeyWithExpiry("loggedEmployee").UserId === employee.employee_id.toString()) ||
        //         (getLocalStorageKeyWithExpiry("loggedEmployee").Role_name !== accountHR && getLocalStorageKeyWithExpiry("loggedEmployee").UserId === employee.employee_id.toString())))
        // )){
        //     navigate("/");
        // }

        // // Pobranie listy osób, które mogą zatwierdzić wniosek
        // if (approversList === null) {
        //     fetchApproversForRequest(navigate, requestData.employee_id)
        //         .then(approvers => {
        //             let approversListLoad = [];
        //             let approverId = 1;
        //             for (const i of approvers) {
        //                 approversListLoad.push(
        //                     <div key={"approver-item-" + approverId} className={"text-black"}>
        //                         {i.name}, {i.role}
        //                     </div>
        //                 )
        //                 approverId++;
        //             }
        //             setApproversList(approversListLoad)
        //         })
        // }
    })


    // Opcje dla wyświetlenia daty w formacie tekstowym
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }

    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(
        requestData && mode !== 'create' ? requestData.absence_start_date.toString().substring(0, 10) : new Date().toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(
        requestData && mode !== 'create' ? requestData.absence_end_date.toString().substring(0, 10) : new Date().toLocaleDateString("sv", options));
    const [absence, setAbsence] = useState(requestData ? requestData.absence_type_id : null)
    const [noPay, setNoPay] = useState(requestData && mode === "approval" ? requestData.unpaid : mode === "create" ? leaveDays === 0 : false)
    const disableChanges = mode === "approval"

    function close(){
        if(setAbsencesVisible){
            setAbsencesVisible(true)
        }
        else if(setShowAddEmployeeAnAbsence !== undefined && setEmployeeDataShow === undefined){
            setShowAddEmployeeAnAbsence(false);

        }
        else if(setShowAddEmployeeAnAbsence !== undefined && setEmployeeDataShow !== undefined){
            setShowAddEmployeeAnAbsence(false);
            setEmployeeDataShow(true);
        }
        else if(setRequestsVisible){
            setRequestsVisible(true)
        }
    }

    const [showPopupWithProblems, setShowPopupWithProblems] = useState(false);
    const [alerts, setAlerts] = useState(<></>)

    const buildPopup = () => {
        return showPopupWithProblems ?
            <div className={"flex flex-col items-center text-workday gap-2 p-2"}>
                {alerts}
            </div>:
            <></>
    }

    function createRequest(){
        const query = new URLSearchParams();
        query.set("absenceStartDate", dateFrom);
        query.set("absenceEndDate", dateTo);
        query.set("unpaid", noPay ? 1 : 0);
        query.set("absenceTypeId", absence);
        query.set("employeeApproverId", 0);
        query.set("employeeOwnerId", employee.employee_id);
        query.set("absenceStatusId", 1);

        setShowPopupWithProblems(false)
        // Sprawdzenie błędów
        setAlerts(<></>)
        let alerts = []

        if(dateFrom === ""){
            alerts.push( <p className={"bg-red-700 rounded-md font-bold"}>
                {alertDateFrom}
            </p>)
        }
        if(dateTo === ""){
            alerts.push( <p className={"bg-red-700 rounded-md font-bold"}>
                {alertDateTo}
            </p>)
        }
        if(absence === undefined){
            alerts.push( <p className={"bg-red-700 rounded-md font-bold"}>
                {alertAbsence}
            </p>)
        }

        setAlerts(alerts)
        if(alerts.length > 0){
            setShowPopupWithProblems(true)
        }
        else {
            fetchPostCreateAbsence(query)
                .then(r => {
                    if (r.status === 200) {
                            close()
                    } else {
                        setAlerts(<p className={"bg-red-700 rounded-md font-bold"}>
                            {alertProblemOccured}
                        </p>)
                        setShowPopupWithProblems(true)
                    }
                })
        }
    }

    function rejectRequest(){
        const query = new URLSearchParams();
        query.set("employeeApproverId", getLocalStorageKeyWithExpiry("loggedEmployee").UserId);
        query.set("absenceStatusId", 2);

        fetchPutEditAbsence(requestData.absence_id, query)
            .then(r => {
                if (r.status === 200) {
                        close();
                } else {
                    setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                        {alertProblemOccured}
                    </p>)
                    setShowPopupWithProblems(true)
                }
            })
    }

    function approveRequest(){
        const query = new URLSearchParams();
        query.set("employeeApproverId", getLocalStorageKeyWithExpiry("loggedEmployee").UserId);
        query.set("absenceStatusId", 3);

        fetchPutEditAbsence(requestData.absence_id, query)
            .then(r => {
                if (r.status === 200) {
                        close()
                } else {
                    setAlerts( <p className={"bg-red-700 rounded-md font-bold"}>
                        {alertProblemOccured}
                    </p>)
                    setShowPopupWithProblems(true)
                }
            })
    }

    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        FunctionForResize("schedule-list", {setWantedHeightForList});
        FunctionForResize("schedule-month", {setWantedHeightForList});
    }, []);

    return(
        <div id={"RequestWindow"}
             className={"every-page-on-scroll flex text-center flex-col bg-blue-menu text-workday p-4 hover:cursor-default"}
             style={{minWidth: 800}}>
            <div className={"grid grid-cols-1 grid-rows-1 place-items-end"}>
                <div className={"col-start-1 row-start-1 place-self-center"}>
                    {labelRequest}
                </div>
                <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                    <ReusableButton value={<CgClose  size={30}/>}
                                    onClick={() => close()}
                    formatting={""} color={""}/>
                </div>
            </div>
            {requestData ? <div>{requestData.first_name} {requestData.last_name}</div> : <></>}
            <br/>
            <div className={"flex p-4 gap-8 text-center flex-col"}>
                <div className={"flex justify-center"}>
                    <Calendar id={"request"} setDateTo={setDateTo} setDateFrom={setDateFrom} from={dateFrom} to={dateTo}
                    disabled={disableChanges}/>
                </div>
                <div className={"flex "}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        {labelRequestType}
                    </p>
                    <div className={"bg-workday text-black basis-1/3"}>
                        <AbsencesList value={absence} onChange={setAbsence} absences={absencesList}
                                          disableChange={disableChanges} />
                    </div>
                </div>
                <div className={"flex flex-col place-self-center place-items-center"}>
                    <p className={"basis-1/3 text-end pr-4"}>
                        {labelRequestNoPay}
                    </p>
                    <input id={"request-type-no-pay"} type={"checkbox"}
                           className={"h-5 w-5 accent-workday"}
                           onChange={(e) => setNoPay(e.target.checked)}
                           checked={noPay} disabled={disableChanges || mode === "create" && leaveDays === 0}/>
                </div>
                {mode === "create" ?
                <div id={"schedule-list"} className={"flex"}>
                    <p className={"text-end basis-1/3 pr-4"}>
                        {labelRequestApprovers}
                    </p>
                    <div className={"flex flex-col basis-4/12 justify-start bg-workday rounded-md gap-1"}>
                        {approversList}
                    </div>
                </div> :
                    <></>
                }
            </div>
            <br/>
            {mode === "create" ?
                <div className={"flex justify-evenly"} style={{ height: wantedHeightsForList}}>
                    <Popup
                        content={buildPopup}
                        position={"top center"}
                        trigger={<ReusableButton id={"create-request"} value={labelCreate} onClick={() => createRequest()}/>}
                    />
                </div> :
                <div id={"schedule-list"} className={"flex justify-evenly"}>
                    <Popup
                        content={buildPopup}
                        position={"top center"}
                        trigger={<ReusableButton id={"approval-or-rejection-disapprove"}
                                                 value={labelDisapprove} onClick={() => rejectRequest()}/>}
                    />
                    <Popup
                        content={buildPopup}
                        position={"top center"}
                        trigger={<ReusableButton id={"approval-or-rejection-approve"}
                                                 value={labelApprove} onClick={() => approveRequest()}/>}
                    />
                </div>
            }
        </div>
    )
}
export default RequestWindow;