import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa';
import logo from '../../assets/logo.png';

interface LoginFormProps {
    onToggle: () => void;
    isActive: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggle, isActive }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Assuming backend is at localhost:3333
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful! Token: ' + data.token);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            alert('Failed to connect to backend. Make sure the server is running on port 3333.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] absolute inset-y-0 left-0 bg-white ${isActive
                ? 'opacity-100 translate-x-0 z-10 scale-100'
                : 'opacity-0 -translate-x-20 z-0 pointer-events-none scale-95'
                }`}
        >
            <div className="mb-10">
                <img src={logo} alt="FinTrack Logo" className="h-10 w-auto mb-8" />
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sign in</h1>
                <p className="mt-2 text-gray-500">Welcome back! Please enter your details.</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                            placeholder="johndoe@gmail.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-medium text-gray-600 hover:text-black transition-colors">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Sign in'}
                </button>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Don't have an account?
                            <button
                                type="button"
                                onClick={onToggle}
                                className="ml-1 text-black font-semibold hover:underline"
                            >
                                Sign up
                            </button>
                        </span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    {[FaGoogle, FaGithub, FaFacebook].map((Icon, idx) => (
                        <button key={idx} className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
                            <Icon className={`h-5 w-5 ${idx === 0 ? 'text-red-500' : idx === 2 ? 'text-blue-600' : 'text-gray-900'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
