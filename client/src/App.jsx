import "./assets/css/App.css";
import { Outlet, Route, Routes, useLocation, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorised from "./pages/Unauthorised.jsx";
import Chats from "./pages/Chats.jsx";
import Friends from "./pages/Friends.jsx";
import People from "./pages/People.jsx";
import FriendRequests from "./pages/FriendsRequests.jsx";
import Settings from "./pages/Settings.jsx";

// Components
import SideNav from "./components/SideNav.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import useAuthStore from "./store/authStore.js";
import useAxiosPrivate from "./hooks/useAxiosPrivate.js";
import { useEffect } from "react";
import useUserStore from "./store/userStore.js";
import useChatStore from "./store/chatStore.js";
import useRequestStore from "./store/requestStore.js";
// import useSocketStore from "./store/socketStore.js";

const PageLayout = () => {
   const userId = useAuthStore((state) => state.userId);
   const location = useLocation();
   return userId ? (
      <>
         <div className="flex min-h-screen">
            <SideNav />
            <main className="min-h-screen basis-full">
               <Outlet />
            </main>
         </div>
      </>
   ) : (
      <Navigate to={"/login"} state={{ from: location }} replace />
   );
};

function App() {
   const axiosPrivate = useAxiosPrivate();
   const setAllUsers = useUserStore((state) => state.setAllUsers);
   const setAllChats = useChatStore((state) => state.setAllChats);
   const setAllRequests = useRequestStore((state) => state.setAllRequests);

   useEffect(() => {
      const prefetchData = async () => {
         const users = await axiosPrivate.get("/user");
         const chats = await axiosPrivate.get("/chat");
         const requests = await axiosPrivate.get("/request");

         setAllUsers(users.data);
         setAllChats(chats.data);
         setAllRequests(requests.data);
      };
      prefetchData();
   }, [axiosPrivate, setAllUsers, setAllChats, setAllRequests]);

   return (
      <>
         <Routes>
            <Route element={<PersistLogin />}>
               <Route path="/" element={<PageLayout />}>
                  <Route path="chats" element={<Chats />} />
                  <Route path="friends" element={<Friends />} />
                  <Route path="people" element={<People />} />
                  <Route path="friend-requests" element={<FriendRequests />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="unauthorised" element={<Unauthorised />} />
               </Route>
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </>
   );
}

export default App;
