import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import CreditCard from "@/components/dashboard/CreditCard";
import { DollarSign, TrendingUp, CreditCard as CardIcon, ShoppingBag, Coffee, Smartphone, Home as HomeIcon, AlertCircle, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Icons map for dynamic categories
const ICON_MAP: Record<string, any> = {
    Electronics: ShoppingBag,
    Cafe: Coffee,
    Income: DollarSign,
    Utilities: HomeIcon,
    Service: Smartphone,
    Shopping: ShoppingBag,
    Food: Coffee,
    Transport: ArrowUp, // Placeholder
    Other: AlertCircle
};

const COLOR_MAP: Record<string, string> = {
    Electronics: "bg-blue-500 text-blue-500",
    Cafe: "bg-amber-500 text-amber-500",
    Income: "bg-green-500 text-green-500",
    Utilities: "bg-purple-500 text-purple-500",
    Service: "bg-pink-500 text-pink-500",
    Shopping: "bg-blue-500 text-blue-500",
    Food: "bg-amber-500 text-amber-500",
    Other: "bg-gray-500 text-gray-500"
};


const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [accountId, setAccountId] = useState<string | null>(null);
    const [balance, setBalance] = useState<any>(null);
    const [metrics, setMetrics] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const decoded: any = jwtDecode(token);
                const userId = decoded.sub;

                // 1. Get Account
                const accountRes = await api.get(`/accounts/${userId}`);
                const account = accountRes.data;

                if (!account) {
                    toast.error("Conta não encontrada.");
                    setLoading(false);
                    return;
                }

                setAccountId(account.id);

                // 2. Get Balance
                const balanceRes = await api.get(`/accounts/${account.id}/balance`);
                // Merging user info into balance state for convenience or just use account state
                setBalance({ ...balanceRes.data, user: account.user });

                // 3. Get Metrics (Current Month)
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

                const metricsRes = await api.get(`/accounts/${account.id}/metrics`, {
                    params: { startDate: startOfMonth, endDate: endOfMonth }
                });
                setMetrics(metricsRes.data);

                // 4. Get Recent Transactions
                const txRes = await api.get(`/transactions`, {
                    params: { accountId: account.id, limit: 5 }
                });

                // Map transactions to UI format
                const mappedTxs = txRes.data.transactions.map((tx: any) => ({
                    id: tx.id,
                    name: tx.description || "Transaction",
                    category: tx.category,
                    amount: tx.type === 'expense' ? -Number(tx.amount) : Number(tx.amount),
                    date: new Date(tx.date).toLocaleDateString(),
                    icon: ICON_MAP[tx.category] || ICON_MAP['Other'],
                    iconColor: COLOR_MAP[tx.category] || COLOR_MAP['Other']
                }));
                setTransactions(mappedTxs);

                // 5. Get Monthly Analysis for Chart
                const chartRes = await api.get(`/transactions/analytics/monthly`, {
                    params: { accountId: account.id, months: 6 }
                });

                const mappedChart = chartRes.data.map((item: any) => {
                    const [year, month] = item.month.split('-');
                    const date = new Date(parseInt(year), parseInt(month) - 1);
                    const monthName = date.toLocaleString('default', { month: 'short' });
                    return {
                        name: monthName,
                        income: item.income,
                        expense: item.expense
                    };
                });
                setChartData(mappedChart);

            } catch (error) {
                console.error("Error loading dashboard:", error);
                toast.error("Erro ao carregar dados do dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard
                            label="Total Balance"
                            value={balance?.current.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || "$0.00"}
                            trend="+0.0%"
                            trendUp={true}
                            icon={DollarSign}
                            className="bg-card"
                        />
                        <StatCard
                            label="Monthly Income"
                            value={metrics?.totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || "$0.00"}
                            trend="+0.0%"
                            trendUp={true}
                            icon={TrendingUp}
                        />
                        <StatCard
                            label="Monthly Expenses"
                            value={metrics?.totalExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || "$0.00"}
                            trend="-0.0%"
                            trendUp={false}
                            icon={CardIcon}
                        />
                    </div>

                    {/* Chart Section */}
                    {/* We need to update OverviewChart to accept data props */}
                    <OverviewChart data={chartData} />

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
                        <CreditCard balance={balance?.current} cardHolder={balance?.user?.name} />
                    </div>

                    {/* Quick Transfer */}
                    <div className="bg-card p-6 rounded-2xl border border-border">
                        <h3 className="text-lg font-bold mb-4">Quick Transfer</h3>
                        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                            <button className="flex flex-col items-center gap-2 group min-w-[60px]">
                                <div className="h-12 w-12 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center group-hover:border-primary transition-colors">
                                    <span className="text-xl text-muted-foreground group-hover:text-primary">+</span>
                                </div>
                                <span className="text-xs font-medium">Add</span>
                            </button>
                            {/* Empty state for now since we removed mock users */}
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