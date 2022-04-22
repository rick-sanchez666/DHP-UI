import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../services/auth-context";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = (props) => {
    const authContext = useContext(AuthContext);
    const isUserLoggedIn = authContext.isLoggedIn;
    const role = authContext.user && authContext.user['role'];

    if(!isUserLoggedIn) {
        return <Navigate replace to={props.redirectPath} />
    }

    if(role != props.role) {
        return <AccessDenied />
    }

        return props.element;
}

export default ProtectedRoute;