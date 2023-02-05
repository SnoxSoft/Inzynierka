import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from "./EmployeeSlice";
import employeesListReducer from "./EmployeesListSlice";


const store = configureStore(
{
            reducer: {
                employeeData: employeeReducer,
                employeesListData: employeesListReducer,
                priviledge: 'UNAUTHORISED' // ta wartość zmieni się po zalogowaniu użytkownika
            }
        }
    )

export default store;