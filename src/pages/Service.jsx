import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, PenTool, User, Edit2, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { fetchServices, addService, updateService, deleteService } from '../services/api';

const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ customer: '', vehicle: '', type: '', date: '', status: 'Pending' });

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    // Technician Schedule Data - mapped by date
    const technicianSchedule = {
        1: [
            { id: 1, name: 'John Smith', title: 'Master Technician', status: 'Available', avatar: 'JS', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 2, name: 'Sarah Jones', title: 'Diagnostic Spec.', status: 'Available', avatar: 'SJ', bgColor: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        2: [
            { id: 3, name: 'Mike Brown', title: 'Master Technician', status: 'Available', avatar: 'MB', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 4, name: 'Emily Davis', title: 'Electrical Spec.', status: 'Busy', avatar: 'ED', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200', statusBg: 'bg-blue-100', statusText: 'text-blue-700' },
            { id: 5, name: 'Robert Wilson', title: 'Engine Specialist', status: 'Available', avatar: 'RW', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        3: [
            { id: 6, name: 'Amanda Lee', title: 'Brake Specialist', status: 'Busy', avatar: 'AL', bgColor: 'bg-rose-100', textColor: 'text-rose-700', borderColor: 'border-rose-200', statusBg: 'bg-blue-100', statusText: 'text-blue-700' },
            { id: 7, name: 'David Miller', title: 'Transmission Spec.', status: 'Available', avatar: 'DM', bgColor: 'bg-cyan-100', textColor: 'text-cyan-700', borderColor: 'border-cyan-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        4: [
            { id: 1, name: 'John Smith', title: 'Master Technician', status: 'Available', avatar: 'JS', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 3, name: 'Mike Brown', title: 'Master Technician', status: 'Busy', avatar: 'MB', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', statusBg: 'bg-blue-100', statusText: 'text-blue-700' },
            { id: 8, name: 'Chris Johnson', title: 'Paint Specialist', status: 'Available', avatar: 'CJ', bgColor: 'bg-teal-100', textColor: 'text-teal-700', borderColor: 'border-teal-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        5: [
            { id: 2, name: 'Sarah Jones', title: 'Diagnostic Spec.', status: 'Available', avatar: 'SJ', bgColor: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 5, name: 'Robert Wilson', title: 'Engine Specialist', status: 'Available', avatar: 'RW', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        6: [
            { id: 4, name: 'Emily Davis', title: 'Electrical Spec.', status: 'Available', avatar: 'ED', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 6, name: 'Amanda Lee', title: 'Brake Specialist', status: 'Available', avatar: 'AL', bgColor: 'bg-rose-100', textColor: 'text-rose-700', borderColor: 'border-rose-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 7, name: 'David Miller', title: 'Transmission Spec.', status: 'Busy', avatar: 'DM', bgColor: 'bg-cyan-100', textColor: 'text-cyan-700', borderColor: 'border-cyan-200', statusBg: 'bg-blue-100', statusText: 'text-blue-700' },
        ],
        7: [
            { id: 1, name: 'John Smith', title: 'Master Technician', status: 'Available', avatar: 'JS', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        8: [
            { id: 3, name: 'Mike Brown', title: 'Master Technician', status: 'Available', avatar: 'MB', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 8, name: 'Chris Johnson', title: 'Paint Specialist', status: 'Busy', avatar: 'CJ', bgColor: 'bg-teal-100', textColor: 'text-teal-700', borderColor: 'border-teal-200', statusBg: 'bg-blue-100', statusText: 'text-blue-700' },
        ],
        9: [
            { id: 2, name: 'Sarah Jones', title: 'Diagnostic Spec.', status: 'Available', avatar: 'SJ', bgColor: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 4, name: 'Emily Davis', title: 'Electrical Spec.', status: 'Available', avatar: 'ED', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
        10: [
            { id: 5, name: 'Robert Wilson', title: 'Engine Specialist', status: 'Available', avatar: 'RW', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 6, name: 'Amanda Lee', title: 'Brake Specialist', status: 'Available', avatar: 'AL', bgColor: 'bg-rose-100', textColor: 'text-rose-700', borderColor: 'border-rose-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
            { id: 7, name: 'David Miller', title: 'Transmission Spec.', status: 'Available', avatar: 'DM', bgColor: 'bg-cyan-100', textColor: 'text-cyan-700', borderColor: 'border-cyan-200', statusBg: 'bg-green-100', statusText: 'text-green-700' },
        ],
    };

    const getTechniciansForDate = (day) => {
        return technicianSchedule[day] || [];
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
    const today = new Date().getDate();

    const openModal = (service = null) => {
        if (service) {
            setEditingId(service.id);
            setFormData(service);
        } else {
            setEditingId(null);
            setFormData({ customer: '', vehicle: '', type: '', date: '', status: 'Pending' });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updated = await updateService(editingId, formData);
                setServices(services.map(s => s.id === editingId ? updated : s));
            } else {
                const added = await addService(formData);
                setServices([...services, added]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            setServices(services.filter(s => s.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);

    const columns = [
        { header: 'Order ID', accessor: 'id', render: (val) => <span className="font-mono text-slate-500">#{val}</span> },
        { header: 'Customer', accessor: 'customer', render: (val) => <div className="flex items-center gap-2"><User size={16} className="text-slate-400" /> <span className="font-medium">{val}</span></div> },
        { header: 'Vehicle', accessor: 'vehicle' },
        { header: 'Service Type', accessor: 'type', render: (val) => <div className="flex items-center gap-2"><PenTool size={16} className="text-slate-400" /> <span>{val}</span></div> },
        { header: 'Date', accessor: 'date', render: (val) => <div className="flex items-center gap-2"><CalendarIcon size={16} className="text-slate-400" /> <span>{val}</span></div> },
        {
            header: 'Status', accessor: 'status', render: (val) => (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full flex w-fit items-center gap-1 ${val === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    val === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                    {val === 'In Progress' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>}
                    {val}
                </span>
            )
        },
        {
            header: 'Actions', accessor: 'id', render: (id, row) => (
                <div className="flex gap-2 justify-end">
                    <button onClick={() => openModal(row)} className="text-blue-500 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/40 p-1.5 rounded-md transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(id)} className="text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/40 p-1.5 rounded-md transition-colors"><Trash2 size={16} /></button>
                </div>
            )
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Service & Workshop</h1>
                    <p className="text-slate-500 text-sm">Schedule and track maintenance and repair requests</p>
                </div>
                <button onClick={() => openModal()} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-2 font-medium transition-all hover:scale-[1.02]">
                    <Clock size={18} /> New Appointment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <DataTable
                        title="Service Orders"
                        columns={columns}
                        data={services}
                        filterKey="status"
                        filterOptions={[
                            { label: 'All Statuses', value: 'All' },
                            { label: 'Pending', value: 'Pending' },
                            { label: 'In Progress', value: 'In Progress' },
                            { label: 'Completed', value: 'Completed' }
                        ]}
                    />
                </div>

                <div className="lg:col-span-1 border border-border bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 border-b border-border pb-3 flex items-center gap-2">
                        <CalendarIcon className="text-primary" size={20} /> Schedule Overview
                    </h2>

                    <div className="space-y-4 flex-1">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-border">
                            <div className="flex justify-between items-center mb-4">
                                <button onClick={prevMonth} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition-colors">&lt;</button>
                                <span className="font-semibold text-foreground">{monthName} {year}</span>
                                <button onClick={nextMonth} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition-colors">&gt;</button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
                                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {[...Array(firstDay)].map((_, i) => (
                                    <div key={`empty-${i}`} className="p-1.5" />
                                ))}
                                {[...Array(daysInMonth)].map((_, i) => {
                                    const day = i + 1;
                                    const isToday = isCurrentMonth && day === today;
                                    const isSelected = selectedDate === day;

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDate(day)}
                                            className={`p-1.5 rounded-lg cursor-pointer transition-colors 
                                                ${isSelected
                                                    ? 'bg-primary text-white font-semibold shadow-md shadow-primary/40'
                                                    : isToday
                                                        ? 'bg-slate-200 dark:bg-slate-700 font-semibold text-foreground'
                                                        : 'text-foreground hover:bg-slate-200 dark:hover:bg-slate-700'
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <h3 className="font-medium text-sm text-slate-500 uppercase tracking-wider">Day {selectedDate} Technicians</h3>
                            {getTechniciansForDate(selectedDate).length > 0 ? (
                                getTechniciansForDate(selectedDate).map((tech) => (
                                    <div key={tech.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border hover:border-primary/30 transition-all">
                                        <div className={`w-10 h-10 rounded-full ${tech.bgColor} flex items-center justify-center ${tech.textColor} font-semibold border ${tech.borderColor}`}>
                                            {tech.avatar}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-foreground">{tech.name}</p>
                                            <p className="text-xs text-slate-500">{tech.title}</p>
                                        </div>
                                        <div className={`ml-auto text-xs font-semibold ${tech.statusBg} ${tech.statusText} px-2 py-1 rounded-full`}>{tech.status}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-slate-500 text-sm">
                                    No technicians scheduled for this day
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Appointment" : "New Service Appointment"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Customer Name</label>
                            <input type="text" required value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Vehicle Details</label>
                            <input type="text" required value={formData.vehicle} onChange={e => setFormData({ ...formData, vehicle: e.target.value })} placeholder="E.g., 2023 Tesla Model 3" className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Service Required</label>
                            <input type="text" required value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} placeholder="E.g., Oil Change, Diagnostic" className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Scheduled Date</label>
                            <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground">
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark">Save Appointment</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Service;
