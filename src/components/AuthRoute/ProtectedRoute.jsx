import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useSelector((state) => state?.users);
  if (!userAuth?.userInfo?.token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
