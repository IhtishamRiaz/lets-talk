import React, { useState } from 'react'
import { ChevronFirst, MoreVertical, LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings, ChevronLast } from 'lucide-react'
import { cn } from '../utils/utils';
import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
    const [expanded, setExpanded] = useState(true);

    const items = [
        { text: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
        { text: 'Statistics', icon: BarChart3 },
        { text: 'Accounts', icon: UserCircle, href: '/app/accounts' },
        { text: 'Inventory', icon: Boxes },
        { text: 'Orders', icon: Package },
        { text: 'Billings', icon: Receipt },
        { text: 'Settings', icon: Settings },
        { text: 'Help', icon: LifeBuoy },
    ]

    return (
        <aside className='h-screen'>
            <nav className='flex flex-col h-full bg-white border-r shadow-sm'>
                {/* Logo */}
                <div className='flex items-center justify-between p-4 pb-2'>
                    <img
                        src="https://img.logoipsum.com/262.svg"
                        alt=""
                        className={cn(`overflow-hidden transition-all`, expanded ? 'w-32' : 'w-0')}
                    />
                    <button
                        className='p-1.5 rounded-lg bg-primary-50 hover:bg-primary-100'
                        onClick={() => setExpanded(curr => !curr)}
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                {/* Ul */}
                <ul className='flex-1 px-3 mt-5'>
                    {items.map(({ text, icon, href }, index) => {
                        return (
                            <React.Fragment key={text}>
                                <SidebarItem text={text} icon={icon} expanded={expanded} href={href} />
                                {(index === 5) ? <hr className='my-3' /> : null}
                            </React.Fragment>
                        );
                    })}
                </ul>
                {/* User Avatar */}
                <div className='flex p-3 border-t'>
                    <img
                        src="https://ui-avatars.com/api/?background=D8B4FE&color=6B21A8&bold=true"
                        alt=""
                        className='w-10 h-10 rounded-md'
                    />
                    <div className={cn(`flex justify-between overflow-hidden transition-all items-center`, expanded ? 'w-52 ml-3' : 'w-0')}>
                        <div className='leading-4'>
                            <h4 className='font-bold'>John Doe</h4>
                            <span className='text-sm text-gray-600'>johndow@gmail.com</span>
                        </div>
                        <MoreVertical size={20} className='cursor-pointer' />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export const SidebarItem = ({ icon: Icon, text, expanded, href }) => {

    const location = useLocation();
    const path = location.pathname;
    const isActive = path === href;

    return (
        <Link to={href}>
            <li
                className={
                    cn(`group relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer`,
                        isActive ? 'bg-gradient-to-tr from-primary-200 to-primary-100 text-primary-800'
                            : 'hover:bg-primary-50 text-gray-600'
                    )}
            >
                {<Icon size={20} />}
                <span className={cn(`overflow-hidden transition-all`, expanded ? 'w-52 ml-3' : 'w-0')}>
                    {text}
                </span>
                {!expanded &&
                    <div
                        className='absolute invisible px-2 py-1 ml-6 text-sm transition-all -translate-x-3 rounded-md left-full bg-primary-100 text-primary-800 opacity-20 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'
                    >
                        {text}
                    </div>
                }
            </li>
        </Link>
    );
};

export default SideNav;