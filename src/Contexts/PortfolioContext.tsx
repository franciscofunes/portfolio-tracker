"use client";

import { useCreateTrade } from "@/hooks/mutations/useCreateTrade";
import { useDeleteTrade } from "@/hooks/mutations/useDeleteTrade";
import { useUpdateTrade } from "@/hooks/mutations/useUpdateTrade";
import { useTrades } from "@/hooks/queries/useTrades";
import { useUserPortfolios } from "@/hooks/queries/useUserPortfolios";
import {
  EnhancedPortfolioContextType
} from "@/types/context/portfolioContextType";
import { EditTradeFormValues } from "@/validations/trade";
import { TradeFormValues } from "@/validations/trade";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const PortfolioContext = createContext<EnhancedPortfolioContextType>({
  selectedPortfolioId: null,
  setSelectedPortfolioId: () => {},
  portfolios: [],
  isLoading: false,
  isError: false,
  error: null,
  trades: [],
  isLoadingTrades: false,
  tradeError: null,
  refreshTrades: async () => {},
  addTrade: async () => {},
  deleteTrade: async () => {},
  updateTrade: async () => {},
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    null
  );

  const {
    data: portfolios = [],
    isLoading,
    isError,
    error,
  } = useUserPortfolios();

  const {
    data: trades = [],
    isLoading: isLoadingTrades,
    error: tradesError,
    refetch: refetchTrades,
  } = useTrades(selectedPortfolioId || "");

  const { mutateAsync: createTrade } = useCreateTrade();
  const { mutateAsync: removeTradeAsync } = useDeleteTrade();
  const { mutateAsync: updateTradeAsync } = useUpdateTrade();

  useEffect(() => {
    if (portfolios && portfolios.length > 0 && !selectedPortfolioId) {
      setSelectedPortfolioId(portfolios[0].id);
    }
  }, [portfolios, selectedPortfolioId]);

  const refreshTrades = async () => {
    if (!selectedPortfolioId) return;
    await refetchTrades();
  };

  const addTrade = async (trade: TradeFormValues) => {
    if (!selectedPortfolioId) return;

    try {
      await createTrade(trade);
    } catch (err) {
      console.error("Error adding trade:", err);
      throw err;
    }
  };

  const deleteTrade = async (tradeId: string) => {
    if (!selectedPortfolioId) return;

    try {
      await removeTradeAsync({
        portfolioId: selectedPortfolioId,
        tradeId: tradeId,
      });
    } catch (err) {
      console.error("Error deleting trade:", err);
      throw err;
    }
  };

  const updateTrade = async (tradeId: string, data: EditTradeFormValues) => {
    if (!selectedPortfolioId) return;

    try {
      await updateTradeAsync({
        portfolioId: selectedPortfolioId,
        tradeId: tradeId,
        ticker: data.ticker,
        quantity: data.quantity,
        entry: data.entry,
        exit: data.exit,
        date: data.date,
      });
    } catch (err) {
      console.error("Error updating trade:", err);
      throw err;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        selectedPortfolioId,
        setSelectedPortfolioId,
        portfolios,
        isLoading,
        isError,
        error,
        trades,
        isLoadingTrades,
        tradeError: tradesError ? new Error(String(tradesError)) : null,
        refreshTrades,
        addTrade,
        deleteTrade,
        updateTrade,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);