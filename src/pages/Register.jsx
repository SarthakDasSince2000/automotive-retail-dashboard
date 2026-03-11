import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { register } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await register(name, email, password);
            navigate('/login', { state: { successMessage: 'Account created successfully! Please sign in.' } });
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0f172a]">
            {/* Premium Blurred Image Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2000&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover filter blur-md scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-slate-900/70 dark:bg-slate-950/80 transition-colors duration-500"></div>
            </div>

            {/* Glowing Orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/30 blur-[100px] z-0 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/30 blur-[120px] z-0 pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md z-10"
            >
                <div className="backdrop-blur-2xl bg-white/10 dark:bg-slate-900/50 rounded-[2.5rem] p-10 flex flex-col items-center border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/40 mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 transform -translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
                        <Car size={32} className="text-white z-10" />
                    </div>

                    <h1 className="text-3xl font-semibold text-white mb-2 text-center">Create Account</h1>
                    <p className="text-slate-300 text-center mb-8">Join the Nexgile Automotive Dealership Portal</p>

                    <form onSubmit={handleRegister} className="w-full">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-4 text-sm text-center backdrop-blur-md"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 text-white placeholder-slate-400 transition-all shadow-inner"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 text-white placeholder-slate-400 transition-all shadow-inner"
                                    placeholder="Email address"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 text-white placeholder-slate-400 transition-all shadow-inner"
                                    placeholder="Password"
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 text-white placeholder-slate-400 transition-all shadow-inner"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>

                            {password.length > 0 && (
                                <div className="pt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-slate-300 font-medium">Password Strength</span>
                                        <span className={`text-xs font-semibold ${password.length >= 8 ? 'text-green-400' : 'text-amber-400'}`}>
                                            {password.length >= 8 ? 'Strong' : 'Weak'}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${password.length >= 8 ? 'bg-green-500 w-full' : password.length >= 4 ? 'bg-amber-500 w-1/2' : 'bg-red-500 w-1/4'}`}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-8 w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Register <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-blue-400 font-semibold transition-colors">
                            Sign in here
                        </Link>
                    </div>
                </div>

                <p className="text-center text-slate-400/80 text-sm mt-8 drop-shadow-md">
                    © 2024 Nexgile Automotive Portal. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
