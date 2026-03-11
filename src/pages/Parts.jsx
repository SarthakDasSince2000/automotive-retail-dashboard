import React, { useEffect, useState } from 'react';
import { Package, AlertTriangle, Plus, Edit2, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { fetchParts, addPart, updatePart, deletePart } from '../services/api';

const Parts = () => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', quantity: 0, price: 0, status: 'In Stock' });

    const openModal = (part = null) => {
        if (part) {
            setEditingId(part.id);
            setFormData(part);
        } else {
            setEditingId(null);
            setFormData({ name: '', category: '', quantity: 0, price: 0, status: 'In Stock' });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updated = await updatePart(editingId, formData);
                setParts(parts.map(p => p.id === editingId ? updated : p));
            } else {
                const added = await addPart(formData);
                setParts([...parts, added]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePart(id);
            setParts(parts.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchParts();
                setParts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const columns = [
        { header: 'ID', accessor: 'id', render: (val) => <span className="font-mono text-slate-500">#{val}</span> },
        { header: 'Part Name', accessor: 'name', render: (val) => <div className="flex items-center gap-2"><Package size={16} className="text-slate-400" /> <span className="font-medium text-foreground">{val}</span></div> },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Quantity', accessor: 'quantity', render: (val) => (
                <span className={`font-mono ${val < 15 ? 'text-red-500 font-semibold flex items-center gap-1' : 'text-slate-600 dark:text-slate-300'}`}>
                    {val < 15 && <AlertTriangle size={14} />} {val}
                </span>
            )
        },
        { header: 'Price', accessor: 'price', render: (val) => <span className="font-mono">${val.toFixed(2)}</span> },
        {
            header: 'Status', accessor: 'status', render: (val) => (
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${val === 'In Stock' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                    val === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 animate-pulse' :
                        'bg-red-100 text-red-700 dark:bg-red-900/40'
                    }`}>
                    {val}
                </span>
            )
        },
        {
            header: 'Actions', accessor: 'id', className: 'text-right', render: (id, row) => (
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
                    <h1 className="text-2xl font-semibold text-foreground">Parts Inventory</h1>
                    <p className="text-slate-500 text-sm">Manage spare parts, accessories, and supplies</p>
                </div>
                <button onClick={() => openModal()} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl shadow-lg -shadow-primary/30 flex items-center gap-2 font-medium transition-all hover:scale-[1.02]">
                    <Plus size={18} /> Add New Part
                </button>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-800/40 rounded-lg text-amber-600 dark:text-amber-500">
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-400">Low Stock Alert</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">You have 2 items running low on stock. Please consider reordering soon.</p>
                </div>
            </div>

            <DataTable
                title="Spare Parts Availability"
                columns={columns}
                data={parts}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Part" : "Add New Part"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Part Name</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Category</label>
                            <input type="text" required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Quantity</label>
                            <input type="number" required value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Price ($)</label>
                            <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground">
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark">Save Part</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Parts;
