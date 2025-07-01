import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Plus, Minus } from "lucide-react";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  purchasePrice: number;
  purchaseDate: string;
  sector: string;
}

interface MarketTrend {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface Transaction {
  id: string;
  type: "buy" | "sell";
  symbol: string;
  shares: number;
  price: number;
  date: string;
  total: number;
}

const InvestmentPortfolio = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [shares, setShares] = useState("");
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);

  // Mock data for stocks portfolio
  const portfolio: Stock[] = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 50,
      currentPrice: 185.25,
      purchasePrice: 165.50,
      purchaseDate: "2024-12-15",
      sector: "Technology"
    },
    {
      id: "2",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 30,
      currentPrice: 378.90,
      purchasePrice: 350.20,
      purchaseDate: "2024-11-20",
      sector: "Technology"
    },
    {
      id: "3",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 15,
      currentPrice: 142.80,
      purchasePrice: 138.40,
      purchaseDate: "2024-10-10",
      sector: "Technology"
    },
    {
      id: "4",
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 25,
      currentPrice: 248.50,
      purchasePrice: 275.30,
      purchaseDate: "2024-09-05",
      sector: "Automotive"
    },
    {
      id: "5",
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      shares: 20,
      currentPrice: 875.60,
      purchasePrice: 720.40,
      purchaseDate: "2024-08-12",
      sector: "Technology"
    }
  ];

  // Mock data for market trends
  const marketTrends: MarketTrend[] = [
    {
      symbol: "SPY",
      name: "SPDR S&P 500 ETF",
      price: 445.20,
      change: 2.15,
      changePercent: 0.48,
      volume: 45678900
    },
    {
      symbol: "QQQ",
      name: "Invesco QQQ ETF",
      price: 378.45,
      change: -1.25,
      changePercent: -0.33,
      volume: 32145600
    },
    {
      symbol: "DIA",
      name: "SPDR Dow Jones ETF",
      price: 385.75,
      change: 0.85,
      changePercent: 0.22,
      volume: 15432100
    },
    {
      symbol: "IWM",
      name: "iShares Russell 2000 ETF",
      price: 205.30,
      change: -0.45,
      changePercent: -0.22,
      volume: 28765400
    }
  ];

  // Mock data for recent transactions
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      symbol: "AAPL",
      shares: 10,
      price: 185.25,
      date: "2025-06-28",
      total: 1852.50
    },
    {
      id: "2",
      type: "sell",
      symbol: "TSLA",
      shares: 5,
      price: 248.50,
      date: "2025-06-27",
      total: 1242.50
    },
    {
      id: "3",
      type: "buy",
      symbol: "NVDA",
      shares: 2,
      price: 875.60,
      date: "2025-06-25",
      total: 1751.20
    }
  ];

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, stock) => total + (stock.shares * stock.currentPrice), 0);
  };

  const calculateTotalGainLoss = () => {
    return portfolio.reduce((total, stock) => {
      const currentValue = stock.shares * stock.currentPrice;
      const purchaseValue = stock.shares * stock.purchasePrice;
      return total + (currentValue - purchaseValue);
    }, 0);
  };

  const calculateGainLossPercent = () => {
    const totalPurchaseValue = portfolio.reduce((total, stock) => 
      total + (stock.shares * stock.purchasePrice), 0);
    const gainLoss = calculateTotalGainLoss();
    return totalPurchaseValue > 0 ? (gainLoss / totalPurchaseValue) * 100 : 0;
  };

  const getStockGainLoss = (stock: Stock) => {
    const currentValue = stock.shares * stock.currentPrice;
    const purchaseValue = stock.shares * stock.purchasePrice;
    return currentValue - purchaseValue;
  };

  const getStockGainLossPercent = (stock: Stock) => {
    return ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
  };

  const handleTrade = () => {
    if (selectedStock && shares) {
      const stock = portfolio.find(s => s.symbol === selectedStock);
      if (stock) {
        console.log(`${tradeType === 'buy' ? 'Buying' : 'Selling'} ${shares} shares of ${selectedStock}`);
        setIsTradeDialogOpen(false);
        setSelectedStock("");
        setShares("");
      }
    }
  };

  const portfolioValue = calculatePortfolioValue();
  const totalGainLoss = calculateTotalGainLoss();
  const gainLossPercent = calculateGainLossPercent();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">
            Monitor your investments, track market trends, and manage your portfolio
          </p>
        </div>
        <Dialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Trade Stocks
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Trade Stocks</DialogTitle>
              <DialogDescription>
                Buy or sell stocks in your portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Trade Type</Label>
                <Select value={tradeType} onValueChange={(value: "buy" | "sell") => setTradeType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Stock Symbol</Label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolio.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shares">Number of Shares</Label>
                <Input
                  id="shares"
                  type="number"
                  placeholder="0"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                />
              </div>
              {selectedStock && shares && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Trade Summary</h4>
                  {(() => {
                    const stock = portfolio.find(s => s.symbol === selectedStock);
                    const shareCount = parseInt(shares) || 0;
                    const total = shareCount * (stock?.currentPrice || 0);
                    
                    return (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Stock:</span>
                          <span>{stock?.symbol} - ${stock?.currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shares:</span>
                          <span>{shareCount}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        {tradeType === 'sell' && stock && shareCount > stock.shares && (
                          <p className="text-red-600 text-xs">
                            Warning: You only own {stock.shares} shares
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            <Button 
              onClick={handleTrade}
              disabled={!selectedStock || !shares}
              className="w-full"
            >
              {tradeType === 'buy' ? 'Buy' : 'Sell'} Stocks
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total market value
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolio.length}</div>
            <p className="text-xs text-muted-foreground">
              Different stocks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {(() => {
              const bestStock = portfolio.reduce((best, stock) => 
                getStockGainLossPercent(stock) > getStockGainLossPercent(best) ? stock : best
              );
              return (
                <>
                  <div className="text-2xl font-bold">{bestStock.symbol}</div>
                  <p className="text-xs text-green-600">
                    +{getStockGainLossPercent(bestStock).toFixed(2)}%
                  </p>
                </>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Holdings</CardTitle>
              <CardDescription>Your current stock positions and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Market Value</TableHead>
                    <TableHead>Gain/Loss</TableHead>
                    <TableHead>%</TableHead>
                    <TableHead>Sector</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolio.map((stock) => {
                    const gainLoss = getStockGainLoss(stock);
                    const gainLossPercent = getStockGainLossPercent(stock);
                    const marketValue = stock.shares * stock.currentPrice;
                    
                    return (
                      <TableRow key={stock.id}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.shares}</TableCell>
                        <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>${marketValue.toFixed(2)}</TableCell>
                        <TableCell className={gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                        </TableCell>
                        <TableCell className={gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{stock.sector}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Current market performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>% Change</TableHead>
                    <TableHead>Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketTrends.map((trend) => (
                    <TableRow key={trend.symbol}>
                      <TableCell className="font-medium">{trend.symbol}</TableCell>
                      <TableCell>{trend.name}</TableCell>
                      <TableCell>${trend.price.toFixed(2)}</TableCell>
                      <TableCell className={trend.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend.change >= 0 ? '+' : ''}${trend.change.toFixed(2)}
                      </TableCell>
                      <TableCell className={trend.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend.changePercent >= 0 ? '+' : ''}{trend.changePercent.toFixed(2)}%
                      </TableCell>
                      <TableCell>{trend.volume.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest buy and sell transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.type === 'buy' ? 'default' : 'secondary'}
                          className={`${
                            transaction.type === 'buy' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.type === 'buy' ? (
                            <Plus className="h-3 w-3 mr-1" />
                          ) : (
                            <Minus className="h-3 w-3 mr-1" />
                          )}
                          {transaction.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.symbol}</TableCell>
                      <TableCell>{transaction.shares}</TableCell>
                      <TableCell>${transaction.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${transaction.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentPortfolio;
