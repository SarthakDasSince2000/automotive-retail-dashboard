import React, { useState } from 'react';
import { User, Bell, Palette, Shield, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
    const { theme, toggleTheme, user, updateUser } = useAppContext();
    const [activeTab, setActiveTab] = useState('profile');

    // Profile State
    const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState(user?.avatar || 'https://i.pravatar.cc/150');
    const [message, setMessage] = useState('');

    const handleSaveProfile = () => {
        updateUser({ name: `${firstName} ${lastName}`, email, avatar });
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-border flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-foreground'}`}
                    >
                        <User size={18} /> Public Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'account' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-foreground'}`}
                    >
                        <Shield size={18} /> Account Security
                    </button>
                    <button
                        onClick={() => setActiveTab('appearance')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'appearance' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-foreground'}`}
                    >
                        <Palette size={18} /> Appearance
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-foreground'}`}
                    >
                        <Bell size={18} /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('billing')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'billing' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-foreground'}`}
                    >
                        <CreditCard size={18} /> Billing Plans
                    </button>
                </div>

                {/* Settings Content */}
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-border p-8">

                    {activeTab === 'profile' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
                                <p className="text-sm text-slate-500 mt-1">Update your account's profile information and email address.</p>
                            </div>

                            <div className="flex items-center gap-6 py-4">
                                <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-primary object-cover shadow-inner bg-slate-100" />
                                <div>
                                    <label className="px-4 py-2 border border-border rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer text-foreground inline-block">
                                        Change Avatar
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = () => setAvatar(reader.result);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Role / Job Title</label>
                                    <input type="text" value={user?.role || 'User'} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" disabled />
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-border pt-6 mt-6">
                                <div className="text-green-600 dark:text-green-400 text-sm font-medium">{message}</div>
                                <button onClick={handleSaveProfile} className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl shadow-md transition-all">Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                                <p className="text-sm text-slate-500 mt-1">Customize how the portal looks on your device.</p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between items-center border border-border p-4 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors" onClick={() => theme !== 'light' && toggleTheme()}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Light Theme</p>
                                            <p className="text-sm text-slate-500">Bright and clear for daytime use</p>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 border-primary ${theme === 'light' ? 'bg-primary border-transparent ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800' : ''}`}></div>
                                </div>

                                <div className="flex justify-between items-center border border-border p-4 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors" onClick={() => theme !== 'dark' && toggleTheme()}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Dark Theme</p>
                                            <p className="text-sm text-slate-500">Easy on the eyes for low-light environments</p>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 border-primary ${theme === 'dark' ? 'bg-primary border-transparent ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                                <p className="text-sm text-slate-500 mt-1">Control how you receive alerts and updates.</p>
                            </div>

                            <div className="space-y-4 pt-4">
                                {['New Lead Assigned', 'Vehicle Sold', 'Service Request Complete', 'Low Part Inventory', 'Daily Sales Summary'].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-border py-4">
                                        <div>
                                            <p className="font-medium text-foreground">{item}</p>
                                            <p className="text-sm text-slate-500">Get notified when a {item.toLowerCase()} occurs</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked={idx !== 4} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Account Security</h2>
                                <p className="text-sm text-slate-500 mt-1">Manage your password and security settings.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 py-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">New Password</label>
                                    <input type="password" placeholder="New Password" className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Confirm New Password</label>
                                    <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                                </div>
                            </div>
                            <div className="flex justify-end border-t border-border pt-6 mt-6">
                                <button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl shadow-md transition-all">Update Password</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="space-y-6 max-w-4xl">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Billing Plans</h2>
                                <p className="text-sm text-slate-500 mt-1">Manage your subscription and billing cycle.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                {/* Basic Plan */}
                                <div className="border border-border rounded-2xl p-6 bg-slate-50 dark:bg-slate-900 flex flex-col">
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Starter</h3>
                                    <div className="text-3xl font-black text-foreground mb-4">$49<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3 mb-8 flex-1">
                                        <li>• Up to 50 vehicles</li>
                                        <li>• Basic reporting</li>
                                        <li>• Standard support</li>
                                    </ul>
                                    <button className="w-full py-2 border border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors">Downgrade</button>
                                </div>

                                {/* Pro Plan */}
                                <div className="border-2 border-primary rounded-2xl p-6 bg-white dark:bg-slate-800 flex flex-col relative shadow-lg shadow-primary/10">
                                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-xl rounded-tr-xl">CURRENT</div>
                                    <h3 className="text-lg font-semibold text-primary mb-2">Professional</h3>
                                    <div className="text-3xl font-black text-foreground mb-4">$149<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3 mb-8 flex-1">
                                        <li>• Unlimited vehicles</li>
                                        <li>• Advanced analytics</li>
                                        <li>• Priority support</li>
                                        <li>• Team collaboration</li>
                                    </ul>
                                    <button className="w-full py-2 bg-primary text-white rounded-xl font-medium block text-center opacity-70 cursor-not-allowed">Active Plan</button>
                                </div>

                                {/* Enterprise Plan */}
                                <div className="border border-border rounded-2xl p-6 bg-slate-50 dark:bg-slate-900 flex flex-col">
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise</h3>
                                    <div className="text-3xl font-black text-foreground mb-4">$399<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3 mb-8 flex-1">
                                        <li>• Multiple locations</li>
                                        <li>• Custom API access</li>
                                        <li>• Dedicated manager</li>
                                        <li>• White labeling</li>
                                    </ul>
                                    <button className="w-full py-2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">Upgrade to Enterprise</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Settings;
