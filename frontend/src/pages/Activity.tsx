import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Coffee,
    Smartphone,
    Home,
    Car,
    Utensils,
    Gamepad2,
    Briefcase,
    CreditCard,
    Wallet,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Icon mapping (reused from Dashboard or centralized)
const ICON_MAP: Record<string, any> = {
    Electronics: ShoppingBag,
    Cafe: Coffee,
    Income: Briefcase,
    Utilities: Home,
    Service: Smartphone,
    Shopping: ShoppingBag,
    Food: Utensils,
    Transport: Car,
    Entertainment: Gamepad2,
    Other: AlertCircle
};

const categories = ["All", "Shopping", "Food", "Transport", "Entertainment", "Utilities", "Income", "Electronics", "Service", "Cafe"];

const Activity = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [stats, setStats] = useState({ income: 0, expenses: 0, count: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchActivityData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            const decoded: any = jwtDecode(token);
            const userId = decoded.sub;

            // 1. Get Account ID
            const accountRes = await api.get(`/accounts/${userId}`);
            const accountId = accountRes.data.id;

            // 2. Get Metrics for Stat Cards (Current Month)
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

            const metricsRes = await api.get(`/accounts/${accountId}/metrics`, {
                params: { startDate: startOfMonth, endDate: endOfMonth }
            });

            // 3. Get Transactions with Filters
            const params: any = {
                accountId,
                page,
                limit,
            };

            if (selectedCategory !== "All") {
                params.category = selectedCategory;
            }

            // Note: Server-side search was reverted, so we will fetch and filter client-side if needed, 
            // but for pagination to work correctly with search, we strictly need backend support.
            // Since we can't touch backend, 'Search' will only filter the CURRENT PAGE of results 
            // OR we accept we can't search entire history effectively.
            // For now, valid implementation is to rely on backend filters. Search text will filter visual result.

            const txRes = await api.get('/transactions', { params });

            setTransactions(txRes.data.transactions);
            setTotalPages(txRes.data.pagination.totalPages);
            setStats({
                income: metricsRes.data.totalIncome,
                expenses: metricsRes.data.totalExpense,
                count: txRes.data.pagination.total
            });

        } catch (error) {
            console.error("Error fetching activity:", error);
            toast.error("Failed to load activity data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivityData();
    }, [page, selectedCategory, navigate]);

    // Client-side search (limited to fetched data)
    const filteredTransactions = transactions.filter(tx =>
        tx.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading && page === 1) {
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
                        <h1 className="text-2xl font-bold">Activity</h1>
                        <p className="text-muted-foreground">Track all your transactions and activities</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            This Month
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Income</p>
                                    <p className="text-2xl font-bold text-green-500">
                                        {stats.income.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <ArrowUpRight className="h-6 w-6 text-green-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Expenses</p>
                                    <p className="text-2xl font-bold text-red-500">
                                        {stats.expenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <ArrowDownRight className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Transactions</p>
                                    <p className="text-2xl font-bold">{stats.count}</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search in current page..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setPage(1); // Reset to first page on filter change
                                        }}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>All Transactions</span>
                            <Badge variant="secondary">{filteredTransactions.length} results</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredTransactions.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No transactions found.</p>
                            ) : (
                                filteredTransactions.map((transaction) => {
                                    const Icon = ICON_MAP[transaction.category] || ICON_MAP['Other'];
                                    const amount = Number(transaction.amount);
                                    const isExpense = transaction.type === 'expense';

                                    return (
                                        <div
                                            key={transaction.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${!isExpense ? 'bg-green-500/10' : 'bg-muted'
                                                    }`}>
                                                    <Icon className={`h-5 w-5 ${!isExpense ? 'text-green-500' : 'text-muted-foreground'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{transaction.description || "Transaction"}</p>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>{transaction.category}</span>
                                                        <span>•</span>
                                                        <span>{new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-semibold ${!isExpense ? 'text-green-500' : 'text-foreground'
                                                    }`}>
                                                    {!isExpense ? '+' : ''}{Math.abs(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                </p>
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        {new Date(transaction.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Page {page} of {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={page <= 1}
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="min-w-[40px] pointer-events-none">{page}</Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Activity;