import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calculator, UserPlus, CreditCard, CheckCircle2, Car, PartyPopper, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateVehicle, addDeal, fetchDeals } from '../services/api';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const Sales = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const vehicle = location.state?.vehicle;

    const [vehiclePrice, setVehiclePrice] = useState(vehicle?.price || 35000);
    const [downPayment, setDownPayment] = useState(5000);
    const [term, setTerm] = useState(60);
    const [interestRate, setInterestRate] = useState(4.5);
    const [financeType, setFinanceType] = useState('Purchase');
    const [customerName, setCustomerName] = useState('');

    // History State
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        fetchDeals().then(data => setDeals(data));
    }, []);

    // Approval States
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleApproveDeal = async () => {
        setIsProcessing(true);
        try {
            const dealPayload = {
                customer: customerName || 'Walk-in Customer',
                vehicle: vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Generic Vehicle',
                type: financeType,
                amount: totalFinanced
            };

            const newlyApprovedDeal = await addDeal(dealPayload);
            setDeals([newlyApprovedDeal, ...deals]);

            // Optional: Mark the specific vehicle as sold if we have it in state
            if (vehicle?.id) {
                await updateVehicle(vehicle.id, { status: 'Sold' });
            } else {
                // Just a mock network delay if no vehicle was attached
                await new Promise(resolve => setTimeout(resolve, 800));
            }
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Deal approval failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const taxRate = 0.07;
    const docFee = 500;

    const tax = vehiclePrice * taxRate;
    const totalFinanced = vehiclePrice + tax + docFee - downPayment;

    const monthlyRate = (interestRate / 100) / 12;
    const monthlyPayment = financeType === 'Purchase'
        ? (totalFinanced * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
        : (vehiclePrice - 15000) / term + (vehiclePrice + 15000) * 0.0025; // Simple lease dummy calc

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-semibold text-foreground">Sales & Deal Processing</h1>
                {vehicle && (
                    <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-full font-medium border border-indigo-100 dark:border-indigo-800 shadow-sm mt-3 sm:mt-0">
                        <Car size={18} />
                        Active Deal: {vehicle.year} {vehicle.brand} {vehicle.model}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-border shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-3">
                            <UserPlus size={20} className="text-primary" /> Customer Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
                                <input type="text" onChange={e => setCustomerName(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
                                <input type="text" onChange={e => setCustomerName(prev => prev.split(' ')[0] + ' ' + e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="john.doe@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Phone</label>
                                <input type="tel" className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="(555) 123-4567" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-border shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-3">
                            <Calculator size={20} className="text-primary" /> Structure Deal
                        </h2>

                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setFinanceType('Purchase')}
                                className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${financeType === 'Purchase' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate-500 hover:bg-slate-50 hover:border-slate-300 dark:hover:bg-slate-700/50'}`}
                            >
                                Retail Purchase
                            </button>
                            <button
                                onClick={() => setFinanceType('Lease')}
                                className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${financeType === 'Lease' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate-500 hover:bg-slate-50 hover:border-slate-300 dark:hover:bg-slate-700/50'}`}
                            >
                                Lease Option
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Vehicle Price ($)</label>
                                <input type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-semibold" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Down Payment / Trade ($)</label>
                                <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-semibold" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Term (Months)</label>
                                <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-semibold cursor-pointer">
                                    <option value={24}>24 Months</option>
                                    <option value={36}>36 Months</option>
                                    <option value={48}>48 Months</option>
                                    <option value={60}>60 Months</option>
                                    <option value={72}>72 Months</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Interest Rate (APR %)</label>
                                <input type="number" value={interestRate} step="0.1" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-semibold" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-1 shadow-lg shadow-indigo-500/20"
                    >
                        <div className="bg-white dark:bg-slate-800 rounded-[22px] p-6 h-full flex flex-col">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6 border-b border-border pb-4 w-full">
                                <CreditCard className="text-indigo-500" /> Deal Summary
                            </h2>

                            <div className="space-y-4 flex-1">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Selling Price</span>
                                    <span className="font-semibold text-foreground">${vehiclePrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Estimated Tax (7%)</span>
                                    <span className="font-semibold text-foreground">${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Doc & Fees</span>
                                    <span className="font-semibold text-foreground">${docFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-500">
                                    <span>Down Payment / Trade</span>
                                    <span className="font-semibold">-${downPayment.toLocaleString()}</span>
                                </div>

                                <div className="w-full h-px bg-border my-4"></div>

                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Amount Financed</span>
                                    <span className="font-semibold text-lg text-foreground">${totalFinanced.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>

                                <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-2xl p-6 text-center border border-indigo-100 dark:border-indigo-800">
                                    <span className="block text-indigo-600 dark:text-indigo-400 font-semibold mb-1">Estimated {financeType} Payment</span>
                                    <span className="block text-4xl font-black text-indigo-700 dark:text-indigo-300">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg text-indigo-500 font-medium">/mo</span></span>
                                </div>
                            </div>

                            <button
                                onClick={handleApproveDeal}
                                disabled={isProcessing}
                                className={`w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/30 font-semibold transition-all flex justify-center items-center gap-2 ${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {isProcessing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <CheckCircle2 size={20} />
                                )}
                                {isProcessing ? 'Processing Deal...' : 'Approve Deal'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    title={<span className="flex items-center gap-2"><History size={20} className="text-primary" /> Recent Approved Deals</span>}
                    columns={[
                        { header: 'Deal ID', accessor: 'id', render: (val) => <span className="font-mono text-slate-500">#{val}</span> },
                        { header: 'Customer', accessor: 'customer', render: (val) => <span className="font-semibold">{val}</span> },
                        { header: 'Vehicle', accessor: 'vehicle' },
                        { header: 'Date', accessor: 'date' },
                        { header: 'Type', accessor: 'type', render: (val) => <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">{val}</span> },
                        { header: 'Amount Financed', accessor: 'amount', render: (val) => <span className="text-green-600 dark:text-green-400 font-semibold">${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> },
                        { header: 'Status', accessor: 'status', render: (val) => <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">{val}</span> }
                    ]}
                    data={deals}
                />
            </div>

            <Modal isOpen={showSuccessModal} onClose={() => navigate('/inventory')} title="Deal Approved Successfully!">
                <div className="flex flex-col items-center text-center p-4">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                        <PartyPopper size={40} />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Congratulations!</h2>
                    <p className="text-slate-500 mb-8">
                        The deal for the <span className="font-semibold">{vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Vehicle'}</span> has been successfully processed and {vehicle ? 'marked as Sold' : 'recorded in the system'}.
                    </p>

                    <button
                        onClick={() => navigate('/inventory')}
                        className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-md font-medium transition-colors"
                    >
                        Return to Inventory
                    </button>
                    <button
                        onClick={() => {
                            setShowSuccessModal(false);
                            // Optionally reset form here
                        }}
                        className="w-full mt-3 py-3 border border-border text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                    >
                        Start Next Deal
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Sales;
