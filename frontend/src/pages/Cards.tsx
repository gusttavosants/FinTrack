import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Eye,
    EyeOff,
    Lock,
    Unlock,
    MoreVertical,
    Wifi,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Utensils,
    Car,
    Gamepad2,
    Plus,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface CardData {
    id: string;
    name: string;
    number: string;
    balance: number;
    limit: number;
    expiryDate: string;
    type: "visa" | "mastercard";
    color: string;
    isLocked: boolean;
}

const Cards = () => {
    const [loading, setLoading] = useState(true);
    const [showBalances, setShowBalances] = useState(true);
    const [cards, setCards] = useState<CardData[]>([]);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

    // Mock data generation simulated as API call
    useEffect(() => {
        const fetchCards = () => {
            // Simulate API delay
            setTimeout(() => {
                const mockCards: CardData[] = [
                    {
                        id: "1",
                        name: "Main Card",
                        number: "4532 •••• •••• 7842",
                        balance: 12450.00,
                        limit: 25000,
                        expiryDate: "12/26",
                        type: "visa",
                        color: "from-primary to-primary/60",
                        isLocked: false
                    },
                    {
                        id: "2",
                        name: "Savings Card",
                        number: "5412 •••• •••• 3291",
                        balance: 8240.50,
                        limit: 15000,
                        expiryDate: "08/25",
                        type: "mastercard",
                        color: "from-violet-600 to-purple-500",
                        isLocked: false
                    },
                    {
                        id: "3",
                        name: "Business Card",
                        number: "4916 •••• •••• 5523",
                        balance: 3871.20,
                        limit: 50000,
                        expiryDate: "03/27",
                        type: "visa",
                        color: "from-emerald-600 to-teal-500",
                        isLocked: true
                    }
                ];
                setCards(mockCards);
                setSelectedCard(mockCards[0]);
                setLoading(false);
            }, 1000);
        };

        fetchCards();
    }, []);

    const spendingCategories = [
        { name: "Shopping", amount: 1250.00, percentage: 35, icon: ShoppingBag, color: "bg-blue-500" },
        { name: "Food & Dining", amount: 820.50, percentage: 23, icon: Utensils, color: "bg-orange-500" },
        { name: "Transport", amount: 450.00, percentage: 13, icon: Car, color: "bg-green-500" },
    ];

    const recentCardActivity = [
        { id: "1", description: "Online Purchase", amount: -89.99, date: "Today, 2:30 PM", type: "debit" },
        { id: "2", description: "Salary Deposit", amount: 4500.00, date: "Today, 9:00 AM", type: "credit" },
        { id: "3", description: "Subscription", amount: -14.99, date: "Yesterday", type: "debit" },
    ];

    const toggleLock = (cardId: string) => {
        setCards(cards.map(c => {
            if (c.id === cardId) {
                const newStatus = !c.isLocked;
                toast.success(`Card ${newStatus ? 'locked' : 'unlocked'} successfully`);
                return { ...c, isLocked: newStatus };
            }
            return c;
        }));
        if (selectedCard && selectedCard.id === cardId) {
            setSelectedCard(prev => prev ? { ...prev, isLocked: !prev.isLocked } : null);
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!selectedCard) return null;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">My Cards</h1>
                        <p className="text-muted-foreground">Manage your credit and debit cards (Simulation)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowBalances(!showBalances)}
                        >
                            {showBalances ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                            {showBalances ? "Hide" : "Show"} Balances
                        </Button>
                        <Button size="sm" onClick={() => toast.info("Add Card feature is currently simulated")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Card
                        </Button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${card.color} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${selectedCard.id === card.id ? 'ring-2 ring-white/50' : ''}`}
                            onClick={() => setSelectedCard(card)}
                        >
                            {card.isLocked && (
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <Lock className="h-8 w-8 mx-auto mb-2 text-white/80" />
                                        <p className="text-sm text-white/80">Card Locked</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <p className="text-white/70 text-sm">{card.name}</p>
                                    <p className="text-white text-2xl font-bold mt-1">
                                        {showBalances ? `$${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Wifi className="h-5 w-5 text-white/70 rotate-90" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-white font-mono tracking-wider">{card.number}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/60 text-xs">Expires</p>
                                        <p className="text-white text-sm">{card.expiryDate}</p>
                                    </div>
                                    <div className="text-right">
                                        {card.type === "visa" ? (
                                            <span className="text-white font-bold text-xl italic">VISA</span>
                                        ) : (
                                            <div className="flex">
                                                <div className="h-6 w-6 rounded-full bg-red-500 opacity-80" />
                                                <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-80 -ml-2" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Card Details */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Card Details</CardTitle>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => toggleLock(selectedCard.id)}>
                                    {selectedCard.isLocked ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                                    {selectedCard.isLocked ? "Unlock" : "Lock"} Card
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Spending Limit */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-muted-foreground">Spending Limit</span>
                                    <span className="text-sm font-medium">
                                        ${selectedCard.balance.toLocaleString()} / ${selectedCard.limit.toLocaleString()}
                                    </span>
                                </div>
                                <Progress value={(selectedCard.balance / selectedCard.limit) * 100} className="h-2" />
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-secondary/50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-green-500 mb-1">
                                        <ArrowUpRight className="h-4 w-4" />
                                        <span className="text-sm">Income</span>
                                    </div>
                                    <p className="text-xl font-bold">$4,545.00</p>
                                    <p className="text-xs text-muted-foreground">This month</p>
                                </div>
                                <div className="bg-secondary/50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-red-500 mb-1">
                                        <ArrowDownRight className="h-4 w-4" />
                                        <span className="text-sm">Expenses</span>
                                    </div>
                                    <p className="text-xl font-bold">$2,900.49</p>
                                    <p className="text-xs text-muted-foreground">This month</p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h4 className="font-semibold mb-3">Recent Activity</h4>
                                <div className="space-y-3">
                                    {recentCardActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                            <div>
                                                <p className="font-medium text-sm">{activity.description}</p>
                                                <p className="text-xs text-muted-foreground">{activity.date}</p>
                                            </div>
                                            <span className={`font-semibold ${activity.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                                {activity.type === 'credit' ? '+' : ''}{activity.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Spending by Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Spending by Category</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {spendingCategories.map((category) => (
                                <div key={category.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg ${category.color} bg-opacity-20 flex items-center justify-center`}>
                                                <category.icon className={`h-4 w-4 ${category.color.replace('bg-', 'text-')}`} />
                                            </div>
                                            <span className="text-sm font-medium">{category.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold">${category.amount.toFixed(2)}</span>
                                    </div>
                                    <Progress value={category.percentage} className="h-1.5" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Cards;