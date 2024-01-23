import axios from '../api/axios.js';
import useMyContext from './useMyContext.js';

const useLogout = () => {
    const { setAuth } = useMyContext();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.get('/auth/logout', { withCredentials: true });
        } catch (error) {
            console.error(error);
        }
    };
    return logout;
};
export default useLogout;