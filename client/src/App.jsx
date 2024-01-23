import './assets/css/App.css';
import { Outlet, Route, Routes, useLocation, Navigate } from 'react-router-dom';
// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Accounts from './pages/Accounts';
import Unauthorised from './pages/Unauthorised.jsx';

// Components
import SideNav from './components/SideNav.jsx';
import useAuthStore from './store/authStore.js';
import PersistLogin from './components/PersistLogin.jsx';

const PageLayout = () => {
   return (
      <>
         <div className='flex min-h-screen'>
            <SideNav />
            <main className='min-h-screen px-8 py-5 border basis-full'>
               <Outlet />
            </main>
         </div>
      </>
   );
};

const RequireAuth = () => {
   const userId = useAuthStore((state) => state.userId);
   const location = useLocation();

   return (
      userId
         ? <Outlet />
         : < Navigate to={'/login'} state={{ from: location }} replace />
   );
};

function App() {
   return (
      <>
         <Routes>
            <Route element={<PersistLogin />}>
               <Route path='/app' element={<PageLayout />}>
                  <Route element={<RequireAuth />}>
                     <Route path='accounts' element={<Accounts />} />
                     <Route path='unauthorised' element={<Unauthorised />} />
                  </Route>
               </Route>
            </Route>

            {/* Public Routes */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
         </Routes>
      </>
   );
}

export default App;
