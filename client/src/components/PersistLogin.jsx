import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken.js";
import useAuthStore from "../store/authStore.js";

const PersistLogin = () => {
   const [isLoading, setIsLoading] = useState(true);
   const refresh = useRefreshToken();
   const accessToken = useAuthStore((state) => state.accessToken);

   useEffect(() => {
      let isMounted = true;

      const verifyRefreshToken = async () => {
         try {
            await refresh();
         } catch (error) {
            console.error(error);
         } finally {
            isMounted && setIsLoading(false);
         }
      };

      accessToken ? setIsLoading(false) : verifyRefreshToken();

      return () => (isMounted = false);
   }, [refresh, accessToken]);

   return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
