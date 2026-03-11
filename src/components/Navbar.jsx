
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Bell, Search, UserCircle, LogOut, CheckCircle, Package, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { toggleSidebar, theme, toggleTheme, logoutUser, user } = useAppContext();
    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = useState(false);

    const initialNotifications = [
        { id: 1, title: 'New Deal Assigned', message: 'You have a new lease to process.', time: '5m ago', icon: <CheckCircle size={16} className="text-green-500" />, unread: true },
        { id: 2, title: 'Low Parts Stock', message: 'Oil filters are running low.', time: '1h ago', icon: <Package size={16} className="text-amber-500" />, unread: true },
        { id: 3, title: 'Sys Update', message: 'System maintenance scheduled.', time: '2h ago', icon: <Bell size={16} className="text-blue-500" />, unread: false },
    ];

    const [notifications, setNotifications] = useState(initialNotifications);
    const unreadCount = notifications.filter(n => n.unread).length;

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setIsSearchOpen(e.target.value.length > 0);
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: false } : n
        ));
    };

    const removeNotification = (e, id) => {
        e.stopPropagation();
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAllUnread = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
        setShowNotifications(false);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sticky top-0 z-40">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">

                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                    <Menu size={20} />
                </button>

                <div className="relative hidden md:block" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                    <input
                        type="text"
                        placeholder="Search resources, vehicles..."
                        value={searchQuery}
                        onChange={handleSearch}
                        onFocus={() => { if (searchQuery) setIsSearchOpen(true) }}
                        className="pl-10 pr-4 py-2 w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none text-sm"
                    />

                    {isSearchOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                            <div className="px-3 py-2 text-xs font-semibold text-slate-500 border-b">
                                Global Search Results
                            </div>

                            <div className="max-h-64 overflow-y-auto py-1">

                                {(searchQuery.toLowerCase().includes('tes') || searchQuery.toLowerCase().includes('model')) && (
                                    <div
                                        className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                                        onClick={() => { navigate('/inventory'); setIsSearchOpen(false); }}
                                    >
                                        <p className="text-sm font-semibold">Tesla Model 3</p>
                                        <p className="text-xs text-slate-500">In Stock • $42,000</p>
                                    </div>
                                )}

                                {(searchQuery.toLowerCase().includes('oil') || searchQuery.toLowerCase().includes('fil')) && (
                                    <div
                                        className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                                        onClick={() => { navigate('/parts'); setIsSearchOpen(false); }}
                                    >
                                        <p className="text-sm font-semibold">Oil Filter</p>
                                        <p className="text-xs text-amber-500">Low Stock • Engine Parts</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-3">

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <div className="relative">

                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 relative"
                    >
                        <Bell size={20} />

                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <>
                            <div
                                className="fixed inset-0 bg-black/30 z-[9998]"
                                onClick={() => setShowNotifications(false)}
                            />

                            <div className="fixed right-4 top-20 w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-[9999]">

                                {/* Header */}
                                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                                    <div>
                                        <h3 className="font-semibold text-lg">Notifications</h3>
                                        <p className="text-xs text-slate-500">{notifications.length} notifications</p>
                                    </div>

                                    {unreadCount > 0 && (
                                        <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                                            {unreadCount} Unread
                                        </span>
                                    )}
                                </div>

                                {/* List */}
                                <div className="max-h-96 overflow-y-auto">

                                    {notifications.map((notif) => (

                                        <div
                                            key={notif.id}
                                            onClick={() => markAsRead(notif.id)}
                                            className={`border-b border-slate-200 dark:border-slate-700 flex gap-4 p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${notif.unread ? 'bg-blue-50 dark:bg-slate-800' : ''}`}
                                        >

                                            <div className="mt-1">
                                                {notif.icon}
                                            </div>

                                            <div className="flex-1">

                                                <div className="flex justify-between">

                                                    <p className="text-sm font-semibold">
                                                        {notif.title}
                                                    </p>

                                                    <button
                                                        onClick={(e) => removeNotification(e, notif.id)}
                                                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                                                    >
                                                        <X size={14} />
                                                    </button>

                                                </div>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    {notif.message}
                                                </p>

                                                <span className="text-[11px] text-slate-400 mt-2 block">
                                                    {notif.time}
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* Footer */}
                                <div className="p-4 text-center border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                    <button
                                        onClick={clearAllUnread}
                                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        Mark all as read
                                    </button>
                                </div>

                            </div>
                        </>
                    )}

                </div>

                {/* Profile */}
                <div
                    onClick={() => navigate('/settings')}
                    className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        {user?.avatar
                            ? <img src={user.avatar} alt="profile" className="w-full h-full object-cover" />
                            : <UserCircle size={26} />}
                    </div>

                    <div className="hidden sm:block text-sm">
                        <p className="font-semibold">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-slate-500">{user?.role || 'Manager'}</p>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-red-500"
                >
                    <LogOut size={20} />
                </button>

            </div>

        </header>
    );
};

export default Navbar;

