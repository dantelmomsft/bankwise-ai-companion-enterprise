import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, DollarSign, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const paymentsData = [
  { id: 1, name: "Electric Company", amount: 245.50, dueDate: "2024-01-20", status: "pending", category: "utilities", recurring: true },
  { id: 2, name: "Internet Service Provider", amount: 89.99, dueDate: "2024-01-18", status: "overdue", category: "utilities", recurring: true },
  { id: 3, name: "Office Rent", amount: 3500.00, dueDate: "2024-01-25", status: "pending", category: "real-estate", recurring: true },
  { id: 4, name: "Insurance Premium", amount: 450.00, dueDate: "2024-01-22", status: "pending", category: "insurance", recurring: true },
  { id: 5, name: "Software Subscription", amount: 299.00, dueDate: "2024-01-15", status: "paid", category: "software", recurring: true },
  { id: 6, name: "Equipment Lease", amount: 850.00, dueDate: "2024-01-28", status: "pending", category: "equipment", recurring: true },
];

const monthlyPaymentTrends = [
  { month: 'Jan', utilities: 850, insurance: 450, software: 299, equipment: 850, rent: 3500 },
  { month: 'Feb', utilities: 920, insurance: 450, software: 299, equipment: 850, rent: 3500 },
  { month: 'Mar', utilities: 780, insurance: 450, software: 299, equipment: 850, rent: 3500 },
  { month: 'Apr', utilities: 845, insurance: 450, software: 299, equipment: 850, rent: 3500 },
  { month: 'May', utilities: 912, insurance: 450, software: 299, equipment: 850, rent: 3500 },
  { month: 'Jun', utilities: 834, insurance: 450, software: 299, equipment: 850, rent: 3500 },
];

export default function Payments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'paid'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = paymentsData.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'overdue': return 'bg-red-500/20 text-red-500 border-red-500/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalPending = paymentsData.filter(payment => payment.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);
  const totalOverdue = paymentsData.filter(payment => payment.status === 'overdue').reduce((sum, payment) => sum + payment.amount, 0);
  const totalPaid = paymentsData.filter(payment => payment.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <CreditCard className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{filteredPayments.filter(p => p.status === 'pending').length} payments pending</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">${totalOverdue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{filteredPayments.filter(p => p.status === 'overdue').length} payment overdue</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{filteredPayments.filter(p => p.status === 'paid').length} payment completed</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$6,250</div>
            <p className="text-xs text-muted-foreground">Average monthly payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments List and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payments List */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Current Payments</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === 'overdue' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('overdue')}
                >
                  Overdue
                </Button>
              </div>
            </div>
            <Input
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(payment.status)}
                    <div>
                      <p className="font-medium text-foreground">{payment.name}</p>
                      <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-foreground">${payment.amount.toFixed(2)}</p>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends Chart */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Payment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyPaymentTrends}>
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
                <Bar dataKey="utilities" stackId="a" fill="#3b82f6" />
                <Bar dataKey="insurance" stackId="a" fill="#f59e0b" />
                <Bar dataKey="software" stackId="a" fill="#10b981" />
                <Bar dataKey="equipment" stackId="a" fill="#f43f5e" />
                <Bar dataKey="rent" stackId="a" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
