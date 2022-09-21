import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext } from "react";
import { auth } from "../../Base/Base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

