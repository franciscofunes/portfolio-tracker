"use client";

import { Footer } from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/Topbar";
import PnlChart from "@/components/portfolio/PnlChart";
import { TradeList } from "@/components/trade/TradeList";
import { Progress } from "@/components/ui/progress";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import { useState } from "react";
import { NewTradeDialog } from "@/components/trade/NewTradeDialog";
import { NewPortfolioDialog } from "@/components/portfolio/NewPortfolioDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MobileNavigation from "@/components/ui/mobile-navigation";

export default function DashboardPage() {
  const { 
    isLoading, 
    trades, 
    isLoadingTrades, 
    deleteTrade 
  } = usePortfolio();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);

  const handleTradeDelete = async (tradeId: string) => {
    try {
      setIsDeleting(true);
      await deleteTrade(tradeId);
    } catch (error) {
      console.error("Error deleting trade:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col space-y-4">
        <p className="text-muted-foreground text-sm">Loading portfolios...</p>
        <Progress value={60} className="w-1/2 max-w-md" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background relative">
      <Sidebar />

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-3 space-y-6 overflow-x-hidden pb-20 md:pb-6">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-6 mt-0 mb-2">
          <div className="absolute inset-0 bg-grid-white/15 bg-[size:20px_20px] opacity-30"></div>
          <div className="absolute -top-24 -right-24 h-32 w-32 rounded-full bg-pink-400 blur-3xl opacity-70"></div>
          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-indigo-600 blur-3xl opacity-50"></div>

          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Trading Dashboard
            </h1>
            <p className="text-indigo-100 mt-1 max-w-xl">
              Track your trades, analyze performance, and grow your portfolio
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TopBar />
        </div>
        
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Trades</h2>
          {isLoadingTrades || isDeleting ? (
            <div className="py-4">
              <Progress value={60} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {isDeleting ? "Deleting trade..." : "Loading trades..."}
              </p>
            </div>
          ) : (
            <TradeList
              trades={trades}
              onTradeDelete={handleTradeDelete}
            />
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Charts</h2>
          <PnlChart
            trades={trades.map((trade) => ({
              ...trade,
              type: trade.type as "BUY" | "SELL",
            }))}
          />
        </section>

        <Footer />
      </main>
      
      <MobileNavigation 
        setTradeDialogOpen={setTradeDialogOpen} 
        setPortfolioDialogOpen={setPortfolioDialogOpen} 
      />
      
      <NewTradeDialog 
        open={tradeDialogOpen} 
        setOpen={setTradeDialogOpen} 
      />
      <NewPortfolioDialog 
        open={portfolioDialogOpen} 
        setOpen={setPortfolioDialogOpen} 
      />
    </div>
  );
}