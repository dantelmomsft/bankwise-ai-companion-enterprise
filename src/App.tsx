
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
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
        <div className="min-h-screen bg-background flex w-full">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bills" element={<BillManagement />} />
              <Route path="/analytics" element={<TransactionAnalytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <AIAgent />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
