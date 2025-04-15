import { EditTradeFormValues, TradeFormValues } from "@/validations/trade";

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
  refreshTrades: () => Promise<void>;
  addTrade: (trade: TradeFormValues) => Promise<void>;
  deleteTrade: (tradeId: string) => Promise<void>;
  updateTrade: (tradeId: string, data: EditTradeFormValues) => Promise<void>;
}
