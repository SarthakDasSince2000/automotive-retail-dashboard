import React from 'react';
import { motion } from 'framer-motion';

const KpiCard = ({ title, value, icon, description, trend, trendUp }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-4 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="flex justify-between items-start z-10">
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-medium text-foreground">{value}</h3>
                </div>
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    {icon}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-2 z-10">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
                    {trendUp ? '+' : '-'}{trend}
                </span>
                <span className="text-slate-400 text-xs">{description}</span>
            </div>
        </motion.div>
    );
};

export default KpiCard;
