import { createContext, useState, useContext } from "react";

export const MyContext = createContext({});

const ContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <MyContext.Provider value={{ auth, setAuth }}>
            {children}
        </MyContext.Provider>
    );
};

export default ContextProvider;