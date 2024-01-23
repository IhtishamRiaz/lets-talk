import { useEffect, useState } from 'react';
import useMyContext from '../hooks/useMyContext.js';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken.js';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useMyContext();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.error(error)
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    );
}

export default PersistLogin;