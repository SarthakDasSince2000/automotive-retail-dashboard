import React, { useEffect, useState } from 'react';
import { Plus, LayoutGrid, List, Edit2, Trash2 } from 'lucide-react';
import { fetchInventory, deleteVehicle, addVehicle, updateVehicle } from '../services/api';
import VehicleCard from '../components/VehicleCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ brand: '', model: '', year: new Date().getFullYear(), price: 0, status: 'Available' });

    const openModal = (vehicle = null) => {
        if (vehicle) {
            setEditingId(vehicle.id);
            setFormData(vehicle);
        } else {
            setEditingId(null);
            setFormData({ brand: '', model: '', year: new Date().getFullYear(), price: 0, status: 'Available' });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updated = await updateVehicle(editingId, formData);
                setInventory(inventory.map(v => v.id === editingId ? updated : v));
            } else {
                const added = await addVehicle(formData);
                setInventory([...inventory, added]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to save", err);
        }
    };

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const data = await fetchInventory();
                setInventory(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadInventory();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteVehicle(id);
            setInventory(inventory.filter(v => v.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredInventory = inventory.filter(v => {
        const matchesStatus = filterStatus === 'All' || v.status === filterStatus;
        const matchesSearch = v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.model.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const columns = [
        {
            header: 'Image', accessor: 'image', render: (val, row) => (
                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center shrink-0 border border-border">
                    {val ? <img src={val} alt={row.brand} className="w-full h-full object-cover" /> : <div className="text-[10px] text-slate-400 font-bold uppercase">No Img</div>}
                </div>
            )
        },
        { header: 'ID', accessor: 'id' },
        { header: 'Brand', accessor: 'brand' },
        { header: 'Model', accessor: 'model' },
        { header: 'Year', accessor: 'year' },
        { header: 'Price', accessor: 'price', render: (val) => `$${val.toLocaleString()}` },
        {
            header: 'Status', accessor: 'status', render: (val) => (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${val === 'Available' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    val === 'Sold' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
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
                    <h1 className="text-2xl font-semibold text-foreground">Vehicle Inventory</h1>
                    <p className="text-slate-500 text-sm">Manage and track your dealership's stock</p>
                </div>
                <button onClick={() => openModal()} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl shadow-lg -shadow-primary/30 flex items-center gap-2 font-medium transition-all hover:scale-[1.02]">
                    <Plus size={18} /> Add Vehicle
                </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-border shadow-sm">
                {viewMode === 'grid' ? (
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search brand or model..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 sm:w-64 px-4 py-2 border border-border bg-slate-50 dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-border bg-slate-50 dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Available">Available</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>
                ) : (
                    <div className="hidden sm:block flex-1"></div>
                )}

                <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p - 1.5 rounded - md transition - colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 hover:text-foreground'} `}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p - 1.5 rounded - md transition - colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 hover:text-foreground'} `}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredInventory.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} onEdit={() => openModal(vehicle)} onDelete={() => handleDelete(vehicle.id)} />
                    ))}
                    {filteredInventory.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">No vehicles found.</div>
                    )}
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={inventory}
                    searchable={true}
                    filterOptions={[
                        { label: 'All', value: 'All' },
                        { label: 'Available', value: 'Available' },
                        { label: 'In Transit', value: 'In Transit' },
                        { label: 'Sold', value: 'Sold' }
                    ]}
                    filterKey="status"
                    title="Inventory List"
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Vehicle" : "Add New Vehicle"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Brand</label>
                            <input type="text" required value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Model</label>
                            <input type="text" required value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Year</label>
                            <input type="number" required value={formData.year} onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Price ($)</label>
                            <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Image URL (Optional)</label>
                            <input type="text" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 text-foreground">
                                <option value="Available">Available</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Sold">Sold</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark">Save Vehicle</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Inventory;
