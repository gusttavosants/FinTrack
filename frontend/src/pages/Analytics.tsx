import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    PiggyBank,
    Loader2
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [weeklySpending, setWeeklySpending] = useState<any[]>([]);
    const [stats, setStats] = useState({ income: 0, expenses: 0, savingsRate: "0", netWorth: 0 });

    const fetchAnalyticsData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            const decoded: any = jwtDecode(token);
            const userId = decoded.sub;

            // 1. Get Account ID and Balance (Net Worth)
            const accountRes = await api.get(`/accounts/${userId}`);
            const accountId = accountRes.data.id;
            const balanceRes = await api.get(`/accounts/${accountId}/balance`);
            const netWorth = balanceRes.data.current ?? 0;

            // 2. Yearly/Monthly Data for AreaChart
            const monthlyRes = await api.get(`/transactions/analytics/monthly`, {
                params: { accountId, months: 6 }
            });

            const mappedMonthly = monthlyRes.data.map((item: any) => {
                const [year, month] = item.month.split('-');
                const date = new Date(parseInt(year), parseInt(month) - 1);
                const monthName = date.toLocaleString('default', { month: 'short' });
                return {
                    month: monthName,
                    income: item.income,
                    expenses: item.expense
                };
            });
            setMonthlyData(mappedMonthly);

            // Calculate totals from monthly data
            const totalIncome = mappedMonthly.reduce((sum: number, d: any) => sum + d.income, 0);
            const totalExpenses = mappedMonthly.reduce((sum: number, d: any) => sum + d.expenses, 0);
            const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : "0";

            setStats({
                income: totalIncome,
                expenses: totalExpenses,
                savingsRate,
                netWorth
            });

            // 3. Category Data (Current Month)
            // Backend endpoint expenses-by-category exists in controller
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

            const categoryRes = await api.get(`/transactions/analytics/expenses-by-category`, {
                params: { accountId, startDate: startOfMonth, endDate: endOfMonth }
            });

            // Map colors dynamically or randomly
            const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ec4899", "#8b5cf6", "#6b7280", "#ef4444", "#3b82f6"];
            const mappedCategories = categoryRes.data.map((cat: any, index: number) => ({
                name: cat.category,
                value: cat.total,
                color: COLORS[index % COLORS.length]
            }));
            setCategoryData(mappedCategories);

            // 4. Weekly Spending (Client-side calculation since endpoint was reverted)
            // Fetch last 7 days transactions
            const date7DaysAgo = new Date();
            date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);
            const weeklyTxRes = await api.get('/transactions', {
                params: {
                    accountId,
                    startDate: date7DaysAgo.toISOString(),
                    endDate: new Date().toISOString(),
                    type: 'expense', // only expenses for spending chart
                    limit: 100 // reasonably enough for a week
                }
            });

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const spendingMap: Record<string, number> = {};

            // Initialize 7 days
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dayName = days[d.getDay()];
                spendingMap[dayName] = 0;
            }

            weeklyTxRes.data.transactions.forEach((tx: any) => {
                const dayName = days[new Date(tx.date).getDay()];
                if (spendingMap[dayName] !== undefined) {
                    spendingMap[dayName] += Number(tx.amount);
                }
            });

            const mappedWeekly = Object.keys(spendingMap).map(day => ({
                day,
                amount: spendingMap[day]
            }));

            // Reorder based on today (optional, but typical is Mon-Sun or simply sequential)
            // The map keys iteration order might not be guaranteed sequential in dates, so let's rebuild array from loop
            const finalWeekly = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dayName = days[d.getDay()];
                finalWeekly.push({
                    day: dayName,
                    amount: spendingMap[dayName]
                });
            }
            setWeeklySpending(finalWeekly);

        } catch (error) {
            console.error("Error fetching analytics:", error);
            toast.error("Failed to load analytics data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalyticsData();
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
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Analytics</h1>
                        <p className="text-muted-foreground">Insights and statistics about your finances</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Last 6 months
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Income (6m)</p>
                                    <p className="text-xl font-bold">
                                        {stats.income.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </p>
                                    <p className="text-xs text-green-500 flex items-center gap-1">
                                        <ArrowUpRight className="h-3 w-3" /> +0.0%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <TrendingDown className="h-6 w-6 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Expenses (6m)</p>
                                    <p className="text-xl font-bold">
                                        {stats.expenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </p>
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <ArrowDownRight className="h-3 w-3" /> +0.0%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <PiggyBank className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Savings Rate</p>
                                    <p className="text-xl font-bold">{stats.savingsRate}%</p>
                                    <p className="text-xs text-green-500 flex items-center gap-1">
                                        <ArrowUpRight className="h-3 w-3" /> +0.0%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                    <Wallet className="h-6 w-6 text-violet-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Net Worth</p>
                                    <p className="text-xl font-bold">
                                        {stats.netWorth.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </p>
                                    <p className="text-xs text-green-500 flex items-center gap-1">
                                        <ArrowUpRight className="h-3 w-3" /> +0.0%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Income vs Expenses Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Income vs Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyData}>
                                        <defs>
                                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="month" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                                        <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                            labelStyle={{ color: 'hsl(var(--foreground))' }}
                                        />
                                        <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#incomeGradient)" strokeWidth={2} />
                                        <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expenseGradient)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Spending by Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Spending by Category (Month)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {categoryData.map((category) => (
                                    <div key={category.name} className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                                        <span className="text-xs text-muted-foreground">{category.name}</span>
                                    </div>
                                ))}
                                {categoryData.length === 0 && <p className="text-xs text-muted-foreground col-span-2 text-center">No expenses this month</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Spending and Goals */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Weekly Spending */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Spending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklySpending}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="day" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                                        <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                            labelStyle={{ color: 'hsl(var(--foreground))' }}
                                        />
                                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Savings Goals removed as there is no backend for it */}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;