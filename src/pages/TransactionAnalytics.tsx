
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

const transactionTrends = [
  { date: '2024-01-01', income: 5200, expenses: 3800, net: 1400 },
  { date: '2024-01-07', income: 4800, expenses: 4200, net: 600 },
  { date: '2024-01-14', income: 6100, expenses: 3600, net: 2500 },
  { date: '2024-01-21', income: 5500, expenses: 4100, net: 1400 },
  { date: '2024-01-28', income: 7200, expenses: 3900, net: 3300 },
];

const categoryBreakdown = [
  { category: 'Office & Operations', amount: 15420, percentage: 42, trend: '+5.2%', color: '#3b82f6' },
  { category: 'Utilities & Services', amount: 8950, percentage: 24, trend: '+2.1%', color: '#f59e0b' },
  { category: 'Equipment & Software', amount: 6780, percentage: 18, trend: '-1.8%', color: '#10b981' },
  { category: 'Insurance & Legal', amount: 3240, percentage: 9, trend: '+0.5%', color: '#f43f5e' },
  { category: 'Marketing & Travel', amount: 2610, percentage: 7, trend: '+8.9%', color: '#8b5cf6' },
];

const cashFlowData = [
  { month: 'Jan', inflow: 28500, outflow: 22000 },
  { month: 'Feb', inflow: 31200, outflow: 24500 },
  { month: 'Mar', inflow: 29800, outflow: 23200 },
  { month: 'Apr', inflow: 33500, outflow: 25800 },
  { month: 'May', inflow: 35200, outflow: 27100 },
  { month: 'Jun', inflow: 32900, outflow: 26400 },
];

const recentAnalytics = [
  { metric: 'Average Transaction', value: '$1,247', change: '+12.3%', positive: true },
  { metric: 'Transaction Frequency', value: '23/week', change: '-2.1%', positive: false },
  { metric: 'Largest Expense', value: '$3,500', change: 'Rent Payment', positive: null },
  { metric: 'Savings Rate', value: '18.5%', change: '+3.2%', positive: true },
];

export default function TransactionAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [category, setCategory] = useState('all');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Transaction Analytics</h1>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Key Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {recentAnalytics.map((metric, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.metric}</CardTitle>
              {metric.positive === true && <TrendingUp className="h-4 w-4 text-green-500" />}
              {metric.positive === false && <TrendingDown className="h-4 w-4 text-red-500" />}
              {metric.positive === null && <DollarSign className="h-4 w-4 text-primary" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className={`text-xs flex items-center ${
                metric.positive === true ? 'text-green-500' : 
                metric.positive === false ? 'text-red-500' : 'text-muted-foreground'
              }`}>
                {metric.positive === true && <ArrowUpRight className="h-3 w-3 mr-1" />}
                {metric.positive === false && <ArrowDownRight className="h-3 w-3 mr-1" />}
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Trends */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Transaction Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transactionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2" 
                  stroke="#f43f5e" 
                  fill="#f43f5e" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cash Flow Analysis */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
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
                <Bar dataKey="inflow" fill="#10b981" />
                <Bar dataKey="outflow" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Expense Categories Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categoryBreakdown.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-foreground">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant="outline" 
                      className={category.trend.startsWith('+') ? 'text-green-500 border-green-500/50' : 'text-red-500 border-red-500/50'}
                    >
                      {category.trend}
                    </Badge>
                    <span className="font-semibold text-foreground">${category.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${category.percentage}%`, 
                      backgroundColor: category.color 
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{category.percentage}% of total expenses</span>
                  <span>Last 30 days</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
