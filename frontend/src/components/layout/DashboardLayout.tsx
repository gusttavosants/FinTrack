import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    CreditCard,
    PieChart,
    Activity,
    Settings,
    Menu,
    X,
    Bell,
    Search,
    User,
    Sun,
    Moon,
    Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FinTrackLogo from "@/components/icons/FinTrackLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: CreditCard, label: "Cards", path: "/dashboard/cards" },
    { icon: Activity, label: "Activity", path: "/dashboard/activity" },
    { icon: PieChart, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [language, setLanguage] = useState<'PT' | 'EN'>('PT');
    const location = useLocation();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'PT' ? 'EN' : 'PT');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="h-full flex flex-col p-6">
                    <div className="mb-8 flex items-center justify-between lg:justify-start">
                        <FinTrackLogo />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {sidebarItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                >
                                    <Button
                                        variant={isActive ? "secondary" : "ghost"}
                                        className={`w-full justify-start gap-3 ${isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-sidebar-border">
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <PieChart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Pro Plan</p>
                                    <p className="text-xs text-muted-foreground">Active</p>
                                </div>
                            </div>
                            <Button className="w-full text-xs" size="sm">Upgrade Now</Button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                {/* Header */}
                <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="hidden md:flex items-center relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search dashboard..."
                                className="pl-9 w-64 bg-secondary/50 border-none focus-visible:ring-1"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={toggleLanguage}
                            className="relative"
                            title={language === 'PT' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
                        >
                            <Languages className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded px-1">
                                {language}
                            </span>
                        </Button>

                        {/* Theme Toggle */}
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                            ) : (
                                <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                            )}
                        </Button>

                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                        </Button>

                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-foreground">Iago Lima</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
                            </div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>IL</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
