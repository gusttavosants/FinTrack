import { LucideIcon } from "lucide-react";

interface Transaction {
    id: string;
    name: string;
    category: string;
    amount: number;
    date: string;
    icon: LucideIcon;
    iconColor: string;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
    return (
        <div className="bg-card p-6 rounded-2xl border border-border h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
                <button className="text-sm text-primary hover:underline">View All</button>
            </div>

            <div className="space-y-6">
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full ${tx.iconColor} bg-opacity-10 flex items-center justify-center`}>
                                <tx.icon className={`h-5 w-5 ${tx.iconColor.replace('bg-', 'text-')}`} />
                            </div>
                            <div>
                                <p className="font-medium text-sm group-hover:text-primary transition-colors">{tx.name}</p>
                                <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
                            </div>
                        </div>
                        <p className={`text-sm font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-foreground'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
