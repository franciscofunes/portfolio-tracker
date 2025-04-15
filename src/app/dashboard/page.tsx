"use client";

import Sidebar from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/Topbar";
import PnlChart from "@/components/portfolio/PnlChart";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import { useState, useEffect } from "react";
import { BackendTrade } from "@/types/domain/trade";
import { TradeList } from "@/components/trade/TradeList";
import { Footer } from "@/components/layout/Footer";
import { Menu, X } from "lucide-react";

export default function DashboardPage() {
  const { isLoading, selectedPortfolioId } = usePortfolio();
  const [loadingSeed, setLoadingSeed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [trades, setTrades] = useState<BackendTrade[]>([]);
  const [isLoadingTrades, setIsLoadingTrades] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTrades = async () => {
      if (!selectedPortfolioId) return;

      setIsLoadingTrades(true);
      try {
        const response = await fetch(`/api/portfolios/${selectedPortfolioId}/trades`);

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

  const handleSeedData = async () => {
    setLoadingSeed(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/seed", { method: "POST" });

      if (!response.ok) throw new Error("Failed to seed data");

      alert("Data seeded successfully!");

      if (selectedPortfolioId) {
        const tradesResponse = await fetch(`/api/portfolios/${selectedPortfolioId}/trades`);
        if (tradesResponse.ok) {
          const data = await tradesResponse.json();
          setTrades(data);
        }
      }
    } catch (error) {
      setErrorMessage("Failed to seed data");
      console.error("Seeding error:", error);
    } finally {
      setLoadingSeed(false);
    }
  };

  const refreshTrades = async () => {
    if (selectedPortfolioId) {
      const response = await fetch(`/api/portfolios/${selectedPortfolioId}/trades`);
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
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 bg-white dark:bg-gray-900 h-full w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        <div className="md:hidden p-4 flex justify-end">
          <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-6 space-y-6 overflow-x-hidden">
        <TopBar />

        <section className="space-y-4">
          <Button variant="outline" onClick={handleSeedData} disabled={loadingSeed}>
            {loadingSeed ? "Seeding..." : "Seed Data"}
          </Button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Trades</h2>
          {isLoadingTrades ? (
            <div className="py-4">
              <Progress value={60} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">Loading trades...</p>
            </div>
          ) : (
            <TradeList trades={trades} onTradeDelete={handleTradeDelete} onTradeEdit={handleTradeEdit} />
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Charts</h2>
          <PnlChart trades={trades.map(trade => ({ ...trade, type: trade.type as "BUY" | "SELL" }))} />
        </section>

        <Footer />
      </main>
    </div>
  );
}
