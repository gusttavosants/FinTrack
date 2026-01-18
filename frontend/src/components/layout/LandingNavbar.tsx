import { Link } from "react-router-dom";
import FinTrackLogo from "@/components/icons/FinTrackLogo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

const LandingNavbar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
            {/* Brand - Dark version for Light Theme */}
            <div className="flex items-center gap-2">
                <FinTrackLogo variant="dark" size="sm" />                
            </div>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
                {["Para Você", "Para Empresas", "Institucional", "Desenvolvedores"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-9 h-9"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                <Link to="/login">
                    <Button variant="outline" className="rounded-full border-border text-foreground hover:text-foreground hover:bg-accent px-6 h-9 text-sm font-medium transition-all">
                        Login
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 rounded-full px-6 h-9 text-sm font-medium shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        Sign up
                    </Button>
                </Link>
            </div>
        </nav>
    );
};

export default LandingNavbar;
