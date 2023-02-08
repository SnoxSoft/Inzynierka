import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from "./pages/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import HomePage from "./pages/HomePage";
import Employee from "./pages/Employee";
import Employees from "./pages/Employees";
import SkillsList from "./components/employee/fields/SkillsList";
import SkillsChangeFrame from "./components/employee/SkillsChangeFrame";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<HomePage />}/>
                    <Route path={"employees"} element={<Employees />}/>
                    <Route exact path={"employee/:mode/:id"} element={<Employee />}/>
                    <Route path={"employee/:mode/:id/skills"} element={<SkillsChangeFrame />}/>

                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
