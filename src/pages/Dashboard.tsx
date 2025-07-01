import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, PieChart as PieChartIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const accountData = [
	{ month: 'Jan', balance: 45000, expenses: 8500 },
	{ month: 'Feb', balance: 47500, expenses: 9200 },
	{ month: 'Mar', balance: 46800, expenses: 8900 },
	{ month: 'Apr', balance: 49200, expenses: 9800 },
	{ month: 'May', balance: 51500, expenses: 8600 },
	{ month: 'Jun', balance: 52800, expenses: 9400 },
];

const expenseCategories = [
	{ name: 'Utilities', value: 2800, color: '#f59e0b' },
	{ name: 'Office Rent', value: 3500, color: '#3b82f6' },
	{ name: 'Supplies', value: 1200, color: '#10b981' },
	{ name: 'Insurance', value: 900, color: '#f43f5e' },
	{ name: 'Other', value: 1000, color: '#8b5cf6' },
];

const recentTransactions = [
	{ id: 1, description: "Electric Company", amount: -245.50, date: "2024-01-15", type: "utility" },
	{ id: 2, description: "Office Supplies Inc", amount: -1250.00, date: "2024-01-14", type: "supplies" },
	{ id: 3, description: "Client Payment", amount: 5000.00, date: "2024-01-13", type: "income" },
	{ id: 4, description: "Internet Service", amount: -89.99, date: "2024-01-12", type: "utility" },
	{ id: 5, description: "Insurance Premium", amount: -450.00, date: "2024-01-11", type: "insurance" },
];

export default function Dashboard() {
	return (
		<div className="p-6 space-y-6 animate-fade-in">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
				<div className="text-sm text-muted-foreground">
					Last updated: {new Date().toLocaleDateString()}
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
						<DollarSign className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$52,800</div>
						<p className="text-xs text-green-500 flex items-center">
							<ArrowUpRight className="h-3 w-3 mr-1" />
							+12.5% from last month
						</p>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
						<CreditCard className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$9,400</div>
						<p className="text-xs text-red-500 flex items-center">
							<ArrowDownRight className="h-3 w-3 mr-1" />
							+8.2% from last month
						</p>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Pending Bills</CardTitle>
						<BarChart3 className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">7</div>
						<p className="text-xs text-muted-foreground">Due within 7 days</p>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Avg Monthly Growth</CardTitle>
						<TrendingUp className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">+3.2%</div>
						<p className="text-xs text-green-500">Steady growth trend</p>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Credit Card Debt</CardTitle>
						<CreditCard className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$3,200</div>
						<p className="text-xs text-red-500 flex items-center">
							<ArrowDownRight className="h-3 w-3 mr-1" />
							-5.1% from last month
						</p>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Investment Portfolio</CardTitle>
						<Wallet className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$15,000</div>
						<p className="text-xs text-green-500 flex items-center">
							<ArrowUpRight className="h-3 w-3 mr-1" />
							+10.3% from last month
						</p>
					</CardContent>
				</Card>
			</div>

			{/* New Features Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Credit Cards</CardTitle>
						<Wallet className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$3,651</div>
						<p className="text-xs text-muted-foreground">Total balance across 3 cards</p>
						<div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
							<a href="/credit-cards" className="flex items-center">
								View cards <ArrowUpRight className="h-3 w-3 ml-1" />
							</a>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Investment Portfolio</CardTitle>
						<PieChartIcon className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$68,425</div>
						<p className="text-xs text-green-500 flex items-center">
							<ArrowUpRight className="h-3 w-3 mr-1" />
							+15.3% portfolio gain
						</p>
						<div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
							<a href="/portfolio" className="flex items-center">
								View portfolio <ArrowUpRight className="h-3 w-3 ml-1" />
							</a>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="bg-card/50 backdrop-blur border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Account Balance Trend</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={accountData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
								<XAxis dataKey="month" stroke="#9ca3af" />
								<YAxis stroke="#9ca3af" />
								<Tooltip
									contentStyle={{
										backgroundColor: 'hsl(var(--card))',
										border: '1px solid hsl(var(--border))',
										borderRadius: '8px'
									}}
								/>
								<Line
									type="monotone"
									dataKey="balance"
									stroke="hsl(var(--primary))"
									strokeWidth={3}
									dot={{ fill: 'hsl(var(--primary))' }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Expense Categories</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={expenseCategories}
									cx="50%"
									cy="50%"
									outerRadius={100}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
								>
									{expenseCategories.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: 'hsl(var(--card))',
										border: '1px solid hsl(var(--border))',
										borderRadius: '8px'
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Recent Transactions */}
			<Card className="bg-card/50 backdrop-blur border-border/50">
				<CardHeader>
					<CardTitle className="text-foreground">Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentTransactions.map((transaction) => (
							<div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
								<div className="flex items-center space-x-3">
									<div className={`w-2 h-2 rounded-full ${
										transaction.type === 'income' ? 'bg-green-500' :
										transaction.type === 'utility' ? 'bg-blue-500' :
										transaction.type === 'supplies' ? 'bg-yellow-500' : 'bg-purple-500'
									}`} />
									<div>
										<p className="font-medium text-foreground">{transaction.description}</p>
										<p className="text-sm text-muted-foreground">{transaction.date}</p>
									</div>
								</div>
								<div className={`text-right font-semibold ${
									transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
								}`}>
									{transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
