import axios from '../api/axios';
import useMyContext from './useMyContext.js';

const useRefreshToken = () => {
    const { setAuth } = useMyContext();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        setAuth((prevState) => {
            return {
                ...prevState,
                role: response.data.role,
                userId: response.data.userId,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;