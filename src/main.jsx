import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import MainTemplate from "@/components/templates/MainTemplate";
import CreateEmployee from "@/pages/CreateEmployee";
import EmployeeList from "@/pages/EmployeeList";
import Home from "@/pages/Home";
import "./styles/global.scss";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTemplate />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/employee-list" element={<EmployeeList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
