import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { fetchDashboardStats } from '../services/api';

const Analytics = () => {
    const [salesData, setSalesData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [customerActivity, setCustomerActivity] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [radarData, setRadarData] = useState([]);
    const [timeRange, setTimeRange] = useState('Last 30 Days');

    const loadDataForRange = (range) => {
        if (range === 'Last 30 Days') {
            setSalesData([
                { name: 'Week 1', sales: 1200, target: 1500 },
                { name: 'Week 2', sales: 1800, target: 1600 },
                { name: 'Week 3', sales: 1500, target: 1700 },
                { name: 'Week 4', sales: 2100, target: 1800 },
            ]);
            setPieData([
                { name: 'SUVs', value: 85 },
                { name: 'Sedans', value: 65 },
                { name: 'Trucks', value: 40 },
                { name: 'EVs', value: 95 },
                { name: 'Hybrids', value: 45 },
                { name: 'Coupes', value: 20 },
            ]);
            setCustomerActivity([
                { name: 'W1', website: 1000, showroom: 600, referrals: 250 },
                { name: 'W2', website: 1200, showroom: 700, referrals: 300 },
                { name: 'W3', website: 1100, showroom: 800, referrals: 280 },
                { name: 'W4', website: 1400, showroom: 950, referrals: 350 },
            ]);
            setServiceData([
                { name: 'Mon', incoming: 25, completed: 20 },
                { name: 'Tue', incoming: 30, completed: 28 },
                { name: 'Wed', incoming: 35, completed: 32 },
                { name: 'Thu', incoming: 28, completed: 30 },
                { name: 'Fri', incoming: 40, completed: 35 },
            ]);
            setRadarData([
                { subject: 'Sales Volume', A: 130, B: 115, fullMark: 150 },
                { subject: 'Customer Sat.', A: 110, B: 125, fullMark: 150 },
                { subject: 'Service Speed', A: 90, B: 135, fullMark: 150 },
                { subject: 'Inventory Turn', A: 105, B: 110, fullMark: 150 },
                { subject: 'Profit Margin', A: 95, B: 100, fullMark: 150 },
                { subject: 'Lead Conversion', A: 75, B: 90, fullMark: 150 },
            ]);
        } else if (range === 'This Quarter') {
            setSalesData([
                { name: 'Month 1', sales: 4000, target: 4500 },
                { name: 'Month 2', sales: 5500, target: 5000 },
                { name: 'Month 3', sales: 6200, target: 5800 },
            ]);
            setPieData([
                { name: 'SUVs', value: 250 },
                { name: 'Sedans', value: 180 },
                { name: 'Trucks', value: 120 },
                { name: 'EVs', value: 280 },
                { name: 'Hybrids', value: 140 },
                { name: 'Coupes', value: 60 },
            ]);
            setCustomerActivity([
                { name: 'M1', website: 3500, showroom: 2100, referrals: 800 },
                { name: 'M2', website: 4200, showroom: 2500, referrals: 1000 },
                { name: 'M3', website: 5000, showroom: 3000, referrals: 1200 },
            ]);
            setServiceData([
                { name: 'W1', incoming: 120, completed: 110 },
                { name: 'W2', incoming: 150, completed: 130 },
                { name: 'W3', incoming: 140, completed: 145 },
                { name: 'W4', incoming: 160, completed: 150 },
            ]);
            setRadarData([
                { subject: 'Sales Volume', A: 120, B: 110, fullMark: 150 },
                { subject: 'Customer Sat.', A: 98, B: 130, fullMark: 150 },
                { subject: 'Service Speed', A: 86, B: 130, fullMark: 150 },
                { subject: 'Inventory Turn', A: 99, B: 100, fullMark: 150 },
                { subject: 'Profit Margin', A: 85, B: 90, fullMark: 150 },
                { subject: 'Lead Conversion', A: 65, B: 85, fullMark: 150 },
            ]);
        } else if (range === 'This Year') {
            setSalesData([
                { name: 'Jan', sales: 4000, target: 4500 },
                { name: 'Feb', sales: 3000, target: 3500 },
                { name: 'Mar', sales: 5000, target: 4800 },
                { name: 'Apr', sales: 6500, target: 6000 },
                { name: 'May', sales: 4800, target: 5500 },
                { name: 'Jun', sales: 7000, target: 6500 },
                { name: 'Jul', sales: 8200, target: 7000 },
                { name: 'Aug', sales: 7800, target: 7500 },
                { name: 'Sep', sales: 6500, target: 8000 },
                { name: 'Oct', sales: 8500, target: 8500 },
                { name: 'Nov', sales: 9000, target: 9000 },
                { name: 'Dec', sales: 11000, target: 10500 },
            ]);
            setPieData([
                { name: 'SUVs', value: 1250 },
                { name: 'Sedans', value: 900 },
                { name: 'Trucks', value: 600 },
                { name: 'EVs', value: 1400 },
                { name: 'Hybrids', value: 700 },
                { name: 'Coupes', value: 300 },
            ]);
            setCustomerActivity([
                { name: 'Q1', website: 12500, showroom: 8400, referrals: 3700 },
                { name: 'Q2', website: 18000, showroom: 12500, referrals: 6500 },
                { name: 'Q3', website: 21000, showroom: 14000, referrals: 8000 },
                { name: 'Q4', website: 26000, showroom: 18000, referrals: 11000 },
            ]);
            setServiceData([
                { name: 'Jan', incoming: 480, completed: 450 },
                { name: 'Feb', incoming: 520, completed: 500 },
                { name: 'Mar', incoming: 600, completed: 580 },
                { name: 'Apr', incoming: 550, completed: 560 },
                { name: 'May', incoming: 620, completed: 600 },
                { name: 'Jun', incoming: 700, completed: 680 },
            ]);
            setRadarData([
                { subject: 'Sales Volume', A: 140, B: 125, fullMark: 150 },
                { subject: 'Customer Sat.', A: 120, B: 140, fullMark: 150 },
                { subject: 'Service Speed', A: 100, B: 145, fullMark: 150 },
                { subject: 'Inventory Turn', A: 115, B: 110, fullMark: 150 },
                { subject: 'Profit Margin', A: 110, B: 105, fullMark: 150 },
                { subject: 'Lead Conversion', A: 85, B: 100, fullMark: 150 },
            ]);
        } else {
            // All Time
            setSalesData([
                { name: '2020', sales: 45000, target: 50000 },
                { name: '2021', sales: 62000, target: 60000 },
                { name: '2022', sales: 85000, target: 80000 },
                { name: '2023', sales: 110000, target: 100000 },
                { name: '2024', sales: 135000, target: 125000 },
            ]);
            setPieData([
                { name: 'SUVs', value: 4500 },
                { name: 'Sedans', value: 3800 },
                { name: 'Trucks', value: 2100 },
                { name: 'EVs', value: 4200 },
                { name: 'Hybrids', value: 2500 },
                { name: 'Coupes', value: 1200 },
            ]);
            setCustomerActivity([
                { name: '2020', website: 45000, showroom: 28000, referrals: 11000 },
                { name: '2021', website: 68000, showroom: 35000, referrals: 18000 },
                { name: '2022', website: 92000, showroom: 48000, referrals: 26000 },
                { name: '2023', website: 125000, showroom: 62000, referrals: 35000 },
                { name: '2024', website: 160000, showroom: 75000, referrals: 48000 },
            ]);
            setServiceData([
                { name: '2021', incoming: 4800, completed: 4700 },
                { name: '2022', incoming: 6200, completed: 6000 },
                { name: '2023', incoming: 8500, completed: 8300 },
                { name: '2024', incoming: 10200, completed: 9900 },
            ]);
            setRadarData([
                { subject: 'Sales Volume', A: 150, B: 140, fullMark: 150 },
                { subject: 'Customer Sat.', A: 130, B: 145, fullMark: 150 },
                { subject: 'Service Speed', A: 110, B: 145, fullMark: 150 },
                { subject: 'Inventory Turn', A: 135, B: 125, fullMark: 150 },
                { subject: 'Profit Margin', A: 125, B: 120, fullMark: 150 },
                { subject: 'Lead Conversion', A: 100, B: 115, fullMark: 150 },
            ]);
        }
    };

    useEffect(() => {
        loadDataForRange(timeRange);
    }, []);

    const handleTimeRangeChange = (e) => {
        const val = e.target.value;
        setTimeRange(val);
        loadDataForRange(val);
    };

    const handleExport = () => {
        window.print();
    };

    const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-border shadow-xl">
                    <p className="font-semibold text-foreground mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-sm text-slate-500 capitalize">{entry.name}:</span>
                            <span className="text-sm font-semibold text-foreground">
                                {entry.name.toLowerCase().includes('sales') || entry.name.toLowerCase().includes('target')
                                    ? `$${entry.value.toLocaleString()}`
                                    : entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Business Analytics Hub</h1>
                    <p className="text-slate-500 text-sm">Deep dive into dealership performance metrics across departments</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-border rounded-lg text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                    >
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="This Quarter">This Quarter</option>
                        <option value="This Year">This Year</option>
                        <option value="All Time">All Time</option>
                    </select>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium shadow-md transition-all"
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Revenue vs Targets (Composed Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-border flex flex-col items-center xl:col-span-2 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="w-full flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Revenue vs Targets (YTD)</h2>
                        <span className="text-green-500 text-sm font-semibold bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">+14.2% Growth</span>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                        <ComposedChart data={salesData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} dx={-10} tickFormatter={(val) => `$${val / 1000}k`} fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                            <Bar dataKey="target" name="Target Goal" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={30} className="dark:fill-slate-700" />
                            <Area type="monotone" dataKey="sales" name="Actual Sales" fill="url(#colorSales)" stroke="#3b82f6" strokeWidth={3} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Dealership Performance Radar */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-border flex flex-col items-center shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
                    <h2 className="text-lg font-semibold w-full text-left mb-2 text-foreground">Performance Radar</h2>
                    <p className="w-full text-left text-xs text-slate-500 mb-4">Comparing Dept A vs Dept B capabilities</p>
                    <ResponsiveContainer width="100%" height={320}>
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-700" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend iconType="circle" />
                            <Radar name="Dept A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                            <Radar name="Dept B" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Inventory Breakdown (Pie Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-border flex flex-col items-center shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
                    <h2 className="text-lg font-semibold w-full text-left mb-6 text-foreground">Inventory Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontWeight: 600 }} />
                            <Legend iconType="circle" verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center text for donut */}
                    <div className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="block text-3xl font-black text-foreground">{pieData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}</span>
                        <span className="block text-xs text-slate-500 uppercase font-semibold tracking-widest mt-1">Total Cars</span>
                    </div>
                </div>

                {/* Customer Acquisition Channels (Stacked Bar Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-border flex flex-col items-center lg:col-span-2 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="w-full flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Lead Generation Channels</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={customerActivity} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} dx={-10} fontSize={12} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="website" name="Website Traffic" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={40} />
                            <Bar dataKey="showroom" name="Showroom Walk-ins" stackId="a" fill="#10b981" />
                            <Bar dataKey="referrals" name="Referrals & Partners" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Service Department Efficiency (Area Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-border flex flex-col items-center lg:col-span-3 xl:col-span-3 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-pink-500/10 transition-colors"></div>
                    <div className="w-full flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Service Department Workload (Last 5 Weeks)</h2>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="flex items-center gap-2 text-pink-500"><div className="w-3 h-3 rounded-full bg-pink-500"></div> Incoming</span>
                            <span className="flex items-center gap-2 text-indigo-500"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Completed</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={serviceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700/50" />
                            <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} dx={-10} fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="incoming" name="Incoming Vehicles" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorIncoming)" />
                            <Area type="monotone" dataKey="completed" name="Completed Services" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Analytics;
