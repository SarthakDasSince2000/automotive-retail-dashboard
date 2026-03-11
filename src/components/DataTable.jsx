import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

const DataTable = ({ columns, data, searchable = true, title = 'Data Table', className = '', filterOptions = [], filterKey = '' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredData = data.filter((row) => {
        const matchesSearch = columns.some((col) => {
            const val = row[col.accessor];
            return val && val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
        const matchesFilter = activeFilter === 'All' || !filterKey ? true : row[filterKey] === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-border overflow-hidden ${className}`}>
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {searchable && (
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                            />
                        </div>
                    )}
                    {filterOptions && filterOptions.length > 0 && (
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`p-2 border rounded-lg transition-colors flex items-center gap-2 ${activeFilter !== 'All' ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                <Filter size={18} />
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-border z-20 py-2 overflow-hidden">
                                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-border mb-1">
                                        Filter{filterKey ? ` by ${filterKey}` : ''}
                                    </div>
                                    {filterOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setActiveFilter(option.value);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${activeFilter === option.value ? 'bg-primary/5 text-primary font-medium' : 'text-foreground hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                        >
                                            {option.label}
                                            {activeFilter === option.value && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border text-slate-500 font-medium tracking-wide">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground">
                        {filteredData.length > 0 ? (
                            filteredData.map((row, idx) => (
                                <tr key={row.id || idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className={`px-6 py-4 ${col.className || ''}`}>
                                            {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
