import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from "./pages/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import HomePage from "./pages/HomePage";
import Employee from "./pages/Employee";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<HomePage />}/>
                    <Route exact path={"employee/:id"} element={<Employee />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);