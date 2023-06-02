import React from "react";
import { useAdminStore } from "../Store-Zustand/Admin/Admin";
import { Navigate } from "react-router";

const PrivateRoute =
  (Component) =>
  ({ ...props }) => {
    const { adminData } = useAdminStore();
    return adminData && adminData.accessToken ? <Component {...props} /> : <Navigate to="/" />;
  };

export default PrivateRoute;
