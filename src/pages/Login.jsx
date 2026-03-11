import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Car, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '');
    const navigate = useNavigate();
    const { loginUser } = useAppContext();

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await login(email, password);
            // Pass rememberMe flag to loginUser
            loginUser(data.user, rememberMe);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
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

            {/* Glowing Orbs for ambiance */}
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

                    <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
                    <p className="text-slate-300 text-center mb-8">Sign in to Nexgile Automotive Dealership Portal</p>

                    <form onSubmit={handleLogin} className="w-full">
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-green-100/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 p-4 rounded-xl mb-4 text-sm flex items-center gap-3"
                            >
                                <CheckCircle2 size={18} className="flex-shrink-0" />
                                <span>{successMessage}</span>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-xl mb-4 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
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
                                />
                            </div>
                        </div>

                        <div className="flex justify-start items-center mt-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="rounded text-primary focus:ring-primary w-4 h-4 bg-white/10 border-white/30"
                                />
                                <span className="text-sm text-slate-500 group-hover:text-foreground transition-colors">Remember me (stay signed in)</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-8 w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-blue-400 font-semibold transition-colors">
                            Register here
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

export default Login;
