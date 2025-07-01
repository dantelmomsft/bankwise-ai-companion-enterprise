
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import AIAgent from "./components/AIAgent";
import Dashboard from "./pages/Dashboard";
import BillManagement from "./pages/BillManagement";
import TransactionAnalytics from "./pages/TransactionAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col w-full">
          <Navigation />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bills" element={<BillManagement />} />
                <Route path="/analytics" element={<TransactionAnalytics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <AIAgent />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
