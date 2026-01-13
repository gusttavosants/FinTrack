import React from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

                {/* Left Side: Sign-in Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-12">                        
                        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">Sign in</h1>
                        <p className="mt-2 text-gray-500">Welcome back! Please enter your details.</p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
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
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all transform hover:scale-[1.01]"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Don't have an account? <a href="#" className="text-black font-semibold">Sign up</a></span>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center space-x-6">
                            <button className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm">
                                <FaGoogle className="h-6 w-6 text-red-500" />
                            </button>
                            <button className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm">
                                <FaGithub className="h-6 w-6 text-gray-900" />
                            </button>
                            <button className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm">
                                <FaFacebook className="h-6 w-6 text-blue-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Decorative Panel */}
                <div className="hidden lg:block relative overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-black" />
                    <div className="relative h-full flex flex-col justify-center px-12 text-white">                        
                        <h2 className="text-5xl font-bold leading-tight mb-6">
                            Welcome to FinTrack
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-md">
                            FinTrack helps you manage your finances with precision and ease. Join thousands of users who are taking control of their financial future.
                        </p>                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
