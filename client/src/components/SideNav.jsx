import React from "react";
import {
   BsChatSquareDotsFill,
   BsPersonFillExclamation,
   BsPeopleFill,
} from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { cn } from "../utils/utils";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
   const items = [
      { text: "Chats", icon: BsChatSquareDotsFill, href: "/chats" },
      { text: "Friends", icon: BsPeopleFill, href: "/friends" },
      { text: "People", icon: IoIosPeople, href: "/people" },
      {
         text: "Friend Requests",
         icon: BsPersonFillExclamation,
         href: "/friend-requests",
      },
      { text: "Settings", icon: IoSettingsSharp, href: "/settings" },
   ];

   return (
      <aside className="h-screen">
         <nav className="flex flex-col h-full bg-white border-r shadow-sm">
            {/* Ul */}
            <ul className="flex-1 px-3 mt-5">
               {items.map(({ text, icon, href }, index) => {
                  return (
                     <React.Fragment key={text}>
                        <SidebarItem text={text} icon={icon} href={href} />
                        {index === 3 ? <hr className="my-3" /> : null}
                     </React.Fragment>
                  );
               })}
            </ul>
            {/* User Avatar */}
            <div className="flex p-3 border-t">
               <img
                  src="https://ui-avatars.com/api/?background=D8B4FE&color=6B21A8&bold=true"
                  alt=""
                  className="w-10 h-10 rounded-md"
               />
            </div>
         </nav>
      </aside>
   );
};

export const SidebarItem = ({ icon: Icon, text, href }) => {
   const location = useLocation();
   const path = location.pathname;
   const isActive = path === href;

   return (
      <Link to={href}>
         <li
            className={cn(
               `group relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer`,
               isActive
                  ? "bg-gradient-to-tr from-primary-200 to-primary-100 text-primary-800"
                  : "hover:bg-primary-50 text-gray-600"
            )}
         >
            {<Icon size={20} />}
            {/* Tool Tip */}
            <div className="absolute invisible px-2 py-1 ml-6 text-sm transition-all -translate-x-3 rounded-md w-max left-full bg-primary-100 text-primary-800 opacity-20 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
               {text}
            </div>
         </li>
      </Link>
   );
};

export default SideNav;
