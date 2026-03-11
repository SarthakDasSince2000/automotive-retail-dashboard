import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    BadgeDollarSign,
    Wrench,
    Settings,
    BarChart3,
    Package
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NAV_ITEMS = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Inventory', path: '/inventory', icon: <Car size={20} /> },
    { name: 'Sales & Deals', path: '/sales', icon: <BadgeDollarSign size={20} /> },
    { name: 'Service', path: '/service', icon: <Wrench size={20} /> },
    { name: 'Parts', path: '/parts', icon: <Package size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

const Sidebar = () => {
    const { isSidebarOpen } = useAppContext();

    return (
        <div className={`h-screen bg-white dark:bg-slate-900 border-r border-border transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
            <div className="h-16 flex items-center justify-center border-b border-border">
                {isSidebarOpen ? (
                    <Link to="/" className="text-xl font-semibold text-primary flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Car className="text-primary" /> Nexgile Auto
                    </Link>
                ) : (
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <Car className="text-primary text-xl" />
                    </Link>
                )}
            </div>

            <nav className="flex-1 py-4 flex flex-col gap-2 px-3 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-foreground'
                            }`
                        }
                        title={!isSidebarOpen ? item.name : undefined}
                    >
                        <div className="flex-shrink-0">{item.icon}</div>
                        {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
