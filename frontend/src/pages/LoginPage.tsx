import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import logo from '../assets/logo.png';
import decorativeBg from '../assets/bg-decorative.png';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8 overflow-hidden">
            <div className="w-full max-w-6xl relative bg-white rounded-3xl overflow-hidden shadow-2xl flex min-h-[700px]">

                {/* Decorative Panel */}
                <div
                    className={`hidden lg:block absolute inset-y-0 w-1/2 bg-black transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 overflow-hidden ${isLogin ? 'right-0' : 'left-0'
                        }`}
                >
                    <img
                        src={decorativeBg}
                        alt="Decorative Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="relative h-full flex flex-col justify-center px-16 text-white">
                        <div className="mb-8">
                            <img src={logo} alt="FinTrack Logo" className="h-10 w-auto invert" />
                        </div>
                        <h2 className="text-5xl font-bold leading-tight mb-6 transition-all duration-700 delay-100">
                            {isLogin ? 'Welcome to FinTrack' : 'Join the Community'}
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-md transition-all duration-700 delay-200">
                            {isLogin
                                ? 'FinTrack helps you manage your finances with precision and ease. Join thousands of users who are taking control of their financial future.'
                                : 'Start your financial journey today. Create an account and get access to all our premium features and tracking tools.'}
                        </p>

                        <div className={`glass-card p-8 rounded-2xl max-w-md transition-all duration-1000 delay-300 ${isLogin ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'}`}>
                            <h3 className="text-2xl font-bold mb-4">
                                {isLogin ? 'Master your money' : 'Track every penny'}
                            </h3>
                            <p className="text-gray-200 mb-6">
                                {isLogin
                                    ? 'Be among the first to experience the easiest way to track expenses and set budgets.'
                                    : 'Get real-time insights into your spending habits and save more effectively.'}
                            </p>
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-400 flex items-center justify-center text-xs font-bold text-white uppercase">
                                        {`U${i}`}
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-white">
                                    +12k
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Container (Login & Register) */}
                <div className="w-full lg:w-full flex transition-all duration-700 ease-in-out relative min-h-[700px]">

                    {/* Render Both Forms but Toggle Visibility */}
                    <LoginForm onToggle={toggleMode} isActive={isLogin} />
                    <RegisterForm onToggle={toggleMode} onSuccess={() => setIsLogin(true)} isActive={!isLogin} />

                </div>
            </div>
        </div>
    );
};

export default AuthPage;
