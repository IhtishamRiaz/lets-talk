import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

const useSocketContext = () => {
   return useContext(SocketContext);
};

export default useSocketContext;
