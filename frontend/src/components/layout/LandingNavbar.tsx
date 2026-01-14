import { Link } from "react-router-dom";
import FinTrackLogo from "@/components/icons/FinTrackLogo";
import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
            {/* Brand - Dark version for Light Theme */}
            <div className="flex items-center gap-2">
                <FinTrackLogo variant="dark" size="sm" />
                <span className="font-bold text-xl text-neutral-900 tracking-tight">FinTrack</span>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
                {["Para Você", "Para Empresas", "Institucional", "Desenvolvedores"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                <Link to="/login">
                    <Button variant="outline" className="rounded-full border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 px-6 h-9 text-sm font-medium transition-all">
                        Login
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button className="bg-neutral-900 hover:bg-black text-white border-0 rounded-full px-6 h-9 text-sm font-medium shadow-lg shadow-neutral-900/20 transition-all hover:scale-105">
                        Sign up
                    </Button>
                </Link>
            </div>
        </nav>
    );
};

export default LandingNavbar;
