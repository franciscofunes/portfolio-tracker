// src/types/domain/trade.ts
export interface Trade {
  id: string;
  type: string;
  quantity: number;
  price: number;
  exitPrice?: number | null;
  date: string;
  portfolioId: string;
  assetId: string;
  asset: {
    id: string;
    symbol: string;
    name: string;
    assetType: string;
    createdAt: string;
  };
  // Client-side properties
  ticker?: string;
  entry?: number;
  exit?: number;
}

export type NewTrade = {
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  date: string;
  assetId: string;
  portfolioId: string;
};

export interface UpdateTradeData {
  portfolioId: string;
  tradeId: string;
  ticker: string;
  quantity: number;
  entry: number;
  exit: number;
  date: string;
}

export interface BackendTrade {
  id: string;
  type: string;
  quantity: number;
  price: number;
  exitPrice?: number | null;
  date: string;
  portfolioId: string;
  assetId: string;
  asset: {
    id: string;
    symbol: string;
    name: string;
    assetType: string;
    createdAt: string;
  };
}

export interface TradeCardData {
  id: string;
  ticker: string;
  entry: number;
  exit: number;
  quantity: number;
  profit: number;
  date: string;
}