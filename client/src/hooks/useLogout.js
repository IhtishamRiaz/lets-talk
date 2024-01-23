import axios from '../api/axios.js';
import useAuthStore from '../store/authStore.js';

const useLogout = () => {
   const setUserId = useAuthStore((state) => state.setUserId);
   const setAccessToken = useAuthStore((state) => state.setAccessToken);

   const logout = async () => {
      setUserId('');
      setAccessToken('');
      try {
         await axios.get('/auth/logout', { withCredentials: true });
      } catch (error) {
         console.error(error);
      }
   };
   return logout;
};
export default useLogout;