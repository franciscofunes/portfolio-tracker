"use client";

import { Footer } from "@/components/layout/Footer";
import MobileSidebar from "@/components/layout/MobileSidebar";
import Sidebar from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/Topbar";
import PnlChart from "@/components/portfolio/PnlChart";
import { TradeList } from "@/components/trade/TradeList";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import { BackendTrade } from "@/types/domain/trade";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { isLoading, selectedPortfolioId } = usePortfolio();
  const [trades, setTrades] = useState<BackendTrade[]>([]);
  const [isLoadingTrades, setIsLoadingTrades] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTrades = async () => {
      if (!selectedPortfolioId) return;

      setIsLoadingTrades(true);
      try {
        const response = await fetch(
          `/api/portfolios/${selectedPortfolioId}/trades`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }

        const data = await response.json();
        setTrades(data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      } finally {
        setIsLoadingTrades(false);
      }
    };

    fetchTrades();
  }, [selectedPortfolioId]);

  const refreshTrades = async () => {
    if (selectedPortfolioId) {
      const response = await fetch(
        `/api/portfolios/${selectedPortfolioId}/trades`
      );
      if (response.ok) {
        const data = await response.json();
        setTrades(data);
      }
    }
  };

  const handleTradeDelete = refreshTrades;
  const handleTradeEdit = refreshTrades;

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
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <MobileSidebar />
      <Sidebar />

      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-3 space-y-6 overflow-x-hidden">
        {/* Modern gradient title section */}
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
        <TopBar />
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Trades</h2>
          {isLoadingTrades ? (
            <div className="py-4">
              <Progress value={60} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Loading trades...
              </p>
            </div>
          ) : (
            <TradeList
              trades={trades}
              onTradeDelete={handleTradeDelete}
              onTradeEdit={handleTradeEdit}
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
    </div>
  );
}
