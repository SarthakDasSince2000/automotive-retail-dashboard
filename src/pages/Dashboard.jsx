import React, { useEffect, useState } from 'react';
import { Car, BadgeDollarSign, Wrench, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import KpiCard from '../components/KpiCard';
import { SalesChart } from '../components/Charts';
import DataTable from '../components/DataTable';
import { fetchDashboardStats, fetchInventory } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [dashData, invData] = await Promise.all([
                    fetchDashboardStats(),
                    fetchInventory()
                ]);
                setStats(dashData);
                setInventory(invData.slice(0, 4)); // Show only top 4
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    const columns = [
        { header: 'Vehicle', accessor: 'brand', render: (val, row) => <span className="font-semibold">{row.brand} {row.model}</span> },
        {
            header: 'Status', accessor: 'status', render: (val) => (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${val === 'Available' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                    val === 'Sold' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
                    }`}>
                    {val}
                </span>
            )
        },
        { header: 'Price', accessor: 'price', render: (val) => <span>${val.toLocaleString()}</span> }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <button onClick={() => window.print()} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-primary/20 text-sm font-medium">
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <KpiCard
                    title="Total Vehicles"
                    value={stats?.totalVehicles}
                    icon={<Car size={24} />}
                    description="vs last month"
                    trend="12.5%"
                    trendUp={true}
                />
                <KpiCard
                    title="Sales This Month"
                    value={stats?.salesThisMonth}
                    icon={<BadgeDollarSign size={24} />}
                    description="vs last month"
                    trend="4.2%"
                    trendUp={true}
                />
                <KpiCard
                    title="Active Services"
                    value={stats?.activeService}
                    icon={<Wrench size={24} />}
                    description="vs last month"
                    trend="2.1%"
                    trendUp={false}
                />
                <KpiCard
                    title="Total Revenue"
                    value={`$${(stats?.revenue / 1000).toFixed(1)}k`}
                    icon={<TrendingUp size={24} />}
                    description="vs last month"
                    trend="18.3%"
                    trendUp={true}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 w-full h-full flex flex-col">
                    {stats?.salesChart && <SalesChart data={stats.salesChart} className="h-full flex-1" />}
                </div>
                <div className="xl:col-span-1 w-full h-full flex flex-col">
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <DataTable
                            title="Recent Inventory"
                            columns={columns}
                            data={inventory}
                            searchable={false}
                            filterKey="status"
                            filterOptions={[
                                { label: 'All Statuses', value: 'All' },
                                { label: 'Available', value: 'Available' },
                                { label: 'Sold', value: 'Sold' },
                                { label: 'In Transit', value: 'In Transit' }
                            ]}
                            className="h-full flex flex-col"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
