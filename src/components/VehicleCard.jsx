import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings2, SlidersHorizontal, Tag, MapPin, Gauge, Edit2, Trash2 } from 'lucide-react';
import Modal from './Modal';

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
    const { brand, model, year, price, status } = vehicle;
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-border shadow-sm group hover:shadow-lg transition-all duration-300 flex flex-col"
            >
                <div className="relative h-48 bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for vehicle image if no real image exists */}
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 absolute opacity-50"></div>
                    {vehicle.image ? (
                        <img src={vehicle.image} alt={`${brand} ${model}`} className="w-full h-full object-cover absolute inset-0 z-0" />
                    ) : (
                        <CarPlaceholder />
                    )}

                    <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md shadow-sm ${status === 'Available' ? 'bg-green-100/90 text-green-700 dark:bg-green-900/80 dark:text-green-300'
                            : status === 'Sold' ? 'bg-red-100/90 text-red-700 dark:bg-red-900/80 dark:text-red-300'
                                : 'bg-yellow-100/90 text-yellow-700 dark:bg-yellow-900/80 dark:text-yellow-300'
                            }`}>
                            {status}
                        </span>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{brand} {model}</h3>
                            <p className="text-sm text-slate-500">{year} Edition</p>
                        </div>
                        <span className="font-semibold text-lg text-foreground">${price.toLocaleString()}</span>
                    </div>

                    <div className="w-full h-px bg-border my-4"></div>

                    <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Gauge size={14} className="text-primary/70" />
                            <span>0 miles</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Settings2 size={14} className="text-primary/70" />
                            <span>Automatic</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={14} className="text-primary/70" />
                            <span>Showroom A</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Tag size={14} className="text-primary/70" />
                            <span>New</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => setIsDetailsOpen(true)} className="flex-1 py-2 rounded-xl border border-primary text-primary font-medium hover:bg-primary/5 transition-colors text-sm">
                            Details
                        </button>
                        <button onClick={() => navigate('/sales', { state: { vehicle } })} className="flex-1 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm shadow-primary/30 text-sm">
                            Start Deal
                        </button>
                        {onEdit && (
                            <button onClick={onEdit} className="p-2 border border-border rounded-xl text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors" title="Edit Vehicle">
                                <Edit2 size={16} />
                            </button>
                        )}
                        {onDelete && (
                            <button onClick={onDelete} className="p-2 border border-border rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors" title="Delete Vehicle">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Vehicle Details">
                <div className="flex flex-col gap-6">
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 absolute opacity-50"></div>
                        {vehicle.image ? (
                            <img src={vehicle.image} alt={`${brand} ${model}`} className="w-full h-full object-cover absolute inset-0 z-0" />
                        ) : (
                            <CarPlaceholder />
                        )}
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-foreground">{year} {brand} {model}</h3>
                        <p className="text-3xl font-black text-primary mt-1">${price.toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                            <p className="font-semibold text-foreground">{status}</p>
                        </div>
                        <div className="p-3 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">VIN</p>
                            <p className="font-mono text-foreground font-semibold">1HGCM8E54KAXXXXX</p>
                        </div>
                        <div className="p-3 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Stock Number</p>
                            <p className="font-mono text-foreground font-semibold">#{vehicle.id}</p>
                        </div>
                        <div className="p-3 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Location</p>
                            <p className="font-semibold text-foreground">Showroom A</p>
                        </div>
                        <div className="p-3 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mileage</p>
                            <p className="font-semibold text-foreground">0 miles</p>
                        </div>
                        <div className="p-3 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Drivetrain</p>
                            <p className="font-semibold text-foreground">Automatic / FWD</p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border mt-2">
                        <button onClick={() => navigate('/sales', { state: { vehicle } })} className="flex-1 py-3 bg-primary text-white rounded-xl shadow-md font-medium hover:bg-primary-dark transition-colors">Start Sales Deal</button>
                        <button onClick={() => setIsDetailsOpen(false)} className="px-6 py-3 border border-border text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Close</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const CarPlaceholder = () => (
    <svg width="100" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 z-10 w-24 h-24 absolute">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
    </svg>
);

export default VehicleCard;
