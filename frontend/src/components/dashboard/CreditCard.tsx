import { Eye, Wifi } from "lucide-react";

const CreditCard = ({ balance, cardHolder }: { balance?: number, cardHolder?: string }) => {
    return (
        <div className="relative h-56 w-full rounded-2xl p-6 text-white overflow-hidden shadow-xl transition-transform hover:scale-[1.02] duration-300">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800" />

            {/* Mesh/Noise overlay for texture (optional) */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Glossy Effect */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-white/80 mb-1">Current Balance</p>
                        <h3 className="text-3xl font-bold tracking-tight">
                            {balance ? balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "$0.00"}
                        </h3>
                    </div>
                    <Wifi className="h-6 w-6 rotate-90 opacity-80" />
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                        </div>
                        <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                        </div>
                        <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                            <span className="h-2 w-2 rounded-full bg-white/40"></span>
                        </div>
                        <span className="font-mono text-lg tracking-widest">3428</span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] uppercase text-white/60 font-semibold mb-0.5">Card Holder</p>
                            <p className="font-medium tracking-wide uppercase">{cardHolder || "VALUED MEMBER"}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[10px] uppercase text-white/60 font-semibold mb-0.5">Expires</p>
                            <p className="font-medium">12/28</p>
                        </div>
                        <div className="h-8 w-12 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-md">
                            <div className="h-4 w-4 bg-red-500/80 rounded-full -mr-2"></div>
                            <div className="h-4 w-4 bg-yellow-500/80 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
