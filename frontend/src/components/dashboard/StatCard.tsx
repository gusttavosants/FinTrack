import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: React.ElementType;
    className?: string;
}

const StatCard = ({ label, value, trend, trendUp, icon: Icon, className }: StatCardProps) => {
    return (
        <div className={cn("bg-card p-6 rounded-2xl border border-border shadow-sm", className)}>
            <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center text-sm font-medium px-2 py-1 rounded-lg",
                        trendUp ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                    )}>
                        {trendUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-muted-foreground text-sm font-medium mb-1">{label}</h3>
                <p className="text-2xl font-bold tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
