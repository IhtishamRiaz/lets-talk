import { useContext } from "react";
import { MyContext } from "../context/ContextProvider";

const useMyContext = () => {
    const context = useContext(MyContext);
    return context;
};

export default useMyContext;