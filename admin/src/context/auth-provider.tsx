import axios from "axios";
import { useEffect, useMemo, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import AuthContext from "./auth-context";

// Define the props for the AuthProvider component
interface AuthProviderProps {
    children: ReactNode;
}


const AuthProvider = ({ children }: AuthProviderProps) => {
    // State to hold the authentication token
    const [token, setToken_] = useState<string | null>(Cookies.get("token") || null);

    // Function to set the authentication token
    const setToken = (newToken: string | null) => {
        setToken_(newToken);
        if (newToken) Cookies.set("token", newToken, { expires: 0.25 });
        else Cookies.remove("token");
    };

    const logout = () => {
        setToken_(null);
        Cookies.remove("token");
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            logout
        }),
        [token]
    );

    // Provide the authentication context to the children components
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;