import axios from "../api/axios";
import useAuthStore from "../store/authStore.js";

const useRefreshToken = () => {
   const setUserId = useAuthStore((state) => state.setUserId);
   const setAccessToken = useAuthStore((state) => state.setAccessToken);

   const refresh = async () => {
      const response = await axios.get("/auth/refresh", {
         withCredentials: true,
      });

      setUserId(response.data.userId);
      setAccessToken(response.data.accessToken);

      return response.data.accessToken;
   };
   return refresh;
};

export default useRefreshToken;
