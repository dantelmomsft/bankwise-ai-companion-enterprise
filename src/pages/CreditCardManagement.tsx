import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Plus, DollarSign, Calendar, Activity, TrendingUp } from "lucide-react";

interface CreditCardData {
  id: string;
  name: string;
  number: string;
  balance: number;
  limit: number;
  dueDate: string;
  status: "active" | "blocked" | "expired";
  type: "visa" | "mastercard" | "amex";
}

interface Transaction {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  merchant: string;
}

const CreditCardManagement = () => {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [rechargeAmount, setRechargeAmount] = useState("");

  // Mock data for credit cards
  const creditCards: CreditCardData[] = [
    {
      id: "1",
      name: "Business Platinum",
      number: "**** **** **** 1234",
      balance: 2450.75,
      limit: 15000,
      dueDate: "2025-07-15",
      status: "active",
      type: "visa"
    },
    {
      id: "2",
      name: "Corporate Gold",
      number: "**** **** **** 5678",
      balance: 1200.50,
      limit: 10000,
      dueDate: "2025-07-20",
      status: "active",
      type: "mastercard"
    },
    {
      id: "3",
      name: "Executive Black",
      number: "**** **** **** 9012",
      balance: 0,
      limit: 25000,
      dueDate: "2025-07-25",
      status: "blocked",
      type: "amex"
    }
  ];

  // Mock data for transactions
  const transactions: Transaction[] = [
    {
      id: "1",
      cardId: "1",
      description: "Office Supplies Purchase",
      amount: -342.50,
      date: "2025-06-28",
      category: "Office",
      merchant: "Staples Inc."
    },
    {
      id: "2",
      cardId: "1",
      description: "Business Lunch",
      amount: -125.75,
      date: "2025-06-27",
      category: "Meals",
      merchant: "The Business Grill"
    },
    {
      id: "3",
      cardId: "2",
      description: "Software Subscription",
      amount: -299.99,
      date: "2025-06-26",
      category: "Software",
      merchant: "Adobe Creative Cloud"
    },
    {
      id: "4",
      cardId: "1",
      description: "Payment Received",
      amount: 1500.00,
      date: "2025-06-25",
      category: "Payment",
      merchant: "Account Payment"
    }
  ];

  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "🟦";
      case "mastercard":
        return "🔴";
      case "amex":
        return "🟩";
      default:
        return "💳";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRecharge = () => {
    if (selectedCard && rechargeAmount) {
      // Here you would typically make an API call to recharge the card
      console.log(`Recharging card ${selectedCard} with $${rechargeAmount}`);
      setRechargeAmount("");
      setSelectedCard("");
    }
  };

  const filteredTransactions = selectedCard 
    ? transactions.filter(t => t.cardId === selectedCard)
    : transactions;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Credit Card Management</h1>
          <p className="text-muted-foreground">
            Manage your credit cards, view balances, and track transactions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Credit Card</DialogTitle>
              <DialogDescription>
                Enter your credit card details to add it to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cardName">Card Name</Label>
                <Input id="cardName" placeholder="e.g., Business Platinum" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
            <Button className="w-full">Add Credit Card</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${creditCards.reduce((sum, card) => sum + card.balance, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {creditCards.length} active cards
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credit Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${creditCards.reduce((sum, card) => sum + card.limit, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Available credit across all cards
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((creditCards.reduce((sum, card) => sum + card.balance, 0) / 
                 creditCards.reduce((sum, card) => sum + card.limit, 0)) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall credit utilization
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cards">Credit Cards</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="recharge">Recharge</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creditCards.map((card) => (
              <Card key={card.id} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-3xl" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCardTypeIcon(card.type)}</span>
                      <div>
                        <CardTitle className="text-lg">{card.name}</CardTitle>
                        <CardDescription>{card.number}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(card.status)}>
                      {card.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="text-2xl font-bold">${card.balance.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Credit Limit</p>
                      <p className="text-lg font-semibold">${card.limit.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(card.balance / card.limit) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {new Date(card.dueDate).toLocaleDateString()}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {((card.balance / card.limit) * 100).toFixed(1)}% used
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>View and manage your credit card transactions</CardDescription>
                </div>
                <select 
                  className="rounded-md border border-input bg-background px-3 py-2"
                  value={selectedCard}
                  onChange={(e) => setSelectedCard(e.target.value)}
                >
                  <option value="">All Cards</option>
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name} ({card.number})
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recharge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recharge Credit Card</CardTitle>
              <CardDescription>
                Make a payment to reduce your credit card balance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-select">Select Credit Card</Label>
                  <select 
                    id="card-select"
                    className="rounded-md border border-input bg-background px-3 py-2"
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                  >
                    <option value="">Choose a card...</option>
                    {creditCards.filter(card => card.status === 'active').map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.name} ({card.number}) - Balance: ${card.balance.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleRecharge}
                  disabled={!selectedCard || !rechargeAmount}
                  className="w-full"
                >
                  Make Payment
                </Button>
              </div>
              
              {selectedCard && (
                <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Payment Summary</h4>
                  {(() => {
                    const card = creditCards.find(c => c.id === selectedCard);
                    const paymentAmount = parseFloat(rechargeAmount) || 0;
                    const newBalance = Math.max(0, (card?.balance || 0) - paymentAmount);
                    
                    return (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Current Balance:</span>
                          <span>${card?.balance.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Amount:</span>
                          <span>${paymentAmount.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-medium">
                          <span>New Balance:</span>
                          <span>${newBalance.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditCardManagement;
