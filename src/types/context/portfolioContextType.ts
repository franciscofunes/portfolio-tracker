import { EditTradeFormValues, TradeFormValues } from "@/validations/trade";
import { Portfolio } from "../domain/portfolio";

export interface PortfolioContextType {
  selectedPortfolioId: string | null;
  setSelectedPortfolioId: (id: string) => void;
  portfolios: any[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface EnhancedPortfolioContextType extends PortfolioContextType {
  trades: any[];
  isLoadingTrades: boolean;
  tradeError: Error | null;
  selectedPortfolio: Portfolio | null;
  refreshTrades: () => Promise<void>;
  addTrade: (trade: TradeFormValues) => Promise<void>;
  deleteTrade: (tradeId: string) => Promise<void>;
  updateTrade: (tradeId: string, data: EditTradeFormValues) => Promise<void>;
}
