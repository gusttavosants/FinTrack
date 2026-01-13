import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import logo from '../../assets/logo.png';

interface RegisterFormProps {
    onToggle: () => void;
    onSuccess: () => void;
    isActive: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggle, onSuccess, isActive }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3333/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Account created successfully! You can now sign in.');
                onSuccess(); // Switch back to login
            } else {
                const data = await response.json();
                alert('Error: ' + (data.error || 'Registration failed'));
            }
        } catch (error) {
            alert('Failed to connect to backend. Make sure the server is running on port 3333.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] absolute inset-y-0 right-0 bg-white ${isActive
                ? 'opacity-100 translate-x-0 z-10 scale-100'
                : 'opacity-0 translate-x-20 z-0 pointer-events-none scale-95'
                }`}
        >
            <div className="mb-10">
                <img src={logo} alt="FinTrack Logo" className="h-10 w-auto mb-8" />
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Create account</h1>
                <p className="mt-2 text-gray-500">Let's get you started with FinTrack.</p>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? 'Processing...' : 'Sign up'}
                </button>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Already have an account?
                            <button
                                type="button"
                                onClick={onToggle}
                                className="ml-1 text-black font-semibold hover:underline"
                            >
                                Sign in
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

export default RegisterForm;
