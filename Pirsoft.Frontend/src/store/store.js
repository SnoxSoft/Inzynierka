import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from "./EmployeeSlice";
import employeesListReducer from "./EmployeesListSlice";


const store = configureStore(
{
            reducer: {
                employeeData: employeeReducer,
                employeesListData: employeesListReducer
            }
        }
    )

export default store;