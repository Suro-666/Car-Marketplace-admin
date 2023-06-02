import React from "react";
import { useAdminStore } from "../Store-Zustand/Admin/Admin";
import { Navigate } from "react-router";

const LoginRedirect =
  (Component) =>
  ({ ...props }) => {
    const { adminData } = useAdminStore();
    return adminData && adminData.accessToken ? (
      <Navigate to={"/dashboard/users"} />
    ) : (
      <Component {...props} />
    );
  };

export default LoginRedirect;
