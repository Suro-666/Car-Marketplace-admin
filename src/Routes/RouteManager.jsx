import React from "react";
import { Route, Routes } from "react-router";
import Login from "../Pages/Login/Login";
import AdminPanel from "../Pages/Admin-Panel/AdminPanel";
import NotFound from "../Pages/404/NotFound";
import Users from "../Pages/Users/Users";
import Cars from "../Pages/Cars/Cars";

const RouteManager = () => {
  const routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<AdminPanel />}>
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/cars" element={<Cars />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return routes;
};

export default RouteManager;
