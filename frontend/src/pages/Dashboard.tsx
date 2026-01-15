import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import CreditCard from "@/components/dashboard/CreditCard";
import { DollarSign, TrendingUp, CreditCard as CardIcon, ShoppingBag, Coffee, Smartphone, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const transactions = [
    { id: "1", name: "Apple Store", category: "Electronics", amount: -120.50, date: "Today, 10:24 AM", icon: ShoppingBag, iconColor: "bg-blue-500 text-blue-500" },
    { id: "2", name: "Starbucks", category: "Cafe", amount: -5.40, date: "Today, 08:30 AM", icon: Coffee, iconColor: "bg-amber-500 text-amber-500" },
    { id: "3", name: "Freelance Work", category: "Income", amount: 850.00, date: "Yesterday, 4:45 PM", icon: DollarSign, iconColor: "bg-green-500 text-green-500" },
    { id: "4", name: "Electric Bill", category: "Utilities", amount: -45.00, date: "Yesterday, 1:20 PM", icon: HomeIcon, iconColor: "bg-purple-500 text-purple-500" },
    { id: "5", name: "Mobile Plan", category: "Service", amount: -25.00, date: "Jun 12, 2024", icon: Smartphone, iconColor: "bg-pink-500 text-pink-500" },
];

const quickTransfers = [
    { name: "Alex", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { name: "Sarah", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Mike", img: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
    { name: "Anna", img: "https://i.pravatar.cc/150?u=a042581f4e29026703d" },
];

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard
                            label="Total Balance"
                            value="$24,562.00"
                            trend="+2.5%"
                            trendUp={true}
                            icon={DollarSign}
                        />
                        <StatCard
                            label="Total Income"
                            value="$8,240.50"
                            trend="+4.2%"
                            trendUp={true}
                            icon={TrendingUp}
                        />
                        <StatCard
                            label="Total Expenses"
                            value="$3,450.20"
                            trend="-1.2%"
                            trendUp={false}
                            icon={CardIcon}
                        />
                    </div>

                    {/* Chart Section */}
                    <OverviewChart />

                    {/* Recent Transactions */}
                    <RecentTransactions transactions={transactions} />
                </div>

                {/* Right Column - Sidebar Widgets */}
                <div className="space-y-8">
                    {/* Credit Card Preview */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">My Cards</h3>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">+ Add Card</Button>
                        </div>
                        <CreditCard />
                    </div>

                    {/* Quick Transfer */}
                    <div className="bg-card p-6 rounded-2xl border border-border">
                        <h3 className="text-lg font-bold mb-4">Quick Transfer</h3>
                        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
                            <button className="flex flex-col items-center gap-2 group min-w-[60px]">
                                <div className="h-12 w-12 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center group-hover:border-primary transition-colors">
                                    <span className="text-xl text-muted-foreground group-hover:text-primary">+</span>
                                </div>
                                <span className="text-xs font-medium">Add</span>
                            </button>
                            {quickTransfers.map((user, idx) => (
                                <button key={idx} className="flex flex-col items-center gap-2 min-w-[60px]">
                                    <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-transparent transition-all hover:ring-primary hover:scale-105">
                                        <AvatarImage src={user.img} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium">{user.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="0.00"
                                className="flex-1 bg-secondary/50 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 ring-primary text-right font-mono font-medium"
                            />
                            <Button className="h-auto rounded-xl px-6">Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
