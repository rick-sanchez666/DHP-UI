import React, { useState } from "react";


const AuthContext = React.createContext({user: null, setUser: (user) => {}, auth: null, isLoggedIn : false, login : (auth) => {}, logout: () => {}});


export const AuthContextProvider =(props) => {
    let savedUser = localStorage.getItem("user");
    if(savedUser) {
        savedUser = JSON.parse(savedUser);
    }
    const [token, setToken ] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(savedUser)
    const isUserLoggedIn = !!token;

    const setAuthToken = (token) => {
        setToken(token);
        localStorage.setItem("token", token)
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    }

    const setLoggedinUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    const context = {
        token: token,
        isLoggedIn: isUserLoggedIn,
        logout: logout,
        login: setAuthToken,
        setUser: setLoggedinUser,
        user: user
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;