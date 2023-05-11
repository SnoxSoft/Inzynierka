import React, {useEffect, useState} from "react";
import ReusableButton from "../components/base/ReusableButton";
import Calendar from "../components/base/Calendar";
import FunctionForResize from "../components/base/FunctionForResize";
import {CgClose} from "react-icons/cg";
import {
    labelApprove, labelCreate, labelDisapprove,
    labelRequest,
    labelRequestApprovers,
    labelRequestNoPay,
    labelRequestType, pageNameRequest,
    serverIp
} from "../GlobalAppConfig";
import {
    fetchApproversForRequest,
    fetchGetAbsencesTypes,
    fetchGetEmployeeDataById,
    fetchPostCreateAbsence,
    fetchPostCreateEmployee
} from "../DataFetcher";
import {useNavigate} from "react-router-dom";
import AbsencesList from "../components/absences/AbsencesList";
import demandDays from "../components/employee/fields/DemandDays";

const RequestWindow = ({setAbsencesVisible = undefined,
                     setShowAddEmployeeAnAbsence = undefined, setEmployeeDataShow = undefined,
                     setRequestsVisible = undefined,
                     requestData = undefined, mode = "create"}) =>{
    document.title = pageNameRequest;

    const navigate = useNavigate();

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
        if (employee === null) {
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

        if (absencesList === null) {
            setAbsencesList([]);
            fetchGetAbsencesTypes(navigate)
                .then(absences => {
                    setAbsencesList(absences)
                    if(requestData !== undefined) {
                        absences.map((absence) => {
                            if (requestData.type === absence.absence_type_name) {
                                setAbsence(absence.absence_type_name)
                            }
                        })
                    }
                });
        }

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
    const currentDate = new Date();
    currentDate.setDate(1);
    const previousThreeMonthsDate = new Date(currentDate.getFullYear(),currentDate.getMonth() - 3, currentDate.getDate())
    const futureThreeMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, currentDate.getDate())

    // Gettery i settery dla filtra kalendarza
    const [dateFrom, setDateFrom] = useState(
        requestData && mode !== 'create' ? requestData.absence_start_date : previousThreeMonthsDate.toLocaleDateString("sv", options));
    const [dateTo, setDateTo] = useState(
        requestData && mode !== 'create' ? requestData.absence_end_date : futureThreeMonthsDate.toLocaleDateString("sv", options));
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

    function createRequest(){
        console.clear()
        console.log(dateFrom)
        console.log(dateTo)
        console.log(absence)
        console.log(noPay)

        console.log(leaveDays)
        console.log(demandDays)
        //close()

        const query = new URLSearchParams();
        query.set("absenceStartDate", dateFrom);
        query.set("absenceEndDate", dateTo);
        query.set("unpaid", noPay ? 1 : 0);
        query.set("absenceTypeId", absence);
        query.set("employeeApproverId", 1);
        query.set("employeeOwnerId", employee.employee_id);
        query.set("absenceStatusId", 1);

        fetchPostCreateAbsence(query)
                    .then(r => console.log(r))

    }

    function rejectRequest(){
        // dodanie endpointu
        console.clear()
        console.log(dateFrom)
        console.log(dateTo)
        console.log(absence)
        console.log(noPay)

        console.log(leaveDays)
        console.log(demandDays)
        //close()
    }

    function approveRequest(){
        // dodanie onedpointu
        console.clear()
        console.log(dateFrom)
        console.log(dateTo)
        console.log(absence)
        console.log(noPay)

        console.log(leaveDays)
        console.log(demandDays)
        //close()
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
                                          disableChange={disableChanges}/>
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
                    <ReusableButton value={labelCreate} onClick={() => createRequest()}/>
                </div> :
                <div id={"schedule-list"} className={"flex justify-evenly"}>
                    <ReusableButton id={"approval-or-rejection-disapprove"}
                                    value={labelDisapprove} onClick={() => rejectRequest()}/>
                    <ReusableButton id={"approval-or-rejection-approve"}
                                    value={labelApprove} onClick={() => approveRequest()}/>
                </div>
            }
        </div>
    )
}
export default RequestWindow;