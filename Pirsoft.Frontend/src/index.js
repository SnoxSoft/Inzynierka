import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from "./pages/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Logging from "./pages/Logging";
import Employees from "./pages/Employees";
import EmployeePreRender from "./pages/employee/EmployeePreRender";
import Remind from "./pages/Remind";
import Schedule from "./pages/Schedule";
import CompanySchedule from "./pages/CompanySchedule";
import Teams from "./pages/teams/Teams";
import Absences from "./pages/Absences";
import TeamView from "./pages/teams/TeamView";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Logging />}/>
                    <Route path={"remind"} element={<Remind />}/>
                    <Route path={"employees"} element={<Employees />}/>
                    <Route path={"schedule"} element={<Schedule />}/>
                    <Route path={"company-schedule"} element={<CompanySchedule />}/>
                    <Route path={"teams"} element={<Teams />}/>
                    <Route path={"team-view/:id"} element={<TeamView />}/>
                    <Route exact path={"employee/:id"} element={<EmployeePreRender />}/>
                    <Route path={"absences"} element={<Absences />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
