import axios from '../api/axios';
import useAuthStore from '../store/authStore.js';
import useUserStore from '../store/userStore.js';

const useRefreshToken = () => {
   const setUserId = useAuthStore((state) => state.setUserId);
   const setAccessToken = useAuthStore((state) => state.setAccessToken);
   const setCurrentUser = useUserStore((state) => state.setCurrentUser);

   const refresh = async () => {
      const response = await axios.get('/auth/refresh', {
         withCredentials: true
      });

      setUserId(response.data.user._id);
      setAccessToken(response.data.accessToken);
      setCurrentUser(response.data.user);

      return response.data.accessToken;
   };
   return refresh;
};

export default useRefreshToken;