import {configureStore, createSlice} from '@reduxjs/toolkit';
import employeeReducer from "./EmployeeSlice";
import employeesListReducer from "./EmployeesListSlice";


const store = configureStore(
    {
        reducer: {
            employeeData: employeeReducer,
            employeesListData: employeesListReducer,
            priviledge: 'UNAUTHORISED', // ta wartość zmieni się po zalogowaniu użytkownika,
            // default_avatar: createSlice({
            //     name: 'default_avatar',
            //     initialState: ""
            // }).reducer
            }
        }
    )

export default store;