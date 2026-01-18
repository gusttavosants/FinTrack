import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
    { name: 'Jul', income: 3490, expense: 4300 },
];

const OverviewChart = () => {
    return (
        <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold">Financial Overview</h3>
                    <p className="text-sm text-muted-foreground">Income vs Expenses over time</p>
                </div>
                <select className="bg-background border border-input rounded-lg text-sm px-3 py-1 outline-none focus:ring-1 ring-ring">
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#8884d8"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OverviewChart;
