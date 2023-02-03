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

const root = ReactDOM.createRoot(document.getElementById('root'));

function resizeToMinimum(){
    console.log("ddddddd")
    const minimum = [800, 600];
    const current = [window.outerWidth, window.outerHeight];
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    const restricted = [];
    let i = 2;

    while(i-- > 0){
        restricted[i] = minimum[i] > current[i] ? minimum[i] : current[i];
    }

    window.resizeTo(800,600);
    window.innerWidth = 600;
    window.innerHeight = 800;

}

window.addEventListener('resize', resizeToMinimum, false)


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<HomePage />}/>
                    <Route path={"employees"} element={<Employees />}/>
                    <Route exact path={"employee/:id"} element={<Employee />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
