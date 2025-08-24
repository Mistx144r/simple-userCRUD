import { Navigate, Outlet } from "react-router-dom";
import { isUserAuthenticated } from "./auth";

const PrivateRoute = () => {
  return isUserAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
