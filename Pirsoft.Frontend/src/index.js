import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from "./pages/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Logging from "./pages/Logging";
import Employees from "./pages/Employees";
import EmployeePreRender from "./pages/employee/EmployeePreRender";
import RemindSendMail from "./pages/RemindSendMail";
import Schedule from "./pages/Schedule";
import CompanySchedule from "./pages/CompanySchedule";
import Teams from "./pages/teams/Teams";
import Absences from "./pages/Absences";
import TeamView from "./pages/teams/TeamView";
import TeamEdit from "./pages/teams/TeamEdit";
import TeamCreate from "./pages/teams/TeamCreate";
import Requests from "./pages/Requests";
import RemindChangePassword from "./pages/RemindChangePassword";
import Grades from "./pages/grades/Grades";
import Notifications from "./pages/notifications/Notifications";
import EmployeeSkillFinder from "./pages/EmployeeSkillFinder";
import {useState} from "react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Logging />}/>
                    <Route path={"remind"} element={<RemindSendMail />}/>
                    <Route path={"change-password/:code"} element={<RemindChangePassword />}/>
                    <Route path={"employees"} element={<Employees />}/>
                    <Route path={"schedule"} element={<Schedule />}/>
                    <Route path={"company-schedule"} element={<CompanySchedule />}/>
                    <Route path={"teams"} element={<Teams />}/>
                    <Route path={"employee-skill-finder"} element={<EmployeeSkillFinder />}/>
                    <Route path={"team-view/:id"} element={<TeamView />}/>
                    <Route path={"team-edit/:id"} element={<TeamEdit />}/>
                    <Route path={"team-create"} element={<TeamCreate />}/>
                    <Route exact path={"employee/:id"} element={<EmployeePreRender />}/>
                    <Route path={"absences"} element={<Absences />}/>
                    <Route path={"requests"} element={<Requests />}/>
                    {/*<Route path={"grades"} element={<Grades />}/>*/}
                    {/*<Route path={"notifications"} element={<Notifications />}/>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
