import { EditTradeFormValues, TradeFormValues } from "@/validations/trade";
import { Portfolio } from "../domain/portfolio";
import { Trade } from "../domain/trade";

export interface PortfolioContextType {
  selectedPortfolioId: string | null;
  setSelectedPortfolioId: (id: string) => void;
  portfolios: Portfolio[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface EnhancedPortfolioContextType extends PortfolioContextType {
  trades: Trade[];
  isLoadingTrades: boolean;
  tradeError: Error | null;
  selectedPortfolio: Portfolio | null;
  refreshTrades: () => Promise<void>;
  addTrade: (trade: TradeFormValues) => Promise<void>;
  deleteTrade: (tradeId: string) => Promise<void>;
  updateTrade: (tradeId: string, data: EditTradeFormValues) => Promise<void>;
}